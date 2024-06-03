// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import JSZip from 'jszip';
// --------------------------------------------------------------------------------
import ExcelJS from 'exceljs';
// --------------------------------------------------------------------------------
import {
  CONFIG_SLOT_HEADER_LIST,
  CONFIG_SLOT_LIST, ConfigSlot, ConfigSlotHeaderKey,
  DATA_HEADER_LIST, DataKey, DEFAULT_LONG_IMAGE_EXCEL,
  LongImageExcel, DEFAULT_SLICE, CalcBaseImageOption, OutputBaseImageOption, ConfigKey, Data, FullConfig
} from 'src/scripts/module/image-cutter/interface/common';
import ObjectUtil from 'src/scripts/util/ObjectUtil';
import HtmlUtil from 'src/scripts/util/HtmlUtil';
import { w } from 'app/dist/spa/assets/index.1505b1d3';
// ================================================================================

// ================================================================================
//# region ImageCutterUtil
// --------------------------------------------------------------------------------
export class ImageCutterUtil {
  // ------------------------------------------------------------------------------
  // * Function
  // ------------------------------------------------------------------------------
  //# region Draw
  // ------------------------------------------------------------------------------
  public static fillSplitLineToCanvas(canvas: HTMLCanvasElement, option: CalcBaseImageOption): void {
    const ratio = option.ratio;
    const mode = option.mode;
    const slice = option.slice || DEFAULT_SLICE;

    const size = Math.max(canvas.width, canvas.height);
    const ctx = canvas.getContext('2d');
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = size;
    tempCanvas.height = size;
    const tempCtx = tempCanvas.getContext('2d');

    if(ctx && tempCtx){
      if(mode === 'cut'){
        const splitSize = size / 3 * ratio;
        const processSize = (size + splitSize) / slice;

        tempCtx.save();
        tempCtx.fillStyle = 'rgba(0, 0, 0, 1)';
        for(let i = 1; i < slice; i++){
          tempCtx.fillRect(i * processSize - splitSize, 0, splitSize, size);
        }
        for(let j = 1; j < slice; j++){
          tempCtx.fillRect(0, j * processSize - splitSize, size, splitSize);
        }
        tempCtx.restore();
      } else if (mode === 'scale'){
        const splitSize = (size * ratio) / (3 + ratio);
        const processSize = size / slice;

        tempCtx.save();
        tempCtx.fillStyle = 'rgba(0, 0, 0, 1)';
        for(let i = 0; i <= slice; i++){
          tempCtx.fillRect(i * processSize - splitSize / 2, 0, splitSize, size);
        }
        for(let j = 0; j <= slice; j++){
          tempCtx.fillRect(0, j * processSize - splitSize / 2, size, splitSize);
        }
        tempCtx.restore();
      }

      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.drawImage(tempCanvas, 0, 0);
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region OutputBaseImage
  // ------------------------------------------------------------------------------
  public static async outputBaseImageDataRecord(image: HTMLImageElement, option: OutputBaseImageOption): Promise<Record<string, Blob>> {
    const ratio = option.ratio;
    const mode = option.mode;
    const slice = option.slice || DEFAULT_SLICE;
    const targetSize = option.targetSize || Math.max(image.width, image.height);

    const size = Math.max(image.width, image.height);
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = targetSize;
    tempCanvas.height = targetSize;
    const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });

    const output: Record<string, Blob> = {};

    HtmlUtil.fillImageToCanvas(canvas, image);
    if (ctx && tempCtx) {
      for (let i = 0; i < slice; i++) {
        for (let j = 0; j < slice; j++) {
          let x = 0, y = 0, cutSize = 0;

          if (mode === 'cut') {
            const splitSize = size / 3 * ratio;
            const processSize = (size + splitSize) / slice;
            cutSize = Math.floor(processSize - splitSize);

            x = j * processSize;
            y = i * processSize;
          } else if (mode === 'scale') {
            const splitSize = (size * ratio) / (3 + ratio);
            const processSize = size / slice;
            cutSize = Math.floor(processSize - splitSize);

            x = j * processSize + splitSize / 2;
            y = i * processSize + splitSize / 2;
          }

          tempCtx.save();
          tempCtx.clearRect(0, 0, targetSize, targetSize);
          tempCtx.drawImage(canvas, x, y, cutSize, cutSize, 0, 0, targetSize, targetSize);
          tempCtx.restore();
          const blob = await HtmlUtil.canvasToBlob(tempCanvas);
          if (blob) {
            output[`${ i * slice + j + 1 }.png`] = blob;
          }
        }
      }
    }

    return output;
  };

