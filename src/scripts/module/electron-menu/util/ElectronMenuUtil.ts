// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import ExcelJS from 'exceljs';
// --------------------------------------------------------------------------------
import ObjectUtil from 'src/scripts/util/ObjectUtil';
import HtmlUtil from 'src/scripts/util/HtmlUtil';
import ExcelUtil from 'src/scripts/util/ExcelUtil';
// --------------------------------------------------------------------------------
import {
  ConfigSlotHeaderKey,
  CONFIG_SLOT_HEADER_RECORD,
  ConfigSlotKey,
  ConfigSlot,
  CONFIG_SLOT_RECORD,
  Config,
  ConfigLine,
  GroupHeaderKey,
  GROUP_HEADER_RECORD,
  Group,
  GroupLine,
  DataHeaderKey,
  DATA_HEADER_RECORD,
  Data,
  DataLine,
  ElectronMenuExcel,
} from 'src/scripts/module/electron-menu/interface/common';
import ImageCutterUtil from 'src/scripts/module/image-cutter/util/ImageCutterUtil';
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
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region ElectronMenuExcel
  // ------------------------------------------------------------------------------
  public static getConfigFromConfigLine(configLine: ConfigLine): Config {
    return ImageCutterUtil.getConfigFromConfigLine(configLine);
  }

  public static getDefaultConfig(): Config {
    return ImageCutterUtil.getDefaultConfig();
  }
  // ------------------------------------------------------------------------------
  public static getGroupFromGroupLine(groupLine: GroupLine): Group {
    const group = this.getDefaultGroup();
    group.id          = groupLine.id as string ?? group.id;
    group.name        = groupLine.name as string ?? group.name;
    group.category    = groupLine.category as string ?? group.category;
    group.width       = groupLine.width as number ?? group.width;
    group.displayInfo = groupLine.displayInfo as boolean ?? group.displayInfo;
    group.displayHint = groupLine.displayHint as boolean ?? group.displayHint;
    group.price       = groupLine.price as number ?? group.price;
    group.unit        = groupLine.unit as string ?? group.unit;
    group.currency    = groupLine.currency as string ?? group.currency;
    group.description = groupLine.description as string ?? group.description;
    group.size        = groupLine.size as string ?? group.size;
    group.material    = groupLine.material as string ?? group.material;
    group.manufacture = groupLine.manufacture as string ?? group.manufacture;
    group.producer    = groupLine.producer as string ?? group.producer;
    group.author      = groupLine.author as string ?? group.author;
    group.timestamp   = groupLine.timestamp as string ?? group.timestamp;
    group.titleBefore = groupLine.titleBefore as string ?? group.titleBefore;
    group.textBefore  = groupLine.textBefore as string ?? group.textBefore;
    group.titleAfter  = groupLine.titleAfter as string ?? group.titleAfter;
    group.textAfter   = groupLine.textAfter as string ?? group.textAfter;
    return group;
  }

  public static getDefaultGroup(): Group {
    const group: Group = {} as Group;
    for (const key in GROUP_HEADER_RECORD) {
      group[key as GroupHeaderKey] = GROUP_HEADER_RECORD[key as GroupHeaderKey].defaultValue as never;
    }
    return group;
  }
  // ------------------------------------------------------------------------------
  public static getDataFromDataLine(dataLine: DataLine): Data {
    return ImageCutterUtil.getDataFromDataLine(dataLine);
  }

  public static getDefaultData(): Data {
    return ImageCutterUtil.getDefaultData();
  }
  // ------------------------------------------------------------------------------
  public static getDefaultElectronMenuExcel(): ElectronMenuExcel {
    return { config: this.getDefaultConfig(), group: [], data: [] };
  }

  public static getExampleElectronMenuExcel(): ElectronMenuExcel {
    const config: Config = {} as Config;
    for (const key in CONFIG_SLOT_RECORD) {
      config[key as ConfigSlotKey] = CONFIG_SLOT_RECORD[key as ConfigSlotKey].sampleValue as never;
    }
    const group: Group = {} as Group;
    for (const key in GROUP_HEADER_RECORD) {
      group[key as GroupHeaderKey] = GROUP_HEADER_RECORD[key as GroupHeaderKey].sampleValue as never;
    }
    const data: Data = {} as Data;
    for (const key in DATA_HEADER_RECORD) {
      data[key as DataHeaderKey] = DATA_HEADER_RECORD[key as DataHeaderKey].sampleValue as never;
    }
    return { config, group: [group], data: [data] };
  }
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

    const groupHeaderRow = ObjectUtil.mapArray(GROUP_HEADER_RECORD, (value, key) => `${ value.optional ? '' : '*'}${ value.name }\r(${ key })`);
    const groupHeaderKeyList = ObjectUtil.mapArray(GROUP_HEADER_RECORD, (value, key) => key);
    const sheetGroup = workbook.addWorksheet('Group-1');
    sheetGroup.addRow(groupHeaderRow).eachCell((cell: ExcelJS.Cell) => { cell.alignment = { horizontal: 'center', wrapText: true } });
    let groupIndex = 0;
    for (const key in GROUP_HEADER_RECORD){
      const groupHeader = GROUP_HEADER_RECORD[key as GroupHeaderKey];
      sheetGroup.getColumn(groupIndex + 1).width = groupHeader.width;
      sheetGroup.getCell(1, groupIndex + 1).note = `${ groupHeader.description }\r<${ groupHeader.type }>\r${ groupHeader.optional ? '选填' : '*必填'}`;
      groupIndex++;
    }
    for(const group of excelData.group){
      const row = [];
      for(const key in group){
        row[groupHeaderKeyList.indexOf(key as GroupHeaderKey)] = group[key as GroupHeaderKey];
      }
      sheetGroup.addRow(row).height = 21;
    }

    const dataHeaderRow = ObjectUtil.mapArray(DATA_HEADER_RECORD, (value, key) => `${ value.optional ? '' : '*'}${ value.name }\r(${ key })`);
    const dataHeaderKeyList = ObjectUtil.mapArray(DATA_HEADER_RECORD, (value, key) => key);
    const sheetData = workbook.addWorksheet('Data-1');
    sheetData.addRow(dataHeaderRow).eachCell((cell: ExcelJS.Cell) => { cell.alignment = { horizontal: 'center', wrapText: true } });
    let dataIndex = 0;
    for (const key in DATA_HEADER_RECORD){
      const dataHeader = DATA_HEADER_RECORD[key as DataHeaderKey];
      sheetData.getColumn(dataIndex + 1).width = dataHeader.width;
      sheetData.getCell(1, dataIndex + 1).note = `${ dataHeader.description }\r<${ dataHeader.type }>\r${ dataHeader.optional ? '选填' : '*必填'}`;
      dataIndex++;
    }
    for(const data of excelData.data){
      const row = [];
      for(const key in data){
        row[dataHeaderKeyList.indexOf(key as DataHeaderKey)] = data[key as DataHeaderKey];
      }
      sheetData.addRow(row).height = 21;
    }

    return workbook;
  }

  public static importElectronMenuExcel(workbook: ExcelJS.Workbook): ElectronMenuExcel {
    const data = this.getDefaultElectronMenuExcel();
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
      } else if (worksheet.name.startsWith('Group-')) {
        const title: Record<number, GroupHeaderKey> = {};
        worksheet.getRow(1).eachCell((cell: ExcelJS.Cell, colNumber: number) => {
          if(cell.type === ExcelJS.ValueType.String && cell.text){
            const match = cell.text.match(/(?<=\()(.+?)(?=\))/g);
            if(match && match.length === 1){
              title[colNumber] = match[0] as GroupHeaderKey;
            }
          }
        });

        worksheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
          if(rowNumber > 1){
            const groupLine: GroupLine = {};
            for(let i = 0; i < worksheet.getRow(1).cellCount; i++){
              const colNumber = i + 1;
              const cell = row.getCell(colNumber);
              const key = title[colNumber]
              const groupHeaderFilter = Object.values(ObjectUtil.filter(GROUP_HEADER_RECORD, (value, _key) => _key === key));
              if(groupHeaderFilter.length === 1) {
                switch (groupHeaderFilter[0].type) {
                  case 'string':
                    if (typeof cell.value === 'string') {
                      groupLine[key] = cell.value as string;
                    } else {
                      groupLine[key] = String(cell.value ?? '');
                    }
                    break;
                  case 'number':
                    if (typeof cell.value === 'number') {
                      groupLine[key] = cell.value as number;
                    } else {
                      groupLine[key] = Number(cell.value ?? 0);
                    }
                    break;
                  case 'boolean':
                    if (typeof cell.value === 'boolean') {
                      groupLine[key] = cell.value as boolean;
                    } else {
                      groupLine[key] = Boolean(cell.value ?? false);
                    }
                    break;
                }
              }
            }
            groupLine.id =`${ worksheet.name }.${ groupLine.id }`;
            data.group.push(this.getGroupFromGroupLine(groupLine));
          }
        });
      } else if (worksheet.name.startsWith('Data-')) {
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
            dataLine.id =`${ worksheet.name }.${ dataLine.id }`;
            data.data.push(this.getDataFromDataLine(dataLine));
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
