// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------

// ================================================================================

// ================================================================================
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
