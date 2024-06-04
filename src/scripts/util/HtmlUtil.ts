// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------

// ================================================================================

// ================================================================================
//# region HtmlUtil - Depend
// --------------------------------------------------------------------------------
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}
// --------------------------------------------------------------------------------
//# region HtmlUtil
// --------------------------------------------------------------------------------
export class HtmlUtil {
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
  //# region DataTransition
  // ------------------------------------------------------------------------------
  public static async blobToImage(blob: Blob): Promise<HTMLImageElement | null> {
    const arrayBuffer = await this.readBlob(blob, 'ArrayBuffer');
    return arrayBuffer ? await this.imageSrcToImage(this.arrayBufferToImageSrc(arrayBuffer)) : null;
  };

  public static async arrayBufferToImage(buffer: ArrayBuffer): Promise<HTMLImageElement> {
    return await this.imageSrcToImage(this.arrayBufferToImageSrc(buffer));
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
  // ------------------------------------------------------------------------------
  public static async canvasToBlob(canvas: HTMLCanvasElement, type: 'image/png' | 'image/jpeg' | 'image/gif' = 'image/png', quality: number = 0.92): Promise<Blob | null> {
    return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region Canvas
  // ------------------------------------------------------------------------------
  public static clearCanvas(canvas: HTMLCanvasElement): void {
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d');

    if(ctx){
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      ctx.restore();
    }
  };

  public static fillImageToCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d');

    if(ctx){
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillRect(0, 0, width, height);
      const rate = Math.min(canvas.width / image.width, canvas.height / image.height);
      const realWidth = Math.round(image.width * rate);
      const realHeight = Math.round(image.height * rate);
      ctx.drawImage(image, 0, 0, image.width, image.height, (width - realWidth) / 2, (height - realHeight) / 2, realWidth, realHeight);
      ctx.restore();
    }
  };
  // ------------------------------------------------------------------------------
  public static repeatImageToCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement, x: number, y: number, width: number, height: number): void {
    const ctx = canvas.getContext('2d');

    if(ctx){
      ctx.save();
      for(let i = 0; i < height; i += image.height){
        for(let j = 0; j < width; j += image.width){
          const w = j + image.width > width ? width - j : image.width;
          const h = i + image.height > height ? height - i : image.height;
          ctx.drawImage(image, 0, 0, w, h, x + j, y + i, w, h);
        }
      }
      ctx.restore();
    }
  };
  // ------------------------------------------------------------------------------
  public static appendToCanvas(target: HTMLCanvasElement, source: HTMLCanvasElement): void {
    const width = target.width;
    const height = target.height;
    const drawY = target.height;
    const drawHeight = source.height * (target.width / source.width);
    const ctx = target.getContext('2d');

    if(ctx){
      ctx.save();
      const imageData = ctx.getImageData(0, 0, width, height);
      target.height += drawHeight;
      ctx.putImageData(imageData, 0, 0);
      ctx.drawImage(source, 0, 0, source.width, source.height, 0, drawY, width, drawHeight);
      ctx.restore();
    }
  };
  // ------------------------------------------------------------------------------
  public static drawText(canvas: HTMLCanvasElement, text: string, x: number, y: number, font?: string, fillStyle?: string | CanvasGradient | CanvasPattern): Rect {
    const ctx = canvas.getContext('2d');
    if(ctx) {
      ctx.save();
      if (font) ctx.font = font;
      if (fillStyle) ctx.fillStyle = fillStyle;
      ctx.fillText(text, x, y);
      ctx.restore();
    }
    return this.measureText(canvas, text, x, y, font, fillStyle);
  };

  public static measureText(canvas: HTMLCanvasElement, text: string, x: number, y: number, font?: string, fillStyle?: string | CanvasGradient | CanvasPattern): Rect {
    let output: Rect = { x: 0, y: 0, width: 0, height: 0 }
    const ctx = canvas.getContext('2d');
    if(ctx) {
      ctx.save();
      if (font) ctx.font = font;
      if (fillStyle) ctx.fillStyle = fillStyle;
      const textMetrics = ctx.measureText(text);
      output = { x, y, width: textMetrics.width, height: textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent };
      ctx.restore();
    }
    return output;
  };
  // ------------------------------------------------------------------------------
  public static drawTextAlign(canvas: HTMLCanvasElement, text: string, x: number, y: number, width: number, font?: string, fillStyle?: string | CanvasGradient | CanvasPattern, align: 'left' | 'center' | 'right' = 'left'): Rect {
    const ctx = canvas.getContext('2d');
    if(ctx) {
      ctx.save();
      if (font) ctx.font = font;
      if (fillStyle) ctx.fillStyle = fillStyle;
      const textMetrics = ctx.measureText(text);
      ctx.fillText(text, (align === 'left' ? x : (align === 'center' ? x + (width - textMetrics.width) / 2 : x + (width - textMetrics.width))), y);
      ctx.restore();
    }
    return this.measureTextAlign(canvas, text, x, y, width, font, fillStyle, align);
  };

