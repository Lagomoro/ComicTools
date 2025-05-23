// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import { Color } from 'src/scripts/common/graphics';
// ================================================================================

// ================================================================================
//# region SplitImage
// --------------------------------------------------------------------------------
export enum EPaperAlgorithm {
  BlackWhite,
  ThreeColors,
  FourColors,
  SixColors,
  FourGrey,
  SixteenGrey,
  BlueNoise,
  FloydSteinberg,
  Atkinson,
}

export const E_PAPER_ALGORITHM_OPTION: { label: string; value: EPaperAlgorithm }[] = [
  { label: '黑白单色',                 value: EPaperAlgorithm.BlackWhite },
  { label: '黑白红三色',                value: EPaperAlgorithm.ThreeColors },
  { label: '黑白红黄四色',              value: EPaperAlgorithm.FourColors },
  { label: 'E6 彩色',                  value: EPaperAlgorithm.SixColors },
  { label: '4 级灰度单色',              value: EPaperAlgorithm.FourGrey },
  { label: '16 级灰度单色',             value: EPaperAlgorithm.SixteenGrey },
  { label: '蓝噪抖动单色',              value: EPaperAlgorithm.BlueNoise },
  { label: 'Floyd-Steinberg 抖动单色', value: EPaperAlgorithm.FloydSteinberg },
  { label: 'Atkinson 抖动单色',        value: EPaperAlgorithm.Atkinson },
];

export const E_PAPER_ALGORITHM_COLOR_SET: Record<EPaperAlgorithm, Color[]> = {
  [EPaperAlgorithm.BlackWhite]:     [new Color(0, 0, 0), new Color(255, 255, 255)],
  [EPaperAlgorithm.ThreeColors]:    [new Color(0, 0, 0), new Color(255, 255, 255), new Color(255, 0, 0)],
  [EPaperAlgorithm.FourColors]:     [new Color(0, 0, 0), new Color(255, 255, 255), new Color(255, 0, 0), new Color(255, 255, 0)],
  [EPaperAlgorithm.SixColors]:      [new Color(0, 0, 0), new Color(255, 255, 255), new Color(255, 0, 0), new Color(255, 255, 0), new Color(0, 255, 0), new Color(0, 0, 255)],
  [EPaperAlgorithm.FourGrey]:       [0, 85, 170, 255].map(p => new Color(p, p, p)),
  [EPaperAlgorithm.SixteenGrey]:    [0, 17, 34, 51, 68, 85, 102, 119, 136, 153, 170, 187, 204, 221, 238, 255].map(p => new Color(p, p, p)),
  [EPaperAlgorithm.BlueNoise]:      [new Color(0, 0, 0), new Color(255, 255, 255)],
  [EPaperAlgorithm.FloydSteinberg]: [new Color(0, 0, 0), new Color(255, 255, 255)],
  [EPaperAlgorithm.Atkinson]:       [new Color(0, 0, 0), new Color(255, 255, 255)],
};
// --------------------------------------------------------------------------------
//# endregion
// ================================================================================

// ================================================================================
//# region EPaperDisplayData
// --------------------------------------------------------------------------------
export enum EPaperDisplayType {
  GDEY029F51H,
}
// --------------------------------------------------------------------------------
export interface EPaperDisplayData {
  width: number;
  height: number;
  color: number;
  inch: number;
  driver: string;
  cutScreen: string;
}
// --------------------------------------------------------------------------------
export const E_PAPER_DISPLAY_OPTION: { label: string; value: EPaperDisplayType }[] = [
  { label: 'GDEY029F51H', value: EPaperDisplayType.GDEY029F51H },
];
// --------------------------------------------------------------------------------
const DRIVER_GDEY029F51H = [
  'F0DB00007A',
  'A006012001500180',
  'A40108' + 'A5020028' + 'A4010C' + 'A5020028' + 'A40103',
  'A1024D78',
  'A103000F29',
  'A103010700',
  'A10403105444',
  'A1080605003F0A25121A',
  'A1025037',
  'A103600202',
  'A1056100A80180',
  'A102E71C',
  'A102E322',
  'A102B4D0',
  'A102B503',
  'A102E901',
  'A1023008',
  'A10104' + 'A40103',
  'A30110',
  'A2021200' + 'A40103',
  'A2020200' + 'A40103' + 'A20207A5',
];

export const E_PAPER_DISPLAY_DATA_SET: Record<EPaperDisplayType, EPaperDisplayData> = {
  [EPaperDisplayType.GDEY029F51H]: { width: 384, height: 168, color: 4, inch: 291, driver: DRIVER_GDEY029F51H.join(''), cutScreen: 'F0DA000003F00120' },
};
// --------------------------------------------------------------------------------
//# endregion
// ================================================================================
