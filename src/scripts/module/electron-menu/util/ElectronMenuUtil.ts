// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import ExcelJS from 'exceljs';
// --------------------------------------------------------------------------------
import {
  CONFIG_SLOT_HEADER_LIST,
  CONFIG_SLOT_LIST,
  ConfigSlot,
  ConfigSlotHeaderKey,
  GROUP_HEADER_LIST,
  GroupKey,
  DATA_HEADER_LIST,
  DataKey,
  DEFAULT_ELECTRON_MENU_EXCEL,
  ElectronMenuExcel,
  ConfigKey,
  Data,
  Group
} from 'src/scripts/module/electron-menu/interface/common';
import ObjectUtil from 'src/scripts/util/ObjectUtil';
import HtmlUtil from 'src/scripts/util/HtmlUtil';
import ExcelUtil from 'src/scripts/util/ExcelUtil';
// ================================================================================

// ================================================================================
//# region ElectronMenuUtil
// --------------------------------------------------------------------------------
export class ElectronMenuUtil {
  // ------------------------------------------------------------------------------
  // * Function
  // ------------------------------------------------------------------------------
  //# region Draw
  // ------------------------------------------------------------------------------
  public static async getSelloutImageSrc(arrayBuffer: ArrayBuffer, selloutImage: HTMLImageElement): Promise<string> {
    const image = await HtmlUtil.arrayBufferToImage(arrayBuffer);
    const width = image.width;
    const height = image.height;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if(ctx) {
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0)';
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      ctx.drawImage(image, 0, 0);

      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = 'multiply';
      const dw = width / 4 * 3;
      const dx = (width  - dw) / 2;
      const dh = dw / selloutImage.width * selloutImage.height;
      const dy = (height - dh) / 2;
      ctx.drawImage(selloutImage, 0, 0,selloutImage.width, selloutImage.height, dx, dy, dw, dh);
      ctx.globalCompositeOperation = 'source-over';
      ctx.restore();
    }