  public static measureTextAlign(canvas: HTMLCanvasElement, text: string, x: number, y: number, width: number, font?: string, fillStyle?: string | CanvasGradient | CanvasPattern, align: 'left' | 'center' | 'right' = 'left'): Rect {
    const rect = this.measureText(canvas, text, x, y, font, fillStyle);
    return { ...rect, x: (align === 'left' ? x : (align === 'center' ? x + (width - rect.width) / 2 : x + (width - rect.width))) };
  };
  // ------------------------------------------------------------------------------
  public static drawTextFixWidth(canvas: HTMLCanvasElement, text: string, x: number, y: number, width: number, font?: string, fillStyle?: string | CanvasGradient | CanvasPattern): Rect {
    const ctx = canvas.getContext('2d');
    if(ctx) {
      ctx.save();
      if (font) ctx.font = font;
      if (fillStyle) ctx.fillStyle = fillStyle;
      const widthList = [];
      let widthSum = 0;
      for(const char of text){
        const widthChar = ctx.measureText(char).width;
        widthSum += widthChar;
        widthList.push(widthChar);
      }
      const padding = (width - widthSum) / (text.length - 1);
      widthSum = 0;
      for(let i = 0; i < text.length; i++) {
        ctx.fillText(text.charAt(i), x + widthSum, y);
        widthSum += padding + widthList[i];
      }
      ctx.restore();
    }
    return this.measureTextFixWidth(canvas, text, x, y, width, font, fillStyle);
  };

  public static measureTextFixWidth(canvas: HTMLCanvasElement, text: string, x: number, y: number, width: number, font?: string, fillStyle?: string | CanvasGradient | CanvasPattern): Rect {
    return { ...this.measureText(canvas, text, x, y, font, fillStyle), width };
  };
  // ------------------------------------------------------------------------------
  public static drawTextMultiline(canvas: HTMLCanvasElement, text: string, x: number, y: number, width: number, font?: string, fillStyle?: string | CanvasGradient | CanvasPattern, lineDistance: number = 1): Rect {
    const ctx = canvas.getContext('2d');
    let height = 0;
    if(ctx) {
      ctx.save();
      if (font) ctx.font = font;
      if (fillStyle) ctx.fillStyle = fillStyle;
      const textMetrics = ctx.measureText(text);
      if(textMetrics.width <= width) {
        ctx.fillText(text, x, y);
      } else {
        let tempText = '';
        for (let i = 0; i < text.length; i++) {
          const textMetricsMultiline = ctx.measureText(tempText + text[i]);
          if(textMetricsMultiline.width > width) {
            ctx.fillText(tempText, x, y + height);
            height += (textMetricsMultiline.fontBoundingBoxAscent + textMetricsMultiline.fontBoundingBoxDescent) * lineDistance;
            tempText = text[i];
          } else {
            tempText += text[i];
            if (i === text.length - 1) {
              ctx.fillText(tempText, x, y + height);
              height += textMetricsMultiline.fontBoundingBoxAscent + textMetricsMultiline.fontBoundingBoxDescent;
            }
          }
        }
      }
      ctx.restore();
    }
    return this.measureTextMultiline(canvas, text, x, y, width, font, fillStyle, lineDistance);
  };

  public static measureTextMultiline(canvas: HTMLCanvasElement, text: string, x: number, y: number, width: number, font?: string, fillStyle?: string | CanvasGradient | CanvasPattern, lineDistance: number = 1): Rect {
    const ctx = canvas.getContext('2d');
    let height = 0;
    if(ctx) {
      ctx.save();
      if (font) ctx.font = font;
      if (fillStyle) ctx.fillStyle = fillStyle;
      const textMetrics = ctx.measureText(text);
      if(textMetrics.width <= width) {
        height += textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent;
      } else {
        let tempText = '';
        for (let i = 0; i < text.length; i++) {
          const textMetricsMultiline = ctx.measureText(tempText + text[i]);
          if(textMetricsMultiline.width > width) {
            height += (textMetricsMultiline.fontBoundingBoxAscent + textMetricsMultiline.fontBoundingBoxDescent) * lineDistance;
            tempText = text[i];
          } else {
            tempText += text[i];
            if (i === text.length - 1) {
              height += textMetricsMultiline.fontBoundingBoxAscent + textMetricsMultiline.fontBoundingBoxDescent;
            }
          }
        }
      }
      ctx.restore();
    }
    return { x, y, width, height };
  };
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
}
// --------------------------------------------------------------------------------
//# endregion
// ================================================================================

// ================================================================================
// * Module exports
// --------------------------------------------------------------------------------
export default HtmlUtil;
// ================================================================================
