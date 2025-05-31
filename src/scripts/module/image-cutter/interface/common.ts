// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------

// ================================================================================

// ================================================================================
//# region SplitImage
// --------------------------------------------------------------------------------
export const DEFAULT_SLICE: number = 3;
// --------------------------------------------------------------------------------
export type RatioKey = 'weibo' | 'bilibili' | 'qqspace' | 'input';
export interface Ratio {
  key: RatioKey;
  value: number;
  name: string;
}
export const RATIO_LIST: Ratio[] = [
  { key: 'weibo',    value: 0.028, name: '微博' },
  { key: 'bilibili', value: 0.046, name: 'B 站' },
  { key: 'qqspace',  value: 0.014, name: '空间' },
  { key: 'input',    value: 0,     name: '输入' },
];

const ratioRecord: Record<RatioKey, number> = {} as Record<RatioKey, number>;
for (const ratio of RATIO_LIST) {
  ratioRecord[ratio.key] = ratio.value;
}
export const RATIO_RECORD: Record<RatioKey, number> = ratioRecord;
// --------------------------------------------------------------------------------
export type ModeKey = 'cut' | 'scale';
export interface Mode {
  key: ModeKey;
  name: string;
  description: string;
}
export const MODE_LIST: Mode[] = [
  { key: 'cut',   name: '裁切模式', description: '直接按间距切出 9 块' },
  { key: 'scale', name: '缩扩模式', description: '先平均切成 9 块，再对每份按间距内切' },
];
// --------------------------------------------------------------------------------
export type OutputKey = 'original' | 'scale' | 'input';
export interface Output {
  key: OutputKey;
  name: string;
}
export const OUTPUT_LIST: Output[] = [
  { key: 'original', name: '原始像素' },
  { key: 'scale',    name: '填充切线' },
  { key: 'input',    name: '输入' },
];
// --------------------------------------------------------------------------------
export interface CalcBaseImageOption {
  ratio: number;
  mode: ModeKey;
  slice?: number;
}

export interface OutputBaseImageOption extends CalcBaseImageOption {
  targetSize?: number;
}
// --------------------------------------------------------------------------------
//# endregion
// ================================================================================

// ================================================================================
//# region LongImage
// --------------------------------------------------------------------------------
export type ConfigSlotHeaderKey = 'key' | 'type' | 'name' | 'description' | 'value';
export interface ConfigSlotHeader {
  width: number;
  name: string;
}
export const CONFIG_SLOT_HEADER_RECORD: Record<ConfigSlotHeaderKey, ConfigSlotHeader> = {
  key:         { width: 20, name: '字段键' },
  type:        { width: 20, name: '字段类型' },
  name:        { width: 20, name: '字段名称' },
  description: { width: 30, name: '字段描述' },
  value:       { width: 20, name: '字段值' },
};

export type ConfigSlotKey = 'themeColor1' | 'themeColor2' | 'themeColor3' | 'themeColor4' | 'themeColor5' | 'themeColor6' | 'themeColor7' | 'themeColor8' | 'themeColor9' | 'themeFont1' | 'themeFont2' | 'themeFont3'  | 'themeFont4' | 'noStorageText' | 'watermarkImage';
export type ConfigValue = number | string | boolean | ArrayBuffer | null;

export interface ConfigSlot {
  key: ConfigSlotKey;
  type: 'number' | 'string' | 'boolean' | 'color' | 'font' | 'image';
  name: string;
  description: string;
  defaultValue: ConfigValue;
  sampleValue: ConfigValue;
}