  public static async outputBaseImageDataZip(image: HTMLImageElement, option: OutputBaseImageOption): Promise<Blob> {
    const zip = new JSZip();
    const fileRecord = await this.outputBaseImageDataRecord(image, option);
    for (const filename in fileRecord) {
      zip.file(filename, fileRecord[filename]);
    }
    return await zip.generateAsync({ type: 'blob' });
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region LongImageExcel
  // ------------------------------------------------------------------------------
  public static exportLongImageExcel(data: LongImageExcel): ExcelJS.Workbook {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Lagomoro';
    workbook.lastModifiedBy = 'Lagomoro';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    const readme = [
      '欢迎使用兔萌社摊主工具！',
      '你现在看到的是【一键摊宣：长图设置】的范例配置表格',
      '本说明文档将指引你完成配置，让我们开始吧！',
      '',
      '配置表格中各个 Sheet 的功能：',
      '【Readme】：说明文档，实际导入的时候这个 Sheet 不会被读取，可以删掉。',
      '【Config】：全局配置，对应工具中的配置字段，如果删掉了就会加载默认配置。',
      '【*(1-9)】：长图数据，Sheet 名称可以是 1-9，对应切出的九宫格图片。本范例文档中存在名称为【7】【8】【9】的 Sheet，这表示九宫格中下面 3 张图需要生成对应的长图。如果你需要生成右侧 3 张图，改为【3】【6】【9】。',
      '【*(其他名称)】的 Sheet 不会被读取，写名称的时候要注意噢，像【Sheet1】【_1】【0】【10】这些都是无效名称。',
      'Sheet 内具体字段的使用方式请参考页面内的注释。',
      '小技巧：可以新建一个 Sheet 把所有制品填写进去，只要没有命名成【*(1-9)】都不会被读取，需要生成的时候再把参展制品粘贴到【*(1-9)】的 Sheet 里。',
      '',
      '【重要】',
      '必须勾选 Excel 设置中【文件 > (最左下角的)选项 > 高级 > (往下滚动)图像大小和质量 > 不压缩文件中的图像】。否则图片会在保存时被压缩，无法读取高清图片。'
    ];
    const sheetReadme = workbook.addWorksheet('Readme');
    for (let i = 0; i < readme.length; i++) {
      sheetReadme.addRow([readme[i]]);
    }

    const configSlotHeaderRow = CONFIG_SLOT_HEADER_LIST.map(p => `${ p.name }\r(${ p.key })`);
    const configSlotKeyList = CONFIG_SLOT_HEADER_LIST.map(p => p.key);
    const sheetConfig = workbook.addWorksheet('Config');
    sheetConfig.addRow(configSlotHeaderRow).eachCell((cell: ExcelJS.Cell) => { cell.alignment = { horizontal: 'center', wrapText: true } });
    for (let i = 0; i < CONFIG_SLOT_HEADER_LIST.length; i++) {
      const configHeader = CONFIG_SLOT_HEADER_LIST[i];
      sheetConfig.getColumn(i + 1).width = configHeader.width;
    }
    for(const configSlot of CONFIG_SLOT_LIST){
      if(configSlot.key in data.config){
        if(configSlot.type === 'color') {
          const row = sheetConfig.addRow(configSlotKeyList.map(p => p === 'value' ? '' : configSlot[p as keyof ConfigSlot]));
          row.height = 21;
          row.getCell(configSlotKeyList.indexOf('value') + 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: configSlot.defaultValue as string }}
        } else if(configSlot.type === 'image') {
          sheetConfig.addRow(configSlotKeyList.map(p => p === 'value' ? '' : configSlot[p as keyof ConfigSlot])).height = 21;
        } else {
          sheetConfig.addRow(configSlotKeyList.map(p => p === 'value' ? configSlot.defaultValue : configSlot[p as keyof ConfigSlot])).height = 21;
        }
      }
    }

    const dataHeaderRow = DATA_HEADER_LIST.map(p => `${ p.optional ? '' : '*'}${ p.name }\r(${ p.key })`);
    const dataKeyList = DATA_HEADER_LIST.map(p => p.key);
    for(const sheetName in data.data){
      const dataList = data.data[sheetName];
      const sheetData = workbook.addWorksheet(sheetName);
      sheetData.addRow(dataHeaderRow).eachCell((cell: ExcelJS.Cell) => { cell.alignment = { horizontal: 'center', wrapText: true } });
      for(let i = 0; i < DATA_HEADER_LIST.length; i++){
        const dataHeader = DATA_HEADER_LIST[i];
        sheetData.getColumn(i + 1).width = dataHeader.width;
        sheetData.getCell(1, i + 1).note = `${ dataHeader.description }\r<${ dataHeader.type }>\r${ dataHeader.optional ? '选填' : '*必填'}`;
      }
      for(const data of dataList){
        const row = [];
        for(const key in data){
          row[dataKeyList.indexOf(key as DataKey)] = data[key as DataKey];
        }
        sheetData.addRow(row).height = 21;
      }
    }

    return workbook;
  }

