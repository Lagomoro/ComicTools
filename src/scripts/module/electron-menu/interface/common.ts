// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------

// ================================================================================

// ================================================================================
//# region SplitMenu
// --------------------------------------------------------------------------------
export type ScreenKey = 'single' | 'double-horizontal' | 'double-vertical' | 'triple-horizontal' | 'triple-vertical' | 'quadruple';
export interface Screen {
  key: ScreenKey;
  name: string;
  description: string;
}
export const SCREEN_LIST: Screen[] = [
  { key: 'single',            name: '单屏', description: '单块屏幕' },
  { key: 'double-horizontal', name: '水平双屏', description: '水平排列的两块屏幕' },
  { key: 'double-vertical',   name: '垂直双屏', description: '垂直排列的两块屏幕' },
  { key: 'triple-horizontal', name: '水平三屏', description: '水平排列的三块屏幕' },
  { key: 'triple-vertical',   name: '垂直三屏', description: '垂直排列的三块屏幕' },
  { key: 'quadruple',         name: '四屏', description: '田字形排列的四块屏幕' },
];
// --------------------------------------------------------------------------------
//# endregion
// ================================================================================


// ================================================================================
//# region ElectronMenu
// --------------------------------------------------------------------------------
export type ConfigSlotHeaderKey = 'key' | 'type' | 'name' | 'description' | 'value';
export interface ConfigSlotHeader {
  key: ConfigSlotHeaderKey;
  width: number;
  name: string;
}
export const CONFIG_SLOT_HEADER_LIST: ConfigSlotHeader[] = [
  { key: 'key',         width: 20, name: '字段键' },
  { key: 'type',        width: 20, name: '字段类型' },
  { key: 'name',        width: 20, name: '字段名称' },
  { key: 'description', width: 30, name: '字段描述' },
  { key: 'value',       width: 20, name: '字段值' },
];

export type ConfigKey = 'themeColor1' | 'themeColor2' | 'themeColor3' | 'themeColor4' | 'themeColor5' | 'themeColor6' | 'themeColor7' | 'themeColor8' | 'themeColor9' |
  'themeFont1' | 'themeFont2' | 'themeFont3'  | 'themeFont4' | 'watermarkImage';
export type ConfigValue = number | string | boolean | ArrayBuffer | null;

export interface ConfigSlot {
  key: ConfigKey;
  type: 'number' | 'string' | 'boolean' | 'color' | 'font' | 'image';
  name: string;
  description: string;
  defaultValue: ConfigValue;
}
export const CONFIG_SLOT_LIST: ConfigSlot[] = [
  { key: 'themeColor1',    type: 'color',  name: '主题颜色 1', description: '通常用于背景',                defaultValue: 'FFFFFFFF' },
  { key: 'themeColor2',    type: 'color',  name: '主题颜色 2', description: '通常用于图片背景',             defaultValue: 'FFFFFFFF' },
  { key: 'themeColor3',    type: 'color',  name: '主题颜色 3', description: '通常用于标题文字',             defaultValue: 'FF000000' },
  { key: 'themeColor4',    type: 'color',  name: '主题颜色 4', description: '通常用于描述文字',             defaultValue: 'FF000000' },
  { key: 'themeColor5',    type: 'color',  name: '主题颜色 5', description: '通常用于信息文字',             defaultValue: 'FF000000' },
  { key: 'themeColor6',    type: 'color',  name: '主题颜色 6', description: '通常用于前/后置标题文字',       defaultValue: 'FFFFFFFF' },
  { key: 'themeColor7',    type: 'color',  name: '主题颜色 7', description: '通常用于前/后置框',            defaultValue: 'FF000000' },
  { key: 'themeColor8',    type: 'color',  name: '主题颜色 8', description: '通常用于前/后置内容文字',       defaultValue: 'FF000000' },
  { key: 'themeColor9',    type: 'color',  name: '主题颜色 9', description: '保留字段',                   defaultValue: 'FF1D69B4' },
  { key: 'themeFont1',     type: 'font',   name: '主题字体 1', description: '通常用于标题文字',             defaultValue: '微软雅黑' },
  { key: 'themeFont2',     type: 'font',   name: '主题字体 2', description: '通常用于描述文字，可读性要强',    defaultValue: '微软雅黑' },
  { key: 'themeFont3',     type: 'font',   name: '主题字体 3', description: '通常用于信息文字，可读性要强',    defaultValue: '微软雅黑' },
  { key: 'themeFont4',     type: 'font',   name: '主题字体 4', description: '通常用于前/后置文字，可读性要强', defaultValue: '微软雅黑' },
  { key: 'watermarkImage', type: 'image',  name: '水印图片',   description: '水印的透明底图',               defaultValue: null },
];

