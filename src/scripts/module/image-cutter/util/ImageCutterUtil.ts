// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import JSZip from 'jszip';
import XLSX from 'xlsx';
// --------------------------------------------------------------------------------
import { DEFAULT_SLICE, SplitCalcOption, SplitOutputOption } from 'src/scripts/module/image-cutter/interface/common';
// ================================================================================


// ================================================================================
//# region ImageCutterUtil
// --------------------------------------------------------------------------------
export class ImageCutterUtil {
  // ------------------------------------------------------------------------------
  // * Function
  // ------------------------------------------------------------------------------
  //# region ReadFile
  // ------------------------------------------------------------------------------
  public static async readBlob<T extends 'ArrayBuffer' | 'DataURL' | 'Text', R = T extends 'ArrayBuffer' ? ArrayBuffer : string>(blob: Blob, type: T): Promise<R | undefined> {
    return new Promise<R | undefined>((resolve) => {
      const reader = new FileReader()
      reader.onload = function(event){
        resolve(event.target?.result as R | undefined);
      }
      switch(type){
        case 'ArrayBuffer':
          reader.readAsArrayBuffer(blob);
          break;
        case 'DataURL':
          reader.readAsDataURL(blob);
          break;
        case 'Text':
          reader.readAsText(blob,'utf-8');
          break;
        default:
          resolve(undefined);
      }
    })
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region TransitionData
  // ------------------------------------------------------------------------------
  public static async arrayBufferToImage(buffer: ArrayBuffer): Promise<HTMLImageElement> {
    return this.imageSrcToImage(this.arrayBufferToImageSrc(buffer));
  };

  public static arrayBufferToImageSrc(buffer: ArrayBuffer): string {
    return URL.createObjectURL(new Blob([buffer]));
  };
  // ------------------------------------------------------------------------------
  public static async imageSrcToImage(dataURL: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve) => {
      const image = new Image();
      image.onload = function() {
        resolve(image);
      }
      image.src = dataURL;
    })
  };

  public static async canvasToBlob(canvas: HTMLCanvasElement, type: 'image/png' | 'image/jpeg' | 'image/gif' = 'image/png', quality: number = 0.92): Promise<Blob | null> {
    return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region Draw
  // ------------------------------------------------------------------------------
  public static clearCanvas(canvas: HTMLCanvasElement): void {
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d');

    if(ctx){
      ctx.clearRect(0, 0, width, height);
    }
  };

  public static fillImageToCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d');

    if(ctx){
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillRect(0, 0, width, height);
      const rate = Math.min(canvas.width / image.width, canvas.height / image.height);
      const realWidth = Math.round(image.width * rate);
      const realHeight = Math.round(image.height * rate);
      ctx.drawImage(image, 0, 0, image.width, image.height, (width - realWidth) / 2, (height - realHeight) / 2, realWidth, realHeight);
    }
  };

  public static fillSplitLineToCanvas(canvas: HTMLCanvasElement, option: SplitCalcOption): void {
    const ratio = option.ratio;
    const mode = option.mode;
    const slice = option.slice || DEFAULT_SLICE;

    const size = Math.max(canvas.width, canvas.height);
    const ctx = canvas.getContext('2d');
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = size;
    tempCanvas.height = size;
    const tempCtx = tempCanvas.getContext('2d');

    if(ctx && tempCtx){
      if(mode === 'cut'){
        const splitSize = size / 3 * ratio;
        const processSize = (size + splitSize) / slice;

        tempCtx.fillStyle = 'rgba(0, 0, 0, 1)';
        for(let i = 1; i < slice; i++){
          tempCtx.fillRect(i * processSize - splitSize, 0, splitSize, size);
        }
        for(let j = 1; j < slice; j++){
          tempCtx.fillRect(0, j * processSize - splitSize, size, splitSize);
        }
      } else if (mode === 'scale'){
        const splitSize = (size * ratio) / (3 + ratio);
        const processSize = size / slice;

        tempCtx.fillStyle = 'rgba(0, 0, 0, 1)';
        for(let i = 0; i <= slice; i++){
          tempCtx.fillRect(i * processSize - splitSize / 2, 0, splitSize, size);
        }
        for(let j = 0; j <= slice; j++){
          tempCtx.fillRect(0, j * processSize - splitSize / 2, size, splitSize);
        }
      }

      ctx.globalAlpha = 0.2;
      ctx.drawImage(tempCanvas, 0, 0);
      ctx.globalAlpha = 1;
    }
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region Output
  // ------------------------------------------------------------------------------
  public static async outputSplitImageDataRecord(image: HTMLImageElement, option: SplitOutputOption): Promise<Record<string, Blob>> {
    const ratio = option.ratio;
    const mode = option.mode;
    const slice = option.slice || DEFAULT_SLICE;
    const targetSize = option.targetSize || Math.max(image.width, image.height);

    const size = Math.max(image.width, image.height);
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = targetSize;
    tempCanvas.height = targetSize;
    const tempCtx = tempCanvas.getContext('2d');

    const output: Record<string, Blob> = {};

    this.fillImageToCanvas(canvas, image);
    if (ctx && tempCtx) {
      for (let i = 0; i < slice; i++) {
        for (let j = 0; j < slice; j++) {
          let x = 0, y = 0, cutSize = 0;

          if (mode === 'cut') {
            const splitSize = size / 3 * ratio;
            const processSize = (size + splitSize) / slice;
            cutSize = Math.floor(processSize - splitSize);

            x = j * processSize;
            y = i * processSize;
          } else if (mode === 'scale') {
            const splitSize = (size * ratio) / (3 + ratio);
            const processSize = size / slice;
            cutSize = Math.floor(processSize - splitSize);

            x = j * processSize + splitSize / 2;
            y = i * processSize + splitSize / 2;
          }

          tempCtx.clearRect(0, 0, targetSize, targetSize);
          tempCtx.drawImage(canvas, x, y, cutSize, cutSize, 0, 0, targetSize, targetSize);
          const blob = await this.canvasToBlob(tempCanvas);
          if (blob) {
            output[`${ i * slice + j + 1 }.png`] = blob;
          }
        }
      }
    }

    return output;
  };

  public static async outputSplitImageDataZip(image: HTMLImageElement, option: SplitOutputOption): Promise<Blob> {
    const zip = new JSZip();
    const fileRecord = await this.outputSplitImageDataRecord(image, option);
    for (const filename in fileRecord) {
      zip.file(filename, fileRecord[filename]);
    }
    return await zip.generateAsync({ type: 'blob' });
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region Calc
  // ------------------------------------------------------------------------------
  public static calcCutSize(image: HTMLImageElement, option: SplitCalcOption): number {
    const ratio = option.ratio;
    const mode = option.mode;
    const slice = option.slice || DEFAULT_SLICE;

    const size = Math.max(image.width, image.height);

    if(mode === 'cut'){
      const splitSize = size / 3 * ratio;
      const processSize = (size + splitSize) / slice;
      return Math.floor(processSize - splitSize);
    } else if (mode === 'scale'){
      const splitSize = (size * ratio) / (3 + ratio);
      const processSize = size / slice;
      return Math.floor(processSize - splitSize);
    }
    return -1;
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region Download
  // ------------------------------------------------------------------------------
  public static downloadBlob(filename: string, blob: Blob): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region XLSX
  // ------------------------------------------------------------------------------
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
export default ImageCutterUtil;
// ================================================================================