  public static importLongImageExcel(workbook: ExcelJS.Workbook): LongImageExcel {
    const data = ObjectUtil.deepCopy(DEFAULT_LONG_IMAGE_EXCEL);
    workbook.eachSheet((worksheet: ExcelJS.Worksheet) => {
      if(worksheet.name === 'Config'){
        const title: Record<number, ConfigSlotHeaderKey> = {};
        worksheet.getRow(1).eachCell((cell: ExcelJS.Cell, colNumber: number) => {
          if(cell.type === ExcelJS.ValueType.String && cell.text){
            const match = cell.text.match(/(?<=\()(.+?)(?=\))/g);
            if(match && match.length === 1){
              title[colNumber] = match[0] as ConfigSlotHeaderKey;
            }
          }
        })

        const imageList = this._getWorksheetImageList(workbook, worksheet);

        worksheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
          if(rowNumber > 1){
            let key: ConfigKey = undefined as unknown as ConfigKey;
            row.eachCell((cell: ExcelJS.Cell, colNumber: number) => {
              if (title[colNumber] === 'key' && cell.text) {
                key = cell.text as ConfigKey;
              }
            });
            if (key) {
              const configSlotFilter = CONFIG_SLOT_LIST.filter(p => p.key === key);
              if(configSlotFilter.length === 1){
                for(let i = 0; i < worksheet.getRow(1).cellCount; i++){
                  const colNumber = i + 1;
                  const cell = row.getCell(colNumber);
                  if (title[colNumber] === 'value') {
                    switch (configSlotFilter[0].type) {
                      case 'string':
                        if(typeof cell.value === 'string') {
                          data.config[key] = cell.value as string;
                        }
                        break;
                      case 'number':
                        if(typeof cell.value === 'number') {
                          data.config[key] = cell.value as number;
                        }
                        break;
                      case 'boolean':
                        if(typeof cell.value === 'boolean') {
                          data.config[key] = cell.value as boolean;
                        }
                        break;
                      case 'image':
                        const image = imageList.filter(p => p.colNumber === colNumber && p.rowNumber == rowNumber);
                        if(image.length > 0){
                          data.config[key] = image[0].buffer;
                        }
                        break;
                      case 'color':
                        if(cell.fill) {
                          const argb = (cell.fill as { fgColor: { argb: string } }).fgColor.argb;
                          const r = parseInt(argb.substring(2, 4), 16);
                          const g = parseInt(argb.substring(4, 6), 16);
                          const b = parseInt(argb.substring(6, 8), 16);
                          const a = parseInt(argb.substring(0, 2), 16);
                          data.config[key] = `rgba(${ r }, ${ g }, ${ b }, ${ a })`;
                        }
                        break;
                      case 'font':
                        if(typeof cell.value === 'string') {
                          data.config[key] = cell.value as string;
                        }
                        break;
                    }
                  }
                }
              }
            }
          }
        });
      } else {
        const index = parseInt(worksheet.name);
        if (isNaN(index) || index < 1 || index > 9) {
          return;
        }
        data.data[index] = [];

        const title: Record<number, DataKey> = {};
        worksheet.getRow(1).eachCell((cell: ExcelJS.Cell, colNumber: number) => {
          if(cell.type === ExcelJS.ValueType.String && cell.text){
            const match = cell.text.match(/(?<=\()(.+?)(?=\))/g);
            if(match && match.length === 1){
              title[colNumber] = match[0] as DataKey;
            }
          }
        })

        const imageList = this._getWorksheetImageList(workbook, worksheet);

        worksheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
          if(rowNumber > 1){
            const dataLine: Data = {}
            for(let i = 0; i < worksheet.getRow(1).cellCount; i++){
              const colNumber = i + 1;
              const cell = row.getCell(colNumber);
              const key = title[colNumber]
              const dataHeaderFilter = DATA_HEADER_LIST.filter(p => p.key === key);
              if(dataHeaderFilter.length === 1) {
                switch (dataHeaderFilter[0].type) {
                  case 'string':
                    if (typeof cell.value === 'string') {
                      dataLine[key] = cell.value as string;
                    }
                    break;
                  case 'number':
                    if (typeof cell.value === 'number') {
                      dataLine[key] = cell.value as number;
                    }
                    break;
                  case 'boolean':
                    if (typeof cell.value === 'boolean') {
                      dataLine[key] = cell.value as boolean;
                    }
                    break;
                  case 'image':
                    const image = imageList.filter(p => p.colNumber === colNumber && p.rowNumber == rowNumber);
                    if (image.length > 0) {
                      dataLine[key] = image[0].buffer;
                    }
                    break;
                }
              }
            }
            data.data[index].push(dataLine);
          }
        });
      }
    });

    return data;
  }
  // ------------------------------------------------------------------------------
  private static _getWorksheetImageList(workbook: ExcelJS.Workbook, worksheet: ExcelJS.Worksheet) {
    const output = [];
    for (const image of worksheet.getImages()) {
      const media = workbook.model.media.find(m => (m as unknown as { index: number }).index === image.imageId as unknown as number);
      if(media){
        output.push({ rowNumber: image.range.tl.nativeRow + 1, colNumber: image.range.tl.nativeCol + 1, buffer: media.buffer });
      }
    }
    return output;
  }
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region OutputLongImage
  // ------------------------------------------------------------------------------
  public static async outputLongImageDataRecord(image: HTMLImageElement, option: OutputBaseImageOption, data: LongImageExcel): Promise<Record<string, Blob>> {
    const output = await this.outputBaseImageDataRecord(image, option);
    for(const key in data.data){
      const dataSheet = data.data[key];
      const filename = `${ key }.png`;
      const originImage = await HtmlUtil.blobToImage(output[filename]);
      if (originImage) {
        const canvas = document.createElement('canvas');
        canvas.width = originImage.width;
        canvas.height = originImage.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if(ctx){
          const config = {
            themeColor1: data.config.themeColor1 as string || 'rgba(255, 255, 255, 1)',
            themeColor2: data.config.themeColor2 as string || 'rgba(255, 255, 255, 1)',
            themeColor3: data.config.themeColor3 as string || 'rgba(0, 0, 0, 1)',
            themeColor4: data.config.themeColor4 as string || 'rgba(0, 0, 0, 1)',
            themeColor5: data.config.themeColor5 as string || 'rgba(0, 0, 0, 1)',
            themeColor6: data.config.themeColor6 as string || 'rgba(255, 255, 255, 1)',
            themeColor7: data.config.themeColor7 as string || 'rgba(0, 0, 0, 1)',
            themeColor8: data.config.themeColor8 as string || 'rgba(0, 0, 0, 1)',
            themeColor9: data.config.themeColor9 as string || 'rgba(29, 105, 180, 1)',
            themeFont1: data.config.themeFont1 as string || 'Arial',
            themeFont2: data.config.themeFont2 as string || 'Arial',
            themeFont3: data.config.themeFont3 as string || 'Arial',
            themeFont4: data.config.themeFont4 as string || 'Arial',
            watermarkImage: data.config.watermarkImage ? await HtmlUtil.arrayBufferToImage(data.config.watermarkImage as ArrayBuffer) : null,
          }

          ctx.save();
          ctx.drawImage(originImage, 0, 0);
          for(let i = 0; i < dataSheet.length;i ++){
            const dataLine = dataSheet[i];
            const width = originImage.width;
            const padding = width / 10;
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            let height = 0;
            if(tempCtx){
              tempCtx.save();
              let drawY = padding;

              const baseFontSize = width / 20;

              if (dataLine.name) {
                const titleFontSize = baseFontSize * 1.2;
                drawY += titleFontSize;
                drawY += baseFontSize * 1.6;
              }

              if (dataLine.description) {
                const descriptionFontSize = baseFontSize * 0.8;
                const descriptionRect = HtmlUtil.measureTextMultiline(tempCanvas, dataLine.description.toString(), padding, drawY, width - padding * 2 + descriptionFontSize, `${ descriptionFontSize }px ${ config.themeFont2 }`, config.themeColor4);
                drawY += descriptionRect.height + baseFontSize * 0.4;
              }

              const infoFontSize = baseFontSize * 0.8;
              const infoList = [];
              if (dataLine.size) infoList.push({ key: '规格', value: `：${ dataLine.size.toString() }` });
              if (dataLine.material) infoList.push({ key: '材质', value: `：${ dataLine.material.toString() }` });
              if (dataLine.manufacture) infoList.push({ key: '工艺', value: `：${ dataLine.manufacture.toString() }` });
              if (dataLine.producer) infoList.push({ key: '制造设计', value: `：${ dataLine.producer.toString() }` });
              if (dataLine.author) infoList.push({ key: '作者', value: `：${ dataLine.author.toString() }` });
              if (dataLine.timestamp) infoList.push({ key: '定稿日期', value: `：${ dataLine.timestamp.toString() }` });
              for (const info of infoList) {
                const keyRect = HtmlUtil.measureTextFixWidth(tempCanvas, info.key, padding, drawY, infoFontSize * 4, `${ infoFontSize }px ${ config.themeFont3 }`, config.themeColor5);
                drawY += keyRect.height + baseFontSize * 0.1;
              }
              drawY += baseFontSize * 0.3;

              if (dataLine.image) {
                drawY -= baseFontSize * 0.7;
                const innerPadding = baseFontSize * 0.4;
                const image = await HtmlUtil.arrayBufferToImage(dataLine.image as ArrayBuffer);
                const imageWidth = image.width;
                const imageHeight = image.height;
                const drawWidth = width - padding * 2 - innerPadding * 2;
                const drawHeight = imageHeight * (drawWidth / imageWidth);
                drawY += (drawHeight + innerPadding * 2) + baseFontSize * 1.5;
              }

              drawY -= baseFontSize * 1.5;
              if (i === dataSheet.length - 1) drawY += padding;
              height = drawY;
            }
            tempCanvas.width = originImage.width;
            tempCanvas.height = height;
            if(tempCtx){
              tempCtx.save();
              let drawY = padding;

              const baseFontSize = width / 20;

              tempCtx.save();
              tempCtx.fillStyle = config.themeColor1;
              tempCtx.fillRect(0, 0, width, height);
              tempCtx.restore();

              if (dataLine.name) {
                const titleFontSize = baseFontSize * 1.2;
                drawY += titleFontSize;
                tempCtx.save();
                tempCtx.fillStyle = config.themeColor9;
                tempCtx.fillRect(padding, drawY - titleFontSize * 0.6, titleFontSize * 0.2, titleFontSize * 0.6);
                tempCtx.restore();
                const titleRect = HtmlUtil.drawText(tempCanvas, dataLine.name.toString(), padding + titleFontSize * 0.6, drawY, `${ titleFontSize }px ${ config.themeFont1 }`, config.themeColor3);
                if (dataLine.category) {
                  HtmlUtil.drawText(tempCanvas, dataLine.category.toString(), titleRect.x + titleRect.width + titleFontSize * 0.6, drawY, `${ titleFontSize * 0.6 }px ${ config.themeFont1 }`, config.themeColor3);
                }
                if (dataLine.price !== undefined && dataLine.price !== null) {
                  if (dataLine.price <= 0) {
                    const tempPriceRect = HtmlUtil.measureText(tempCanvas, '无料', 0, drawY, `${ titleFontSize }px ${ config.themeFont1 }`, config.themeColor3);
                    HtmlUtil.drawText(tempCanvas, '无料', width - padding - tempPriceRect.width, drawY, `${ titleFontSize }px ${ config.themeFont1 }`, config.themeColor3);
                  } else {
                    const tempUnitRect = HtmlUtil.measureText(tempCanvas, 'CNY', 0, drawY, `${ titleFontSize * 0.6 }px ${ config.themeFont1 }`, config.themeColor3);
                    const unitRect = HtmlUtil.drawText(tempCanvas, 'CNY', width - padding - tempUnitRect.width, drawY, `${ titleFontSize * 0.6 }px ${ config.themeFont1 }`, config.themeColor3);
                    const priceRect = HtmlUtil.measureText(tempCanvas, dataLine.price.toString(), 0, drawY, `${ titleFontSize }px ${ config.themeFont1 }`, config.themeColor3);
                    HtmlUtil.drawText(tempCanvas, dataLine.price.toString(), width - padding - unitRect.width - priceRect.width, drawY, `${ titleFontSize }px ${ config.themeFont1 }`, config.themeColor3);
                  }
                }
                drawY += baseFontSize * 1.6;
              }

              if (dataLine.description) {
                const descriptionFontSize = baseFontSize * 0.8;
                const descriptionRect = HtmlUtil.drawTextMultiline(tempCanvas, dataLine.description.toString(), padding, drawY, width - padding * 2 + descriptionFontSize * 0.5, `${ descriptionFontSize }px ${ config.themeFont2 }`, config.themeColor4);
                drawY += descriptionRect.height + baseFontSize * 0.4;
              }

              const infoFontSize = baseFontSize * 0.8;
              const infoList = [];
              if (dataLine.size) infoList.push({ key: '规格', value: `：${ dataLine.size.toString() }` });
              if (dataLine.material) infoList.push({ key: '材质', value: `：${ dataLine.material.toString() }` });
              if (dataLine.manufacture) infoList.push({ key: '工艺', value: `：${ dataLine.manufacture.toString() }` });
              if (dataLine.producer) infoList.push({ key: '制造设计', value: `：${ dataLine.producer.toString() }` });
              if (dataLine.author) infoList.push({ key: '作者', value: `：${ dataLine.author.toString() }` });
              if (dataLine.timestamp) infoList.push({ key: '定稿日期', value: `：${ dataLine.timestamp.toString() }` });
              for (const info of infoList) {
                // HtmlUtil.drawTextFixWidth(tempCanvas, info.key, padding, drawY, infoFontSize * 4, `${ infoFontSize }px ${ config.themeFont3 }`, config.themeColor5);
                // const valueRect = HtmlUtil.measureText(tempCanvas, info.value, 0, drawY, `${ infoFontSize }px ${ config.themeFont3 }`, config.themeColor5);
                // HtmlUtil.drawText(tempCanvas, info.value, width - padding - valueRect.width, drawY, `${ infoFontSize }px ${ config.themeFont3 }`, config.themeColor5);
                // drawY += valueRect.height;
                const keyRect = HtmlUtil.drawTextFixWidth(tempCanvas, info.key, padding, drawY, infoFontSize * 4, `${ infoFontSize }px ${ config.themeFont3 }`, config.themeColor5);
                HtmlUtil.drawText(tempCanvas, info.value, padding + keyRect.width, drawY, `${ infoFontSize }px ${ config.themeFont3 }`, config.themeColor5);
                drawY += keyRect.height + baseFontSize * 0.1;
              }
              drawY += baseFontSize * 0.3;

              if (dataLine.image) {
                drawY -= baseFontSize * 0.7;
                const innerPadding = baseFontSize * 0.4;
                const image = await HtmlUtil.arrayBufferToImage(dataLine.image as ArrayBuffer);
                const imageWidth = image.width;
                const imageHeight = image.height;
                const drawWidth = width - padding * 2 - innerPadding * 2;
                const drawHeight = imageHeight * (drawWidth / imageWidth);
                tempCtx.save();
                tempCtx.fillStyle = config.themeColor2;
                tempCtx.fillRect(padding, drawY, drawWidth + innerPadding * 2, drawHeight + innerPadding * 2);
                tempCtx.drawImage(image, padding + innerPadding, drawY + innerPadding, drawWidth, drawHeight);
                tempCtx.restore();
                drawY += (drawHeight + innerPadding * 2) + baseFontSize * 1.5;
              }

              drawY -= baseFontSize * 1.5;
              if (i === dataSheet.length - 1) drawY += padding;
              tempCtx.restore();
            }
            HtmlUtil.appendToCanvas(canvas, tempCanvas);
          }
          ctx.restore();
          const blob = await HtmlUtil.canvasToBlob(canvas);
          if (blob) {
            output[filename] = blob;
          }
        }
      }
    }
    return output;
  };

  public static async outputLongImageDataZip(image: HTMLImageElement, option: OutputBaseImageOption, data: LongImageExcel): Promise<Blob> {
    const zip = new JSZip();
    const fileRecord = await this.outputLongImageDataRecord(image, option, data);
    for (const filename in fileRecord) {
      zip.file(filename, fileRecord[filename]);
    }
    return await zip.generateAsync({ type: 'blob' });
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region Calc
  // ------------------------------------------------------------------------------
  public static calcBaseImageCutSize(image: HTMLImageElement, option: CalcBaseImageOption): number {
    const ratio = option.ratio;
    const mode = option.mode;
    const slice = option.slice || DEFAULT_SLICE;

    const size = Math.max(image.width, image.height);

    if(mode === 'cut'){
      const splitSize = size / 3 * ratio;
      const processSize = (size + splitSize) / slice;
      return Math.floor(processSize - splitSize);
    } else if (mode === 'scale'){
      const splitSize = (size * ratio) / (3 + ratio);
      const processSize = size / slice;
      return Math.floor(processSize - splitSize);
    }
    return -1;
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
}
// --------------------------------------------------------------------------------
//# endregion
// ================================================================================

// ================================================================================
// * Module exports
// --------------------------------------------------------------------------------
export default ImageCutterUtil;
// ================================================================================