export interface FullConfig {
  themeColor1: string;
  themeColor2: string;
  themeColor3: string;
  themeColor4: string;
  themeColor5: string;
  themeColor6: string;
  themeColor7: string;
  themeColor8: string;
  themeColor9: string;
  themeFont1: string;
  themeFont2: string;
  themeFont3: string;
  themeFont4: string;
  watermarkImage: HTMLImageElement  | null;
}
export type Config = Partial<Record<ConfigKey, ConfigValue>>;
// --------------------------------------------------------------------------------
export type DataKey = 'id' | 'name' | 'image' | 'watermark' | 'category' | 'price' | 'size' | 'description' | 'material' | 'manufacture' | 'producer' | 'author' | 'timestamp' | 'titleBefore' | 'textBefore' | 'titleAfter' | 'textAfter';
export type DataValue = number | string | boolean | ArrayBuffer | null;

export interface DataHeader {
  key: DataKey;
  optional: boolean;
  width: number;
  type: 'number' | 'string' | 'boolean' | 'image';
  name: string;
  description: string;
  defaultValue: DataValue;
}
const imageDescription = '制品展示图片，需要将图片插入 Excel 并且放在这个单元格内。'
export const DATA_HEADER_LIST: DataHeader[] = [
  { key: 'id',          optional: false, width: 10, type: 'number',  name: 'ID',     description: '数据 ID，是一个 Sheet 内唯一的数字', defaultValue: 1 },
  { key: 'name',        optional: false, width: 30, type: 'string',  name: '名称',    description: '制品名称',                        defaultValue: '空气' },
  { key: 'image',       optional: false, width: 10, type: 'image',   name: '图片',    description: imageDescription,                defaultValue: null },
  { key: 'watermark',   optional: false, width: 15, type: 'boolean', name: '水印',    description: '是否添加水印',                     defaultValue: false },
  { key: 'category',    optional: true,  width: 15, type: 'string',  name: '品类',    description: '制品分类',                        defaultValue: '亚克力色纸' },
  { key: 'price',       optional: true,  width: 10, type: 'number',  name: '价格',    description: '制品有料交换价格，<= 0 生成无料',     defaultValue: 0 },
  { key: 'description', optional: true,  width: 30, type: 'string',  name: '简介',    description: '制品简介',                        defaultValue: '用于测试的空气谷' },
  { key: 'size',        optional: true,  width: 20, type: 'string',  name: '规格',    description: '制品的长宽高',                     defaultValue: 'W140mm*H190mm*D2mm' },
  { key: 'material',    optional: true,  width: 20, type: 'string',  name: '材质',    description: '制品使用的材质',                   defaultValue: '纸 / 亚克力' },
  { key: 'manufacture', optional: true,  width: 20, type: 'string',  name: '工艺',    description: '制品使用的生产工艺',                defaultValue: '触感膜 / 流沙银包边' },
  { key: 'producer',    optional: true,  width: 20, type: 'string',  name: '制造设计', description: '制品制造、设计的发行方',             defaultValue: '空气社 Airworks' },
  { key: 'author',      optional: true,  width: 15, type: 'string',  name: '作者',    description: '制品作者',                        defaultValue: '作者名称' },
  { key: 'timestamp',   optional: true,  width: 15, type: 'string',  name: '定稿日期', description: '制品的定稿日期',                   defaultValue: '2024年4月31日' },
  { key: 'titleBefore', optional: true,  width: 15, type: 'string',  name: '前置标题', description: '在制品图片前展示的注意事项标题',       defaultValue: null },
  { key: 'textBefore',  optional: true,  width: 30, type: 'string',  name: '前置文字', description: '在制品图片前展示的注意事项文字',       defaultValue: null },
  { key: 'titleAfter',  optional: true,  width: 15, type: 'string',  name: '后置标题', description: '在制品图片后展示的注意事项标题',       defaultValue: null },
  { key: 'textAfter',   optional: true,  width: 30, type: 'string',  name: '后置文字', description: '在制品图片后展示的注意事项文字',       defaultValue: null },
];

export type Data = Partial<Record<DataKey, DataValue>>;
// --------------------------------------------------------------------------------
export interface ElectronMenuExcel {
  config: Config;
  data: Record<number, Data[]>;
}
// --------------------------------------------------------------------------------
const defaultConfig: Config = {};
for (const configSlot of CONFIG_SLOT_LIST) {
  defaultConfig[configSlot.key] = configSlot.defaultValue;
}
export const DEFAULT_ELECTRON_MENU_EXCEL: ElectronMenuExcel = { config: defaultConfig, data: {} };
const defaultData: Data = {};
for (const dataHeader of DATA_HEADER_LIST) {
  defaultData[dataHeader.key] = dataHeader.defaultValue;
}
export const EXAMPLE_ELECTRON_MENU_EXCEL: ElectronMenuExcel = { config: defaultConfig, data: { 7: [defaultData], 8: [defaultData], 9: [defaultData] } };
// --------------------------------------------------------------------------------
//# endregion
// ================================================================================