    return canvas.toDataURL();
  };

  public static getNormalImageSrc(arrayBuffer: ArrayBuffer): string {
    return HtmlUtil.arrayBufferToImageSrc(arrayBuffer);
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region ElectronMenuExcel
  // ------------------------------------------------------------------------------
  public static exportElectronMenuExcel(excelData: ElectronMenuExcel): ExcelJS.Workbook {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Lagomoro';
    workbook.lastModifiedBy = 'Lagomoro';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    const readme = [
      '欢迎使用兔萌社摊主工具！',
      '你现在看到的是【电子菜单】的范例配置表格',
      '本说明文档将指引你完成配置，让我们开始吧！',
      '',
      '配置表格中各个 Sheet 的功能：',
      '【Readme】：说明文档，实际导入的时候这个 Sheet 不会被读取，可以删掉。',
      '【Config】：全局配置，对应工具中的配置字段，如果删掉了就会加载默认配置。',
      '【Group-*】：分组数据，Sheet 名称可以是 Group- 开头的任意字段。本范例文档中存在名称为【Group-1】的 Sheet。',
      '【Data-*】：数据，Sheet 名称可以是 Data- 开头的任意字段。本范例文档中存在名称为【Data-1】的 Sheet。。',
      '【*(其他名称)】的 Sheet 不会被读取，写名称的时候要注意噢，像【Sheet1】【Group1】【Data1】这些都是无效名称。',
      'Sheet 内具体字段的使用方式请参考页面内的注释。',
      '小技巧：可以新建一个 Sheet 把所有制品填写进去，只要没有命名成【Group-*】【Data-*】都不会被读取，需要生成的时候再把参展制品粘贴到【Group-*】【Data-*】的 Sheet 里。',
      '小技巧：可以和【一键摊宣：长图设置】共用一个表格。',
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
      if(configSlot.key in excelData.config){
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

    const groupHeaderRow = GROUP_HEADER_LIST.map(p => `${ p.optional ? '' : '*'}${ p.name }\r(${ p.key })`);
    const groupKeyList = GROUP_HEADER_LIST.map(p => p.key);
    const sheetGroup = workbook.addWorksheet('Group-1');
    sheetGroup.addRow(groupHeaderRow).eachCell((cell: ExcelJS.Cell) => { cell.alignment = { horizontal: 'center', wrapText: true } });
    for(let i = 0; i < GROUP_HEADER_LIST.length; i++){
      const groupHeader = GROUP_HEADER_LIST[i];
      sheetGroup.getColumn(i + 1).width = groupHeader.width;
      sheetGroup.getCell(1, i + 1).note = `${ groupHeader.description }\r<${ groupHeader.type }>\r${ groupHeader.optional ? '选填' : '*必填'}`;
    }
    for(const group of excelData.group){
      const row = [];
      for(const key in group){
        row[groupKeyList.indexOf(key as GroupKey)] = group[key as GroupKey];
      }
      sheetGroup.addRow(row).height = 21;
    }

    const dataHeaderRow = DATA_HEADER_LIST.map(p => `${ p.optional ? '' : '*'}${ p.name }\r(${ p.key })`);
    const dataKeyList = DATA_HEADER_LIST.map(p => p.key);
    const sheetData = workbook.addWorksheet('Data-1');
    sheetData.addRow(dataHeaderRow).eachCell((cell: ExcelJS.Cell) => { cell.alignment = { horizontal: 'center', wrapText: true } });
    for(let i = 0; i < DATA_HEADER_LIST.length; i++){
      const dataHeader = DATA_HEADER_LIST[i];
      sheetData.getColumn(i + 1).width = dataHeader.width;
      sheetData.getCell(1, i + 1).note = `${ dataHeader.description }\r<${ dataHeader.type }>\r${ dataHeader.optional ? '选填' : '*必填'}`;
    }
    for(const data of excelData.data){
      const row = [];
      for(const key in data){
        row[dataKeyList.indexOf(key as DataKey)] = data[key as DataKey];
      }
      sheetData.addRow(row).height = 21;
    }

    return workbook;
  }

  public static importElectronMenuExcel(workbook: ExcelJS.Workbook): ElectronMenuExcel {
    const data = ObjectUtil.deepCopy(DEFAULT_ELECTRON_MENU_EXCEL);
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
                          data.config[key] = ExcelUtil.argbStringToColor((cell.fill as { fgColor: { argb: string } }).fgColor.argb);
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
      } else if (worksheet.name.startsWith('Group-')) {
        const title: Record<number, GroupKey> = {};
        worksheet.getRow(1).eachCell((cell: ExcelJS.Cell, colNumber: number) => {
          if(cell.type === ExcelJS.ValueType.String && cell.text){
            const match = cell.text.match(/(?<=\()(.+?)(?=\))/g);
            if(match && match.length === 1){
              title[colNumber] = match[0] as GroupKey;
            }
          }
        });

        worksheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
          if(rowNumber > 1){
            const groupLine: Group = {};
            for(let i = 0; i < worksheet.getRow(1).cellCount; i++){
              const colNumber = i + 1;
              const cell = row.getCell(colNumber);
              const key = title[colNumber]
              const groupHeaderFilter = GROUP_HEADER_LIST.filter(p => p.key === key);
              if(groupHeaderFilter.length === 1) {
                switch (groupHeaderFilter[0].type) {
                  case 'string':
                    if (typeof cell.value === 'string') {
                      groupLine[key] = cell.value as string;
                    }
                    break;
                  case 'number':
                    if (typeof cell.value === 'number') {
                      groupLine[key] = cell.value as number;
                    }
                    break;
                  case 'boolean':
                    if (typeof cell.value === 'boolean') {
                      groupLine[key] = cell.value as boolean;
                    }
                    break;
                }
              }
            }
            groupLine.id =`${ worksheet.name }.${ groupLine.id }`;
            data.group.push(groupLine);
          }
        });
      } else if (worksheet.name.startsWith('Data-')) {
        const title: Record<number, DataKey> = {};
        worksheet.getRow(1).eachCell((cell: ExcelJS.Cell, colNumber: number) => {
          if(cell.type === ExcelJS.ValueType.String && cell.text){
            const match = cell.text.match(/(?<=\()(.+?)(?=\))/g);
            if(match && match.length === 1){
              title[colNumber] = match[0] as DataKey;
            }
          }
        });

        const imageList = ExcelUtil.getWorksheetImageList(workbook, worksheet);

        worksheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
          if(rowNumber > 1){
            const dataLine: Data = {};
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
            dataLine.id =`${ worksheet.name }.${ dataLine.id }`;
            data.data.push(dataLine);
          }
        });
      }
    });

    return data;
  }
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
export default ElectronMenuUtil;
// ================================================================================
