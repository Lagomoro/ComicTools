// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import { Color } from 'src/scripts/common/graphics';
import {
  E_PAPER_ALGORITHM_COLOR_SET,
  EPaperAlgorithm
} from 'src/scripts/module/good-display-nfc-e-paper/interface/common';
// ================================================================================

// ================================================================================
//# region GoodDisplayNFCePaperUtil
// --------------------------------------------------------------------------------
export class GoodDisplayNFCePaperUtil {
  // ------------------------------------------------------------------------------
  // * Function
  // ------------------------------------------------------------------------------
  //# region Dithering
  // ------------------------------------------------------------------------------
  private static _getNearestColor(colorSet: Color[], source: Color): Color {
    const output = new Color(0, 0, 0);
    output.setColor(colorSet[0]);

    for(const color of colorSet){
      if(color.distanceColor(source) < output.distanceColor(source)){
        output.setColor(color);
      }
    }

    return output;
  };

  private static _getColorFromDataArray(dataArray: Uint8ClampedArray, index: number): Color {
    return new Color(dataArray[index], dataArray[index + 1], dataArray[index + 2]);
  };

  private static _setColorToDataArray(dataArray: Uint8ClampedArray, index: number, color: Color): void {
    dataArray[index] = color.r;
    dataArray[index + 1] = color.g;
    dataArray[index + 2] = color.b;
  };
  // ------------------------------------------------------------------------------
  public static applyDithering(imageData: ImageData, algorithm: EPaperAlgorithm): ImageData {
    const colorSet: Color[] = E_PAPER_ALGORITHM_COLOR_SET[algorithm];

    switch (algorithm) {
      case EPaperAlgorithm.BlackWhite:
      case EPaperAlgorithm.ThreeColors:
      case EPaperAlgorithm.FourColors:
      case EPaperAlgorithm.SixColors:
      case EPaperAlgorithm.FourGrey:
      case EPaperAlgorithm.SixteenGrey:
        return this._applyDithering(imageData, colorSet, this._applyErrorDiffusionDithering);
      case EPaperAlgorithm.BlueNoise:
        return this._applyDithering(imageData, colorSet, this._applyBlueNoiseDithering);
      case EPaperAlgorithm.FloydSteinberg:
        return this._applyDithering(imageData, colorSet, this._applyFloydSteinbergDithering);
      case EPaperAlgorithm.Atkinson:
        return this._applyDithering(imageData, colorSet, this._applyAtkinsonDithering);
      default:
        return this._applyDithering(imageData, colorSet, this._applyErrorDiffusionDithering);
    }
  };

  private static _applyDithering(imageData: ImageData, colorSet: Color[], ditheringCallback: (source: ImageData, target: ImageData, colorSet: Color[]) => void): ImageData {
    const target = new ImageData(Uint8ClampedArray.from(Array.from(imageData.data)), imageData.width, imageData.height, { colorSpace: imageData.colorSpace });
    ditheringCallback(imageData, target, colorSet);
    return target;
  };
  // ------------------------------------------------------------------------------
  private static _applyErrorDiffusionDithering(source: ImageData, target: ImageData, colorSet: Color[]): void {
    this._applyFloydSteinbergDithering(source, target, colorSet);
  };
  // ------------------------------------------------------------------------------
  private static _applyBlueNoiseDithering(source: ImageData, target: ImageData): void {
    const dataArray = target.data;
    const width = source.width;
    const height = source.height;
    const noise = this._generateBlueNoise(width, height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const newColor = this._getColorFromDataArray(dataArray, index).toGreyStyleColor();
        newColor.setRGB(newColor.r + noise[y][x] > 255 ? 255 : 0, newColor.g + noise[y][x] > 255 ? 255 : 0, newColor.b + noise[y][x] > 255 ? 255 : 0);
        this._setColorToDataArray(dataArray, index, newColor);
      }
    }
  };

  private static _generateBlueNoise(width: number, height: number): number[][] {
    const noise: number[][] = [];
    for (let y = 0; y < height; y++) {
      noise[y] = [];
      for (let x = 0; x < width; x++) {
        noise[y][x] = Math.random() * 255;
      }
    }
    return noise;
  };
  // ------------------------------------------------------------------------------
  private static _applyFloydSteinbergDithering(source: ImageData, target: ImageData, colorSet: Color[]): void {
    const dataArray = target.data;
    const width = source.width;
    const height = source.height;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const oldColor = this._getColorFromDataArray(dataArray, index);
        const newColor = this._getNearestColor(colorSet, oldColor);
        this._setColorToDataArray(dataArray, index, newColor);
        this._distributeError(dataArray, width, height, x, y, oldColor.minusColorNew(newColor), [[0, 0, 0], [0, 0, 7 / 16], [3 / 16, 5 / 16, 1 / 16]]);
      }
    }
  };

  private static _distributeError(dataArray: Uint8ClampedArray, width: number, height: number, x: number, y: number, errorColor: Color, errorWeight: number[][]) {
    for (let _y = y <= 0 ? 0 : -1; _y <= 1 && y + _y < height; y++) {
      for (let _x = x <= 0 ? 0 : -1; _x <= 1 && x + _x < width; x++) {
        const targetX = x + _x;
        const targetY = y + _y;
        const weight = errorWeight[_y][_x];
        const index = (targetY * width + targetX) * 4;
        this._applyErrorToDataArray(dataArray, index, errorColor, weight);
      }
    }
  };

  private static _applyErrorToDataArray(dataArray: Uint8ClampedArray, index: number, color: Color, weight: number) {
    dataArray[index] = Math.max(0, Math.min(dataArray[index] + color.r * weight, 255));
    dataArray[index + 1] = Math.max(0, Math.min(dataArray[index + 1] + color.g * weight, 255));
    dataArray[index + 2] = Math.max(0, Math.min(dataArray[index + 2] + color.b * weight, 255));
  };
  // ------------------------------------------------------------------------------
  private static _applyAtkinsonDithering(source: ImageData, target: ImageData, colorSet: Color[]): void {
    const dataArray = target.data;
    const width = source.width;
    const height = source.height;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const oldColor = this._getColorFromDataArray(dataArray, index);
        const newColor = this._getNearestColor(colorSet, oldColor);
        this._setColorToDataArray(dataArray, index, newColor);
        this._distributeError(dataArray, width, height, x, y, oldColor.minusColorNew(newColor), [[1 / 8, 1 / 8, 1 / 8], [1 / 8, 0, 1 / 8], [1 / 8, 1 / 8, 1 / 8]]);
      }
    }
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
export default GoodDisplayNFCePaperUtil;
// ================================================================================
