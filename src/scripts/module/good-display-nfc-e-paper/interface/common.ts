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
