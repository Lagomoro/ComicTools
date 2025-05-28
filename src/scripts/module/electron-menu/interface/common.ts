// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import * as ImageDataCommon from '../../image-cutter/interface/common';
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
export type ConfigSlotHeaderKey = ImageDataCommon.ConfigSlotHeaderKey;
export type ConfigSlotHeader = ImageDataCommon.ConfigSlotHeader;
export const CONFIG_SLOT_HEADER_LIST: ConfigSlotHeader[] = ImageDataCommon.CONFIG_SLOT_HEADER_LIST;

export type ConfigKey = ImageDataCommon.ConfigKey;
export type ConfigValue = ImageDataCommon.ConfigValue;

export type ConfigSlot = ImageDataCommon.ConfigSlot;
export const CONFIG_SLOT_LIST: ConfigSlot[] = ImageDataCommon.CONFIG_SLOT_LIST;

export type FullConfig = ImageDataCommon.FullConfig;
export type Config = ImageDataCommon.Config;
// --------------------------------------------------------------------------------
export type GroupKey = 'id' | 'name' | 'category' | 'width' | 'price' | 'unit' | 'currency' | 'description' | 'size' | 'material' | 'manufacture' | 'producer' | 'author' | 'timestamp' | 'titleBefore' | 'textBefore' | 'titleAfter' | 'textAfter';
export type GroupValue = number | string | boolean | null;

export interface GroupHeader {
  key: GroupKey;
  optional: boolean;
  width: number;
  type: 'number' | 'string' | 'boolean';
  name: string;
  description: string;
  defaultValue: GroupValue;
}
export const GROUP_HEADER_LIST: GroupHeader[] = [
  { key: 'id',          optional: false, width: 10, type: 'number',  name: 'ID',     description: '数据 ID，是一个 Sheet 内唯一的数字', defaultValue: 1 },
  { key: 'name',        optional: false, width: 30, type: 'string',  name: '名称',    description: '分组名称',                        defaultValue: '空气' },
  { key: 'category',    optional: false, width: 15, type: 'string',  name: '分类',    description: '分组分类',                        defaultValue: '亚克力色纸' },
  { key: 'width',       optional: false, width: 10, type: 'number',  name: '宽度',    description: '分组宽度',                        defaultValue: 2 },
  { key: 'price',       optional: true,  width: 10, type: 'number',  name: '价格',    description: '制品有料交换价格，<= 0 生成无料',     defaultValue: 0 },
  { key: 'unit',        optional: true,  width: 10, type: 'string',  name: '制品单位', description: '制品的单位',                      defaultValue: '个' },
  { key: 'currency',    optional: true,  width: 15, type: 'string',  name: '货币单位', description: '价格的货币单位',                   defaultValue: 'CNY' },
  { key: 'description', optional: true,  width: 30, type: 'string',  name: '简介',    description: '制品简介',                        defaultValue: '用于测试的空气谷' },
  { key: 'size',        optional: true,  width: 20, type: 'string',  name: '规格',    description: '制品的长宽高',                     defaultValue: 'W140mm*H190mm*D2mm' },
  { key: 'material',    optional: true,  width: 20, type: 'string',  name: '材质',    description: '制品使用的材质',                   defaultValue: '纸 / 亚克力' },
  { key: 'manufacture', optional: true,  width: 20, type: 'string',  name: '工艺',    description: '制品使用的生产工艺',                defaultValue: '触感膜 / 流沙银包边' },
  { key: 'producer',    optional: true,  width: 20, type: 'string',  name: '制造设计', description: '制品制造、设计的发行方',             defaultValue: '空气社 Airworks' },
  { key: 'author',      optional: true,  width: 15, type: 'string',  name: '作者',    description: '制品作者',                        defaultValue: '作者名称' },
  { key: 'timestamp',   optional: true,  width: 15, type: 'string',  name: '定稿日期', description: '制品的定稿日期',                   defaultValue: '2024年4月31日' },
  { key: 'titleBefore', optional: true,  width: 15, type: 'string',  name: '前置标题', description: '在制品图片前展示的注意事项标题',      defaultValue: null },
  { key: 'textBefore',  optional: true,  width: 30, type: 'string',  name: '前置文字', description: '在制品图片前展示的注意事项文字',      defaultValue: null },
  { key: 'titleAfter',  optional: true,  width: 15, type: 'string',  name: '后置标题', description: '在制品图片后展示的注意事项标题',      defaultValue: null },
  { key: 'textAfter',   optional: true,  width: 30, type: 'string',  name: '后置文字', description: '在制品图片后展示的注意事项文字',      defaultValue: null },
];

export type Group = Partial<Record<GroupKey, GroupValue>>;
// --------------------------------------------------------------------------------
export type DataKey = ImageDataCommon.DataKey;
export type DataValue = ImageDataCommon.DataValue;

export type DataHeader = ImageDataCommon.DataHeader;
export const DATA_HEADER_LIST: DataHeader[] = ImageDataCommon.DATA_HEADER_LIST;

export type Data = ImageDataCommon.Data;
// --------------------------------------------------------------------------------
export interface ElectronMenuExcel {
  config: Config;
  group: Group[];
  data: Data[];
}
// --------------------------------------------------------------------------------
const defaultConfig: Config = {};
for (const configSlot of CONFIG_SLOT_LIST) {
  defaultConfig[configSlot.key] = configSlot.defaultValue;
}
export const DEFAULT_ELECTRON_MENU_EXCEL: ElectronMenuExcel = { config: defaultConfig, group: [], data: [] };

const defaultGroup: Group = {};
for (const dataHeader of GROUP_HEADER_LIST) {
  defaultGroup[dataHeader.key] = dataHeader.defaultValue;
}
const defaultData: Data = {};
for (const dataHeader of DATA_HEADER_LIST) {
  defaultData[dataHeader.key] = dataHeader.defaultValue;
}
export const EXAMPLE_ELECTRON_MENU_EXCEL: ElectronMenuExcel = { config: defaultConfig, group: [defaultGroup], data: [defaultData] };
// --------------------------------------------------------------------------------
//# endregion
// ================================================================================