export const CONFIG_SLOT_RECORD: Record<ConfigSlotKey, ConfigSlot> = {
  themeColor1:    { key: 'themeColor1',    type: 'color',  name: '主题颜色 1', description: '通常用于背景',                 defaultValue: 'rgba(255, 255, 255, 1)',    sampleValue: 'FFFFFFFF' },
  themeColor2:    { key: 'themeColor2',    type: 'color',  name: '主题颜色 2', description: '通常用于图片背景',              defaultValue: 'rgba(255, 255, 255, 1)',    sampleValue: 'FFFFFFFF' },
  themeColor3:    { key: 'themeColor3',    type: 'color',  name: '主题颜色 3', description: '通常用于标题文字',              defaultValue: 'rgba(0, 0, 0, 1)',          sampleValue: 'FF000000' },
  themeColor4:    { key: 'themeColor4',    type: 'color',  name: '主题颜色 4', description: '通常用于描述文字',              defaultValue: 'rgba(0, 0, 0, 1)',          sampleValue: 'FF000000' },
  themeColor5:    { key: 'themeColor5',    type: 'color',  name: '主题颜色 5', description: '通常用于信息文字',              defaultValue: 'rgba(0, 0, 0, 1)',          sampleValue: 'FF000000' },
  themeColor6:    { key: 'themeColor6',    type: 'color',  name: '主题颜色 6', description: '通常用于前/后置标题文字',        defaultValue: 'rgba(255, 255, 255, 1)',    sampleValue: 'FFFFFFFF' },
  themeColor7:    { key: 'themeColor7',    type: 'color',  name: '主题颜色 7', description: '通常用于前/后置框',             defaultValue: 'rgba(0, 0, 0, 1)',          sampleValue: 'FF000000' },
  themeColor8:    { key: 'themeColor8',    type: 'color',  name: '主题颜色 8', description: '通常用于前/后置内容文字',        defaultValue: 'rgba(0, 0, 0, 1)',          sampleValue: 'FF000000' },
  themeColor9:    { key: 'themeColor9',    type: 'color',  name: '主题颜色 9', description: '保留字段',                    defaultValue: 'rgba(29, 105, 180, 1)',     sampleValue: 'FF1D69B4' },
  themeFont1:     { key: 'themeFont1',     type: 'font',   name: '主题字体 1', description: '通常用于标题文字',              defaultValue: '微软雅黑',                   sampleValue: '微软雅黑' },
  themeFont2:     { key: 'themeFont2',     type: 'font',   name: '主题字体 2', description: '通常用于描述文字，可读性要强',    defaultValue: '微软雅黑',                   sampleValue: '微软雅黑' },
  themeFont3:     { key: 'themeFont3',     type: 'font',   name: '主题字体 3', description: '通常用于信息文字，可读性要强',    defaultValue: '微软雅黑',                   sampleValue: '微软雅黑' },
  themeFont4:     { key: 'themeFont4',     type: 'font',   name: '主题字体 4', description: '通常用于前/后置文字，可读性要强', defaultValue: '微软雅黑',                   sampleValue: '微软雅黑' },
  noStorageText:  { key: 'noStorageText',  type: 'string', name: '无货文字',   description: '无货时的文字',                 defaultValue: '制品库存不足，请联系摊主补货。', sampleValue: '制品库存不足，请联系摊主补货。' },
  watermarkImage: { key: 'watermarkImage', type: 'image',  name: '水印图片',   description: '水印的透明底图',               defaultValue: null,                       sampleValue: 'null' },
};

export interface Config extends Record<ConfigSlotKey, ConfigValue> {
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
  watermarkImage: ArrayBuffer | null;

  watermarkImageSrc: string;
}
export type ConfigLine = Partial<Record<ConfigSlotKey, ConfigValue>>;
// --------------------------------------------------------------------------------
export type DataHeaderKey = 'id' | 'name' | 'image' | 'watermark' | 'category' | 'width' | 'displayDesc' | 'displayInfo' | 'displayHint' | 'group' | 'price' | 'unit' | 'currency' | 'description' | 'size' | 'material' | 'manufacture' | 'producer' | 'author' | 'timestamp' | 'storage' | 'titleBefore' | 'textBefore' | 'titleAfter' | 'textAfter';
export type DataValue = number | string | boolean | ArrayBuffer | null;

export interface DataHeader {
  optional: boolean;
  width: number;
  type: 'number' | 'string' | 'boolean' | 'image';
  name: string;
  description: string;
  defaultValue: DataValue;
  sampleValue: DataValue;
}

