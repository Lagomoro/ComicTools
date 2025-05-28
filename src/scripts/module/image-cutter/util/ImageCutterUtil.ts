// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import JSZip from 'jszip';
// --------------------------------------------------------------------------------
import ExcelJS from 'exceljs';
// --------------------------------------------------------------------------------
import ObjectUtil from 'src/scripts/util/ObjectUtil';
import HtmlUtil from 'src/scripts/util/HtmlUtil';
import ExcelUtil from 'src/scripts/util/ExcelUtil';
// --------------------------------------------------------------------------------
import {
  DEFAULT_SLICE,
  CalcBaseImageOption,
  OutputBaseImageOption,
  ConfigSlotHeaderKey,
  CONFIG_SLOT_HEADER_RECORD,
  ConfigSlotKey,
  ConfigSlot,
  CONFIG_SLOT_RECORD,
  Config,
  ConfigLine,
  DataHeaderKey,
  DATA_HEADER_RECORD,
  Data,
  DataLine,
  LongImageExcel,
} from 'src/scripts/module/image-cutter/interface/common';
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
  public static getConfigFromConfigLine(configLine: ConfigLine): Config {
    const config = this.getDefaultConfig();
    config.themeColor1    = configLine.themeColor1 as string ?? config.themeColor1;
    config.themeColor2    = configLine.themeColor2 as string ?? config.themeColor2;
    config.themeColor3    = configLine.themeColor3 as string ?? config.themeColor3;
    config.themeColor4    = configLine.themeColor4 as string ?? config.themeColor4;
    config.themeColor5    = configLine.themeColor5 as string ?? config.themeColor5;
    config.themeColor6    = configLine.themeColor6 as string ?? config.themeColor6;
    config.themeColor7    = configLine.themeColor7 as string ?? config.themeColor7;
    config.themeColor8    = configLine.themeColor8 as string ?? config.themeColor8;
    config.themeColor9    = configLine.themeColor9 as string ?? config.themeColor9;
    config.themeFont1     = configLine.themeFont1 as string ?? config.themeFont1;
    config.themeFont2     = configLine.themeFont2 as string ?? config.themeFont2;
    config.themeFont3     = configLine.themeFont3 as string ?? config.themeFont3;
    config.themeFont4     = configLine.themeFont4 as string ?? config.themeFont4;
    config.watermarkImage = configLine.watermarkImage as ArrayBuffer ?? config.watermarkImage;

    config.watermarkImageSrc = config.watermarkImage ? HtmlUtil.arrayBufferToImageSrc(config.watermarkImage) : '';
    return config;
  }

  public static getDefaultConfig(): Config {
    const config: Config = {} as Config;
    for (const key in CONFIG_SLOT_RECORD) {
      config[key as ConfigSlotKey] = CONFIG_SLOT_RECORD[key as ConfigSlotKey].defaultValue as never;
    }
    return config;
  }
  // ------------------------------------------------------------------------------
  public static getDataFromDataLine(dataLine: DataLine): Data {
    const data = this.getDefaultData();
    data.id          = dataLine.id as string ?? data.id;
    data.name        = dataLine.name as string ?? data.name;
    data.image       = dataLine.image as ArrayBuffer ?? data.image;
    data.watermark   = dataLine.watermark as boolean ?? data.watermark;
    data.category    = dataLine.category as string ?? data.category;
    data.width       = dataLine.width as number ?? data.width;
    data.group       = dataLine.group as string ?? data.group;
    data.price       = dataLine.price as number ?? data.price;
    data.unit        = dataLine.unit as string ?? data.unit;
    data.currency    = dataLine.currency as string ?? data.currency;
    data.description = dataLine.description as string ?? data.description;
    data.size        = dataLine.size as string ?? data.size;
    data.material    = dataLine.material as string ?? data.material;
    data.manufacture = dataLine.manufacture as string ?? data.manufacture;
    data.producer    = dataLine.producer as string ?? data.producer;
    data.author      = dataLine.author as string ?? data.author;
    data.timestamp   = dataLine.timestamp as string ?? data.timestamp;
    data.storage     = dataLine.storage as number ?? data.storage;
    data.titleBefore = dataLine.titleBefore as string ?? data.titleBefore;
    data.textBefore  = dataLine.textBefore as string ?? data.textBefore;
    data.titleAfter  = dataLine.titleAfter as string ?? data.titleAfter;
    data.textAfter   = dataLine.textAfter as string ?? data.textAfter;

    data.imageSrc = data.image ? HtmlUtil.arrayBufferToImageSrc(data.image) : '';
    return data;
  }

  public static getDefaultData(): Data {
    const data: Data = {} as Data;
    for (const key in DATA_HEADER_RECORD) {
       data[key as DataHeaderKey] = DATA_HEADER_RECORD[key as DataHeaderKey].defaultValue as never;
    }
    return data;
  }
  // ------------------------------------------------------------------------------
  public static getDefaultLongImageExcel(): LongImageExcel {
    return { config: this.getDefaultConfig(), data: {} };
  }

  public static getExampleLongImageExcel(): LongImageExcel {
    const config: Config = {} as Config;
    for (const key in CONFIG_SLOT_RECORD) {
      config[key as ConfigSlotKey] = CONFIG_SLOT_RECORD[key as ConfigSlotKey].sampleValue as never;
    }
    const data: Data = {} as Data;
    for (const key in DATA_HEADER_RECORD) {
      data[key as DataHeaderKey] = DATA_HEADER_RECORD[key as DataHeaderKey].sampleValue as never;
    }
    return { config, data: { 7: [data], 8: [data], 9: [data] } };
  }
  // ------------------------------------------------------------------------------
  public static exportLongImageExcel(excelData: LongImageExcel): ExcelJS.Workbook {
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

    const configSlotHeaderRow = ObjectUtil.mapArray(CONFIG_SLOT_HEADER_RECORD, (value, key) => `${ value.name }\r(${ key })`);
    const configSlotHeaderKeyList = ObjectUtil.mapArray(CONFIG_SLOT_HEADER_RECORD, (value, key) => key);
    const sheetConfig = workbook.addWorksheet('Config');
    sheetConfig.addRow(configSlotHeaderRow).eachCell((cell: ExcelJS.Cell) => { cell.alignment = { horizontal: 'center', wrapText: true } });
    let configIndex = 0;
    for (const key in CONFIG_SLOT_HEADER_RECORD){
      const configHeader = CONFIG_SLOT_HEADER_RECORD[key as ConfigSlotHeaderKey];
      sheetConfig.getColumn(configIndex + 1).width = configHeader.width;
      configIndex ++;
    }
    for (const key in CONFIG_SLOT_RECORD){
      if(key in excelData.config){
        const configSlot = CONFIG_SLOT_RECORD[key as ConfigSlotKey];
        if(configSlot.type === 'color') {
          const row = sheetConfig.addRow(configSlotHeaderKeyList.map(p => p === 'value' ? '' : configSlot[p as keyof ConfigSlot]));
          row.height = 21;
          row.getCell(configSlotHeaderKeyList.indexOf('value') + 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: excelData.config[key as ConfigSlotKey] as string }}
        } else {
          sheetConfig.addRow(configSlotHeaderKeyList.map(p => p === 'value' ? excelData.config[key as ConfigSlotKey] : configSlot[p as keyof ConfigSlot])).height = 21;
        }
      }
    }

    const dataHeaderRow = ObjectUtil.mapArray(DATA_HEADER_RECORD, (value, key) => `${ value.optional ? '' : '*'}${ value.name }\r(${ key })`);
    const dataHeaderKeyList = ObjectUtil.mapArray(DATA_HEADER_RECORD, (value, key) => key);
    for(const sheetName in excelData.data){
      const dataList = excelData.data[sheetName];
      const sheetData = workbook.addWorksheet(sheetName);
      sheetData.addRow(dataHeaderRow).eachCell((cell: ExcelJS.Cell) => { cell.alignment = { horizontal: 'center', wrapText: true } });
      let dataIndex = 0;
      for (const key in DATA_HEADER_RECORD){
        const dataHeader = DATA_HEADER_RECORD[key as DataHeaderKey];
        sheetData.getColumn(dataIndex + 1).width = dataHeader.width;
        sheetData.getCell(1, dataIndex + 1).note = `${ dataHeader.description }\r<${ dataHeader.type }>\r${ dataHeader.optional ? '选填' : '*必填'}`;
        dataIndex++;
      }
      for(const data of dataList){
        const row = [];
        for(const key in data){
          row[dataHeaderKeyList.indexOf(key as DataHeaderKey)] = data[key as DataHeaderKey];
        }
        sheetData.addRow(row).height = 21;
      }
    }

    return workbook;
  }

  public static importLongImageExcel(workbook: ExcelJS.Workbook): LongImageExcel {
    const data = this.getDefaultLongImageExcel();
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
        });

        const imageList = ExcelUtil.getWorksheetImageList(workbook, worksheet);

        const configLine: ConfigLine = {};
        worksheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
          if(rowNumber > 1){
            let key: ConfigSlotKey = undefined as unknown as ConfigSlotKey;
            row.eachCell((cell: ExcelJS.Cell, colNumber: number) => {
              if (title[colNumber] === 'key' && cell.text) {
                key = cell.text as ConfigSlotKey;
              }
            });
            if (key) {
              const configSlotFilter = Object.values(ObjectUtil.filter(CONFIG_SLOT_RECORD, (value, _key) => _key === key));
              if(configSlotFilter.length === 1){
                for(let i = 0; i < worksheet.getRow(1).cellCount; i++){
                  const colNumber = i + 1;
                  const cell = row.getCell(colNumber);
                  if (title[colNumber] === 'value') {
                    switch (configSlotFilter[0].type) {
                      case 'string':
                        if(typeof cell.value === 'string') {
                          configLine[key] = cell.value as string;
                        } else {
                          configLine[key] = String(cell.value ?? '');
                        }
                        break;
                      case 'number':
                        if(typeof cell.value === 'number') {
                          configLine[key] = cell.value as number;
                        } else {
                          configLine[key] = Number(cell.value ?? 0);
                        }
                        break;
                      case 'boolean':
                        if(typeof cell.value === 'boolean') {
                          configLine[key] = cell.value as boolean;
                        } else {
                          configLine[key] = Boolean(cell.value ?? false);
                        }
                        break;
                      case 'image':
                        const image = imageList.filter(p => p.colNumber === colNumber && p.rowNumber == rowNumber);
                        if(image.length > 0){
                          configLine[key] = image[0].buffer;
                        }
                        break;
                      case 'color':
                        if(cell.fill) {
                          configLine[key] = ExcelUtil.argbStringToColor((cell.fill as { fgColor: { argb: string } }).fgColor.argb);
                        }
                        break;
                      case 'font':
                        if(typeof cell.value === 'string') {
                          configLine[key] = cell.value as string;
                        }
                        break;
                    }
                  }
                }
              }
            }
          }
        });
        data.config = this.getConfigFromConfigLine(configLine);
      } else {
        const index = parseInt(worksheet.name);
        if (isNaN(index) || index < 1 || index > 9) {
          return;
        }
        data.data[index] = [];

        const title: Record<number, DataHeaderKey> = {};
        worksheet.getRow(1).eachCell((cell: ExcelJS.Cell, colNumber: number) => {
          if(cell.type === ExcelJS.ValueType.String && cell.text){
            const match = cell.text.match(/(?<=\()(.+?)(?=\))/g);
            if(match && match.length === 1){
              title[colNumber] = match[0] as DataHeaderKey;
            }
          }
        });

        const imageList = ExcelUtil.getWorksheetImageList(workbook, worksheet);

        worksheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
          if(rowNumber > 1){
            const dataLine: DataLine = {};
            for(let i = 0; i < worksheet.getRow(1).cellCount; i++){
              const colNumber = i + 1;
              const cell = row.getCell(colNumber);
              const key = title[colNumber]
              const dataHeaderFilter = Object.values(ObjectUtil.filter(DATA_HEADER_RECORD, (value, _key) => _key === key));
              if(dataHeaderFilter.length === 1) {
                switch (dataHeaderFilter[0].type) {
                  case 'string':
                    if (typeof cell.value === 'string') {
                      dataLine[key] = cell.value as string;
                    } else {
                      dataLine[key] = String(cell.value ?? '');
                    }
                    break;
                  case 'number':
                    if (typeof cell.value === 'number') {
                      dataLine[key] = cell.value as number;
                    } else {
                      dataLine[key] = Number(cell.value ?? 0);
                    }
                    break;
                  case 'boolean':
                    if (typeof cell.value === 'boolean') {
                      dataLine[key] = cell.value as boolean;
                    } else {
                      dataLine[key] = Boolean(cell.value ?? false);
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
            data.data[index].push(this.getDataFromDataLine(dataLine));
          }
        });
      }
    });

    return data;
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
          const config = data.config;
          ctx.save();
          ctx.drawImage(originImage, 0, 0);
          for(let i = 0; i < dataSheet.length;i ++){
            const dataLine = dataSheet[i];
            const width = originImage.width;
            const padding = width / 10;
            const baseFontSize = width / 20;
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = originImage.width;
            tempCanvas.height = 0;
            tempCanvas.height = await this._drawLongImage(tempCanvas, config, dataLine, padding, baseFontSize, i === dataSheet.length - 1);
            await this._drawLongImage(tempCanvas, config, dataLine, padding, baseFontSize, i === dataSheet.length - 1);
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
  private static async _drawLongImage(canvas: HTMLCanvasElement, config: Config, data: Data, padding: number, baseFontSize: number, last: boolean): Promise<number> {
    const width = canvas.width;
    const height = canvas.height;
    const calcHeightOnly = height === 0;
    const ctx = canvas.getContext('2d');
    let drawY = 0;
    if(ctx){
      ctx.save();
      drawY = padding;

      if(!calcHeightOnly){
        ctx.save();
        ctx.fillStyle = config.themeColor1;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      if (data.name) {
        const titleFontSize = baseFontSize * 1.2;
        drawY += titleFontSize;
        if(!calcHeightOnly) {
          ctx.save();
          ctx.fillStyle = config.themeColor9;
          ctx.fillRect(padding, drawY - titleFontSize * 0.6, titleFontSize * 0.2, titleFontSize * 0.6);
          ctx.restore();
          const titleRect = HtmlUtil.drawText(canvas, data.name.toString(), padding + titleFontSize * 0.6, drawY, `${titleFontSize}px ${config.themeFont1}`, config.themeColor3);
          if (data.category) {
            HtmlUtil.drawText(canvas, data.category.toString(), titleRect.x + titleRect.width + titleFontSize * 0.6, drawY, `${titleFontSize * 0.6}px ${config.themeFont1}`, config.themeColor3);
          }
          if (data.price !== undefined && data.price !== null && data.currency) {
            if (data.price === 0) {
              const tempPriceRect = HtmlUtil.measureText(canvas, '无料', 0, drawY, `${titleFontSize}px ${config.themeFont1}`, config.themeColor3);
              HtmlUtil.drawText(canvas, '无料', width - padding - tempPriceRect.width, drawY, `${titleFontSize}px ${config.themeFont1}`, config.themeColor3);
            }
            if (data.price > 0) {
              const tempUnitRect = HtmlUtil.measureText(canvas, data.currency, 0, drawY, `${titleFontSize * 0.6}px ${config.themeFont1}`, config.themeColor3);
              const unitRect = HtmlUtil.drawText(canvas, data.currency, width - padding - tempUnitRect.width, drawY, `${titleFontSize * 0.6}px ${config.themeFont1}`, config.themeColor3);
              const priceRect = HtmlUtil.measureText(canvas, data.price.toString(), 0, drawY, `${titleFontSize}px ${config.themeFont1}`, config.themeColor3);
              HtmlUtil.drawText(canvas, data.price.toString(), width - padding - unitRect.width - priceRect.width, drawY, `${titleFontSize}px ${config.themeFont1}`, config.themeColor3);
            }
          }
        }
        drawY += baseFontSize * 1.6;
      }

      if(data.titleBefore){
        drawY -= baseFontSize * 0.5;
        const titleBeforeFontSize = baseFontSize * 0.8;
        const innerPadding = baseFontSize * 0.8;
        const drawWidth = width - padding * 2;
        const drawHeight = baseFontSize * 1.8;
        if(!calcHeightOnly) {
          ctx.save();
          ctx.fillStyle = config.themeColor7;
          ctx.beginPath();
          ctx.roundRect(padding, drawY, drawWidth, drawHeight, baseFontSize * 0.4);
          ctx.closePath();
          ctx.fill();
          if(data.textBefore) {
            ctx.fillRect(padding, drawY + drawHeight / 2, drawWidth, drawHeight / 2);
          }
          HtmlUtil.drawTextAlign(canvas, data.titleBefore as string, padding, drawY + baseFontSize * 1.2, drawWidth, `${ titleBeforeFontSize }px ${ config.themeFont4 }`, config.themeColor6, 'center');
          ctx.restore();
        }
        if(data.textBefore) {
          const textY = drawY + drawHeight + innerPadding + titleBeforeFontSize * 1.1;
          const textRect = HtmlUtil.measureTextMultiline(canvas, data.textBefore as string, padding + innerPadding, textY, drawWidth - innerPadding * 2, `${ titleBeforeFontSize }px ${ config.themeFont4 }`, config.themeColor8);
          if(!calcHeightOnly) {
            ctx.save();
            ctx.strokeStyle = config.themeColor7;
            ctx.lineWidth = innerPadding / 16;
            ctx.beginPath();
            ctx.roundRect(padding, drawY, drawWidth, drawHeight + textRect.height + innerPadding * 2, baseFontSize * 0.4);
            ctx.closePath();
            ctx.stroke();
            HtmlUtil.drawTextMultiline(canvas, data.textBefore as string, padding + innerPadding, textY, drawWidth - innerPadding * 2, `${ titleBeforeFontSize }px ${ config.themeFont4 }`, config.themeColor8);
            ctx.restore();
          }
          drawY += textRect.height + innerPadding * 2 - baseFontSize * 0.2;
        }
        drawY += drawHeight + baseFontSize * 1.4;
      }

      if (data.description) {
        const descriptionFontSize = baseFontSize * 0.8;
        const descriptionRect = calcHeightOnly ?
          HtmlUtil.measureTextMultiline(canvas, data.description.toString(), padding, drawY + baseFontSize * 0.3, width - padding * 2 + descriptionFontSize * 0.5, `${descriptionFontSize}px ${config.themeFont2}`, config.themeColor4) :
          HtmlUtil.drawTextMultiline(canvas, data.description.toString(), padding, drawY + baseFontSize * 0.3, width - padding * 2 + descriptionFontSize * 0.5, `${descriptionFontSize}px ${config.themeFont2}`, config.themeColor4);
        drawY += descriptionRect.height + baseFontSize * 0.7;
      }

      const infoFontSize = baseFontSize * 0.8;
      const infoList = [];
      if (data.size)        infoList.push({ key: '规格', value: `：${ data.size.toString() }` });
      if (data.material)    infoList.push({ key: '材质', value: `：${ data.material.toString() }` });
      if (data.manufacture) infoList.push({ key: '工艺', value: `：${ data.manufacture.toString() }` });
      if (data.producer)    infoList.push({ key: '制造设计', value: `：${ data.producer.toString() }` });
      if (data.author)      infoList.push({ key: '作者', value: `：${ data.author.toString() }` });
      if (data.timestamp)   infoList.push({ key: '定稿日期', value: `：${ data.timestamp.toString() }` });
      for (const info of infoList) {
        const keyRect = calcHeightOnly ?
          HtmlUtil.measureTextFixWidth(canvas, info.key, padding, drawY, infoFontSize * 4, `${ infoFontSize }px ${ config.themeFont3 }`, config.themeColor5) :
          HtmlUtil.drawTextFixWidth(canvas, info.key, padding, drawY, infoFontSize * 4, `${ infoFontSize }px ${ config.themeFont3 }`, config.themeColor5);
        if(!calcHeightOnly){
          HtmlUtil.drawText(canvas, info.value, padding + keyRect.width, drawY, `${ infoFontSize }px ${ config.themeFont3 }`, config.themeColor5);
        }
        drawY += keyRect.height + baseFontSize * 0.1;
      }
      drawY += baseFontSize * 0.3;

      if (data.image) {
        drawY -= baseFontSize * 0.7;
        const innerPadding = baseFontSize * 0.4;
        const image = await HtmlUtil.arrayBufferToImage(data.image as ArrayBuffer);
        const imageWidth = image.width;
        const imageHeight = image.height;
        const drawWidth = width - padding * 2 - innerPadding * 2;
        const drawHeight = imageHeight * (drawWidth / imageWidth);
        if(!calcHeightOnly) {
          ctx.save();
          ctx.fillStyle = config.themeColor2;
          ctx.beginPath();
          ctx.roundRect(padding, drawY, drawWidth + innerPadding * 2, drawHeight + innerPadding * 2, innerPadding);
          ctx.closePath();
          ctx.fill();
          ctx.drawImage(image, padding + innerPadding, drawY + innerPadding, drawWidth, drawHeight);
          if (data.watermark && config.watermarkImageSrc) {
            HtmlUtil.repeatImageToCanvas(canvas, await HtmlUtil.imageSrcToImage(config.watermarkImageSrc), padding + innerPadding, drawY + innerPadding, drawWidth, drawHeight);
          }
          ctx.restore();
        }
        drawY += (drawHeight + innerPadding * 2) + baseFontSize * 1.5;
      }

      if(data.titleAfter){
        drawY -= baseFontSize * 0.7;
        const titleAfterFontSize = baseFontSize * 0.8;
        const innerPadding = baseFontSize * 0.8;
        const drawWidth = width - padding * 2;
        const drawHeight = baseFontSize * 1.8;
        if(!calcHeightOnly) {
          ctx.save();
          ctx.fillStyle = config.themeColor7;
          ctx.beginPath();
          ctx.roundRect(padding, drawY, drawWidth, drawHeight, baseFontSize * 0.4);
          ctx.closePath();
          ctx.fill();
          if(data.textAfter) {
            ctx.fillRect(padding, drawY + drawHeight / 2, drawWidth, drawHeight / 2);
          }
          HtmlUtil.drawTextAlign(canvas, data.titleAfter as string, padding, drawY + baseFontSize * 1.2, drawWidth, `${ titleAfterFontSize }px ${ config.themeFont4 }`, config.themeColor6, 'center');
          ctx.restore();
        }
        if(data.textAfter) {
          const textY = drawY + drawHeight + innerPadding + titleAfterFontSize * 1.1;
          const textRect = HtmlUtil.measureTextMultiline(canvas, data.textAfter as string, padding + innerPadding, textY, drawWidth - innerPadding * 2, `${ titleAfterFontSize }px ${ config.themeFont4 }`, config.themeColor8);
          if(!calcHeightOnly) {
            ctx.save();
            ctx.strokeStyle = config.themeColor7;
            ctx.lineWidth = innerPadding / 16;
            ctx.beginPath();
            ctx.roundRect(padding, drawY, drawWidth, drawHeight + textRect.height + innerPadding * 2, baseFontSize * 0.4);
            ctx.closePath();
            ctx.stroke();
            HtmlUtil.drawTextMultiline(canvas, data.textAfter as string, padding + innerPadding, textY, drawWidth - innerPadding * 2, `${ titleAfterFontSize }px ${ config.themeFont4 }`, config.themeColor8);
            ctx.restore();
          }
          drawY += textRect.height + innerPadding * 2;
        }
        drawY += drawHeight + baseFontSize * 1.5;
      }

      drawY -= baseFontSize * 1.5;
      if (last) drawY += padding;
      ctx.restore();
    }
    return drawY;
  }
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
