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
export const CONFIG_SLOT_HEADER_RECORD: Record<ConfigSlotHeaderKey, ConfigSlotHeader> = ImageDataCommon.CONFIG_SLOT_HEADER_RECORD;

export type ConfigSlotKey = ImageDataCommon.ConfigSlotKey;
export type ConfigValue = ImageDataCommon.ConfigValue;

export type ConfigSlot = ImageDataCommon.ConfigSlot;
export const CONFIG_SLOT_RECORD: Record<ConfigSlotKey, ConfigSlot> = ImageDataCommon.CONFIG_SLOT_RECORD;

export type Config = ImageDataCommon.Config;
export type ConfigLine = ImageDataCommon.ConfigLine;
// --------------------------------------------------------------------------------
export type GroupHeaderKey = 'id' | 'name' | 'category' | 'width' | 'displayInfo' | 'displayHint' | 'price' | 'unit' | 'currency' | 'description' | 'size' | 'material' | 'manufacture' | 'producer' | 'author' | 'timestamp' | 'titleBefore' | 'textBefore' | 'titleAfter' | 'textAfter';
export type GroupValue = number | string | boolean | null;

export interface GroupHeader {
  optional: boolean;
  width: number;
  type: 'number' | 'string' | 'boolean';
  name: string;
  description: string;
  defaultValue: GroupValue;
  sampleValue: GroupValue;
}

export const GROUP_HEADER_RECORD: Record<GroupHeaderKey, GroupHeader> = {
  id:          ImageDataCommon.DATA_HEADER_RECORD.id as GroupHeader,
  name:        ImageDataCommon.DATA_HEADER_RECORD.name as GroupHeader,
  category:    ImageDataCommon.DATA_HEADER_RECORD.category as GroupHeader,
  width:       { optional: false, width: 10, type: 'number',  name: '宽度',    description: '分组宽度',                                          defaultValue: 1,         sampleValue: 2 },
  displayInfo: { optional: false, width: 15, type: 'boolean', name: '显示信息', description: '分组内是否显示信息',                                  defaultValue: false,     sampleValue: false },
  displayHint: { optional: false, width: 15, type: 'boolean', name: '显示提示', description: '分组内是否显示提示',                                  defaultValue: false,     sampleValue: false },
  price:       ImageDataCommon.DATA_HEADER_RECORD.price as GroupHeader,
  unit:        ImageDataCommon.DATA_HEADER_RECORD.unit as GroupHeader,
  currency:    ImageDataCommon.DATA_HEADER_RECORD.currency as GroupHeader,
  description: ImageDataCommon.DATA_HEADER_RECORD.description as GroupHeader,
  size:        ImageDataCommon.DATA_HEADER_RECORD.size as GroupHeader,
  material:    ImageDataCommon.DATA_HEADER_RECORD.material as GroupHeader,
  manufacture: ImageDataCommon.DATA_HEADER_RECORD.manufacture as GroupHeader,
  producer:    ImageDataCommon.DATA_HEADER_RECORD.producer as GroupHeader,
  author:      ImageDataCommon.DATA_HEADER_RECORD.author as GroupHeader,
  timestamp:   ImageDataCommon.DATA_HEADER_RECORD.timestamp as GroupHeader,
  titleBefore: ImageDataCommon.DATA_HEADER_RECORD.titleBefore as GroupHeader,
  textBefore:  ImageDataCommon.DATA_HEADER_RECORD.textBefore as GroupHeader,
  titleAfter:  ImageDataCommon.DATA_HEADER_RECORD.titleAfter as GroupHeader,
  textAfter:   ImageDataCommon.DATA_HEADER_RECORD.textAfter as GroupHeader,
};

export interface Group extends Record<GroupHeaderKey, GroupValue> {
  id: string;
  name: string;
  category: string;
  width: number;
  displayInfo: boolean;
  displayHint: boolean;
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
  titleBefore: string;
  textBefore: string;
  titleAfter: string;
  textAfter: string;
}

export type GroupLine = Partial<Record<GroupHeaderKey, GroupValue>>;
// --------------------------------------------------------------------------------
export type DataHeaderKey = ImageDataCommon.DataHeaderKey;
export type DataValue = ImageDataCommon.DataValue;

export type DataHeader = ImageDataCommon.DataHeader;
export const DATA_HEADER_RECORD: Record<DataHeaderKey, DataHeader> = ImageDataCommon.DATA_HEADER_RECORD;

export type Data = ImageDataCommon.Data;
export type DataLine = ImageDataCommon.DataLine;
// --------------------------------------------------------------------------------
export interface ElectronMenuExcel {
  config: Config;
  group: Group[];
  data: Data[];
}
// --------------------------------------------------------------------------------
//# endregion
// ================================================================================
