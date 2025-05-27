// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import ExcelJS from 'exceljs';
import * as XLSX from 'xlsx';
import { ParsingOptions, WorkBook } from 'xlsx';
// ================================================================================

// ================================================================================
//# region ExcelUtil
// --------------------------------------------------------------------------------

export class ExcelUtil {
  // ------------------------------------------------------------------------------
  // * Function
  // ------------------------------------------------------------------------------
  //# region DataTransition
  // ------------------------------------------------------------------------------
  public static arrayBufferToXLSXWorkBook(buffer: ArrayBuffer, opts?: ParsingOptions): WorkBook {
    return XLSX.read(buffer, { ...opts, type: 'binary' });
  };
  // ------------------------------------------------------------------------------
  public static async arrayBufferToExcelJSWorkbook(buffer: ArrayBuffer): Promise<ExcelJS.Workbook> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    return workbook;
  };

  public static async excelJSWorkbookToBlob(workbook: ExcelJS.Workbook): Promise<Blob> {
    return new Blob([await workbook.xlsx.writeBuffer()]);
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region Image
  // ------------------------------------------------------------------------------
  public static getWorksheetImageList(workbook: ExcelJS.Workbook, worksheet: ExcelJS.Worksheet): { rowNumber: number; colNumber: number; buffer: ArrayBuffer }[] {
    const output: { rowNumber: number; colNumber: number; buffer: ArrayBuffer }[] = [];
    for (const image of worksheet.getImages()) {
      const media = workbook.model.media.find(m => (m as unknown as { index: number }).index === image.imageId as unknown as number);
      if(media){
        output.push({ rowNumber: image.range.tl.nativeRow + 1, colNumber: image.range.tl.nativeCol + 1, buffer: media.buffer });
      }
    }
    return output;
  }
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region Color
  // ------------------------------------------------------------------------------
  public static argbStringToColor(argb: string): string {
    const r = parseInt(argb.substring(2, 4), 16);
    const g = parseInt(argb.substring(4, 6), 16);
    const b = parseInt(argb.substring(6, 8), 16);
    const a = parseInt(argb.substring(0, 2), 16);
    return `rgba(${ r }, ${ g }, ${ b }, ${ a / 255 })`;
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
export default ExcelUtil;
// ================================================================================