export const DATA_HEADER_RECORD: Record<DataHeaderKey, DataHeader> = {
  id:          { optional: false, width: 10, type: 'string',  name: 'ID',     description: '数据 ID，是一个 Sheet 内唯一的标识',                   defaultValue: '',        sampleValue: '1' },
  name:        { optional: false, width: 30, type: 'string',  name: '名称',    description: '制品名称',                                          defaultValue: '',        sampleValue: '空气' },
  image:       { optional: false, width: 10, type: 'image',   name: '图片',    description: '制品展示图片，需要将图片插入 Excel 并且放在这个单元格内。', defaultValue: null,      sampleValue: null },
  watermark:   { optional: false, width: 15, type: 'boolean', name: '水印',    description: '是否添加水印',                                       defaultValue: false,     sampleValue: false },
  category:    { optional: false, width: 15, type: 'string',  name: '分类',    description: '制品分类',                                          defaultValue: '',        sampleValue: '亚克力色纸' },
  width:       { optional: false, width: 10, type: 'number',  name: '宽度',    description: '分组宽度',                                          defaultValue: 1,         sampleValue: 1 },
  displayDesc: { optional: false, width: 15, type: 'boolean', name: '显示描述', description: '是否显示描述',                                       defaultValue: true,      sampleValue: true },
  displayInfo: { optional: false, width: 15, type: 'boolean', name: '显示详情', description: '是否显示详情',                                       defaultValue: true,      sampleValue: true },
  displayHint: { optional: false, width: 15, type: 'boolean', name: '显示提示', description: '是否显示提示',                                       defaultValue: true,      sampleValue: true },
  group:       { optional: true,  width: 10, type: 'string',  name: '分组',    description: '展示分组',                                          defaultValue: 'default', sampleValue: 'default' },
  price:       { optional: true,  width: 10, type: 'number',  name: '价格',    description: '制品有料交换价格，< 0 不显示，0 显示为无料',             defaultValue: -1,        sampleValue: 0 },
  unit:        { optional: true,  width: 10, type: 'string',  name: '制品单位', description: '制品的单位',                                        defaultValue: '个',      sampleValue: '个' },
  currency:    { optional: true,  width: 15, type: 'string',  name: '货币单位', description: '价格的货币单位',                                     defaultValue: 'CNY',     sampleValue: 'CNY' },
  description: { optional: true,  width: 30, type: 'string',  name: '简介',    description: '制品简介',                                          defaultValue: '',        sampleValue: '用于测试的空气谷' },
  size:        { optional: true,  width: 20, type: 'string',  name: '规格',    description: '制品的长宽高',                                       defaultValue: '',        sampleValue: 'W140mm*H190mm*D2mm' },
  material:    { optional: true,  width: 20, type: 'string',  name: '材质',    description: '制品使用的材质',                                     defaultValue: '',        sampleValue: '纸 / 亚克力' },
  manufacture: { optional: true,  width: 20, type: 'string',  name: '工艺',    description: '制品使用的生产工艺',                                  defaultValue: '',        sampleValue: '触感膜 / 流沙银包边' },
  producer:    { optional: true,  width: 20, type: 'string',  name: '制造设计', description: '制品制造、设计的发行方',                               defaultValue: '',        sampleValue: '空气社 Airworks' },
  author:      { optional: true,  width: 15, type: 'string',  name: '作者',    description: '制品作者',                                          defaultValue: '',        sampleValue: '作者名称' },
  timestamp:   { optional: true,  width: 15, type: 'string',  name: '定稿日期', description: '制品的定稿日期',                                     defaultValue: '',        sampleValue: '2024年4月31日' },
  storage:     { optional: true,  width: 15, type: 'number',  name: '库存',    description: '库存数量',                                          defaultValue: 0,         sampleValue: 0 },
  titleBefore: { optional: true,  width: 15, type: 'string',  name: '前置标题', description: '在制品图片前展示的注意事项标题',                        defaultValue: '',        sampleValue: null },
  textBefore:  { optional: true,  width: 30, type: 'string',  name: '前置文字', description: '在制品图片前展示的注意事项文字',                        defaultValue: '',        sampleValue: null },
  titleAfter:  { optional: true,  width: 15, type: 'string',  name: '后置标题', description: '在制品图片后展示的注意事项标题',                        defaultValue: '',        sampleValue: null },
  textAfter:   { optional: true,  width: 30, type: 'string',  name: '后置文字', description: '在制品图片后展示的注意事项文字',                        defaultValue: '',        sampleValue: null },
};

export interface Data extends Record<DataHeaderKey, DataValue> {
  id: string;
  name: string;
  image: ArrayBuffer | null;
  watermark: boolean;
  category: string;
  width: number;
  displayDesc: boolean;
  displayInfo: boolean;
  displayHint: boolean;
  group: string;
  price: number;
  unit: string;
  currency: string;
  description: string;
  size: string;
  material: string;
  manufacture: string;
  producer: string;
  author: string;
  timestamp: string;
  storage: number;
  titleBefore: string;
  textBefore: string;
  titleAfter: string;
  textAfter: string;

  imageSrc: string;
}

export type DataLine = Partial<Record<DataHeaderKey, DataValue>>;
// --------------------------------------------------------------------------------
export interface LongImageExcel {
  config: Config;
  data: Record<number, Data[]>;
}
// --------------------------------------------------------------------------------
//# endregion
// ================================================================================
