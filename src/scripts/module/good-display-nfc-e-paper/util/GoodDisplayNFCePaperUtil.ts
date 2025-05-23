// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import { Color } from 'src/scripts/common/graphics';
import {
  E_PAPER_ALGORITHM_COLOR_SET, E_PAPER_DISPLAY_DATA_SET,
  EPaperAlgorithm, EPaperDisplayType
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
        return this._applyDithering(imageData, colorSet, this._applyErrorDiffusionDithering.bind(this));
      case EPaperAlgorithm.BlueNoise:
        return this._applyDithering(imageData, colorSet, this._applyBlueNoiseDithering.bind(this));
      case EPaperAlgorithm.FloydSteinberg:
        return this._applyDithering(imageData, colorSet, this._applyFloydSteinbergDithering.bind(this));
      case EPaperAlgorithm.Atkinson:
        return this._applyDithering(imageData, colorSet, this._applyAtkinsonDithering.bind(this));
      default:
        return this._applyDithering(imageData, colorSet, this._applyErrorDiffusionDithering.bind(this));
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
        const weight = errorWeight[_y + 1][_x + 1];
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
  //# region Alpha
  // ------------------------------------------------------------------------------
  public static removeAlpha(imageData: ImageData){
    const dataArray = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        dataArray[index + 3] = 255;
      }
    }
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region DataToHex
  // ------------------------------------------------------------------------------
  private static _numberToHex(input: number){
    const output = input.toString(16);
    return output.length === 1 ? `0${ output }` : output;
  }

  private static _numberToString(input: number){
    const output = input.toString();
    return `000${ output }`.substring(`000${ output }`.length - 4);
  }

  private static _colorToNumber4G(r: number, g: number, b: number){
    if (r <= 100 && g <= 100 && b <= 100) {
      return 0;
    } else if (r >= 200 && g >= 200 && b >= 200) {
      return 1;
    } else {
      if ((r + g + b) / 3 <= 127) {
        return 3;
      } else {
        return 2;
      }
    }
  }

  public static imageDataToHexStringArray(imageData: ImageData, E_PAPER_DISPLAY_TYPE: EPaperDisplayType){
    const ePaperDisplayData = E_PAPER_DISPLAY_DATA_SET[E_PAPER_DISPLAY_TYPE];

    const dataArray: string[] = [];
    let refreshCmd: string = '';
    switch (ePaperDisplayData.color){
      case 4:{
        const imageBuffer: string[] = [];
        for (let x = imageData.width - 1; x > 0; x--) {
          for (let y = 0; y < imageData.height / 4; y++) {
            let temp = 0;
            for (let k = 0; k < 4; k++) {
              const index = ((y * 4 + k) * imageData.width + x) * 4;
              const r = imageData.data[index];
              const g = imageData.data[index + 1];
              const b = imageData.data[index + 2];
              temp = temp * 4 + this._colorToNumber4G(r, g, b);
            }
            imageBuffer.push(this._numberToString(temp));
          }
        }
        for(let i = 0; i < Math.ceil(imageBuffer.length / 250); i++){
          const length = Math.min(250, imageBuffer.length - 250 * i);
          let data = `F0D200${ this._numberToHex(i) }${ this._numberToHex(length) }=`;
          for (let j = 0; j < length; j++) {
            data += imageBuffer[250 * i + j];
          }
          dataArray.push(data);
        }
        refreshCmd = 'F0D4858000';
        break;
      }
      default:
        refreshCmd = 'F0D4058000';
        break;
    }

    return [
      'F0DB020000',
      ePaperDisplayData.driver,
      ePaperDisplayData.cutScreen,
      ...dataArray,
      refreshCmd,
    ]
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
