// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import { defineComponent, ref } from 'vue';
// --------------------------------------------------------------------------------
import ImageCutterUtil from 'src/scripts/module/image-cutter/util/ImageCutterUtil';
import {
  RatioKey, ModeKey, OutputKey,
  Ratio, Mode, Output,
  RATIO_LIST, RATIO_RECORD, MODE_LIST, OUTPUT_LIST,
  EXAMPLE_LONG_IMAGE_EXCEL, LongImageExcel
} from 'src/scripts/module/image-cutter/interface/common';
import HtmlUtil from 'src/scripts/util/HtmlUtil';
import ExcelUtil from 'src/scripts/util/ExcelUtil';
// ================================================================================

export default defineComponent({
  setup(){
    // ------------------------------------------------------------------------------
    // * Vue
    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // * Interface
    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // * Constant
    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // * Option
    // ------------------------------------------------------------------------------
    const ratioList = ref<Ratio[]>(RATIO_LIST);
    const modeList = ref<Mode[]>(MODE_LIST);
    const outputList = ref<Output[]>(OUTPUT_LIST);
    // ------------------------------------------------------------------------------
    // * Component
    // ------------------------------------------------------------------------------
    const previewCanvas = ref<HTMLCanvasElement>(null as unknown as HTMLCanvasElement);
    // ------------------------------------------------------------------------------
    // * Parameter
    // ------------------------------------------------------------------------------
    const _originImageArrayBuffer = ref<ArrayBuffer>();
    const _originImage = ref<HTMLImageElement>();
    // ------------------------------------------------------------------------------
    const outputLoading = ref<boolean>(false);
    // ------------------------------------------------------------------------------
    const originImageSrc = ref<string>();
    const originImageWidth = ref<number>(0);
    const originImageHeight = ref<number>(0);
    // ------------------------------------------------------------------------------
    const longImageExcel = ref<LongImageExcel>();
    // ------------------------------------------------------------------------------
    const _ratio = ref<number>(0);
    const _output = ref<number>(1024);
    // ------------------------------------------------------------------------------
    const ratioSelect = ref<RatioKey>(RATIO_LIST[0].key);
    const ratioInputValue = ref<string>();
    // ------------------------------------------------------------------------------
    const modeSelect = ref<ModeKey>(MODE_LIST[0].key);
    // ------------------------------------------------------------------------------
    const outputSelect = ref<OutputKey>(OUTPUT_LIST[0].key);
    const outputInputValue = ref<string>();
    // ------------------------------------------------------------------------------
    const baseImageCutSize = ref<number>(-1);
    // ------------------------------------------------------------------------------
    // * Lifecycle
    // ------------------------------------------------------------------------------
    function _refreshOriginImage(){
      _originImageArrayBuffer.value = undefined;
      _originImage.value = undefined;
      originImageSrc.value = undefined;
      originImageWidth.value = 0;
      originImageHeight.value = 0;
      repaintPreviewCanvas();
    }

    function _refreshLongImageExcel(){
      longImageExcel.value = undefined;
    }
    // ------------------------------------------------------------------------------
    // * Emit
    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // * Function
    // ------------------------------------------------------------------------------
    //# region FileDrop
    // ------------------------------------------------------------------------------
    async function onOriginImageDrop(file: File){
      const arrayBuffer = await HtmlUtil.readBlob(file, 'ArrayBuffer');
      if (arrayBuffer){
        _originImageArrayBuffer.value = arrayBuffer;
        const imageSrc = HtmlUtil.arrayBufferToImageSrc(arrayBuffer);
        originImageSrc.value = imageSrc;
        const originImage = await HtmlUtil.imageSrcToImage(imageSrc);
        _originImage.value = originImage;
        originImageWidth.value = originImage.width;
        originImageHeight.value = originImage.height;
        repaintPreviewCanvas();
      }
    }

    async function onExcelConfigDrop(file: File){
      const arrayBuffer = await HtmlUtil.readBlob(file, 'ArrayBuffer');
      if (arrayBuffer){
        const workbook = await ExcelUtil.arrayBufferToExcelJSWorkbook(arrayBuffer);
        longImageExcel.value = ImageCutterUtil.importLongImageExcel(workbook);
        console.log(longImageExcel.value);
      }
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------
    //# region Model Value Update
    // ------------------------------------------------------------------------------
    function onRatioInputFocusOut () {
      try {
        if (ratioInputValue.value !== '' && ratioInputValue.value !== undefined && ratioInputValue.value !== null){
          const value = Math.max(0, Math.min(parseFloat(ratioInputValue.value), 0.5));
          _ratio.value = value;
          ratioInputValue.value = value.toString();
          ratioSelect.value = 'input';
        } else {
          _ratio.value = 0;
          ratioInputValue.value = undefined;
          ratioSelect.value = RATIO_LIST[0].key;
        }
      } catch (e) {
        _ratio.value = 0;
        ratioInputValue.value = undefined;
        ratioSelect.value = RATIO_LIST[0].key;
      }
      repaintPreviewCanvas();
    }

    function onOutputInputFocusOut () {
      try {
        if (outputInputValue.value !== '' && outputInputValue.value !== undefined && outputInputValue.value !== null){
          const value = Math.max(512, Math.min(parseInt(outputInputValue.value), 4096));
          _output.value = value;
          outputInputValue.value = value.toString();
          outputSelect.value = 'input';
        } else {
          _output.value = 0;
          outputInputValue.value = undefined;
          outputSelect.value = OUTPUT_LIST[0].key;
        }
      } catch (e) {
        _output.value = 0;
        outputInputValue.value = undefined;
        outputSelect.value = OUTPUT_LIST[0].key;
      }
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------
    //# region Button Events
    // ------------------------------------------------------------------------------
    function removeOriginImage(){
      _refreshOriginImage();
    }

    function removeLongImageExcel(){
      _refreshLongImageExcel();
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------
    //# region Canvas
    // ------------------------------------------------------------------------------
    function repaintPreviewCanvas(){
      HtmlUtil.clearCanvas(previewCanvas.value);
      baseImageCutSize.value = -1;
      if(_originImage.value){
        HtmlUtil.fillImageToCanvas(previewCanvas.value, _originImage.value);
        const ratio = { ...RATIO_RECORD, 'input': _ratio.value }[ratioSelect.value];
        const mode = modeSelect.value;
        baseImageCutSize.value = ImageCutterUtil.calcBaseImageCutSize(_originImage.value, { ratio, mode });
        ImageCutterUtil.fillSplitLineToCanvas(previewCanvas.value, { ratio, mode });
      }
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------
    //# region Output
    // ------------------------------------------------------------------------------
    async function outputBaseImage(){
      if(_originImage.value){
        outputLoading.value = true;
        const ratio = { ...RATIO_RECORD, 'input': _ratio.value }[ratioSelect.value];
        const mode = modeSelect.value;
        const output = { 'original': baseImageCutSize.value, 'scale': Math.floor(Math.max(originImageWidth.value, originImageHeight.value) / 3), 'input': _output.value }[outputSelect.value];
        const zipBlob = await ImageCutterUtil.outputBaseImageDataZip(_originImage.value, { ratio, mode, targetSize: output });
        HtmlUtil.downloadBlob(`export-${ ratioSelect.value }-${output}px.zip`, zipBlob);
        outputLoading.value = false;
      }
    }

    async function outputLongImage() {
      if(_originImage.value && longImageExcel.value){
        outputLoading.value = true;
        const ratio = { ...RATIO_RECORD, 'input': _ratio.value }[ratioSelect.value];
        const mode = modeSelect.value;
        const output = { 'original': baseImageCutSize.value, 'scale': Math.floor(Math.max(originImageWidth.value, originImageHeight.value) / 3), 'input': _output.value }[outputSelect.value];
        const zipBlob = await ImageCutterUtil.outputLongImageDataZip(_originImage.value, { ratio, mode, targetSize: output }, longImageExcel.value);
        HtmlUtil.downloadBlob(`export-long-${ ratioSelect.value }-${output}px.zip`, zipBlob);
        outputLoading.value = false;
      }
    }
    // ------------------------------------------------------------------------------
    async function exportDefaultExcel () {
      outputLoading.value = true;
      const workbook = ImageCutterUtil.exportLongImageExcel(EXAMPLE_LONG_IMAGE_EXCEL);
      const excelBlob = await ExcelUtil.excelJSWorkbookToBlob(workbook);
      HtmlUtil.downloadBlob('example.xlsx', excelBlob);
      outputLoading.value = false;
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------

    return {
      // ------------------------------------------------------------------------------
      // * Class
      // ------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------
      // * Constant
      // ------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------
      // * Option
      // ------------------------------------------------------------------------------
      ratioList,
      modeList,
      outputList,
      // ------------------------------------------------------------------------------
      // * Component
      // ------------------------------------------------------------------------------
      previewCanvas,
      // ------------------------------------------------------------------------------
      // * Parameter
      // ------------------------------------------------------------------------------
      outputLoading,
      // ------------------------------------------------------------------------------
      originImageSrc,
      originImageWidth,
      originImageHeight,
      // ------------------------------------------------------------------------------
      longImageExcel,
      // ------------------------------------------------------------------------------
      ratioSelect,
      ratioInputValue,
      // ------------------------------------------------------------------------------
      modeSelect,
      // ------------------------------------------------------------------------------
      outputSelect,
      outputInputValue,
      // ------------------------------------------------------------------------------
      baseImageCutSize,
      // ------------------------------------------------------------------------------
      // * Emit
      // ------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------
      // * Function
      // ------------------------------------------------------------------------------
      onOriginImageDrop,
      onExcelConfigDrop,
      // ------------------------------------------------------------------------------
      onRatioInputFocusOut,
      onOutputInputFocusOut,
      // ------------------------------------------------------------------------------
      removeOriginImage,
      removeLongImageExcel,
      // ------------------------------------------------------------------------------
      repaintPreviewCanvas,
      // ------------------------------------------------------------------------------
      outputBaseImage,
      outputLongImage,
      // ------------------------------------------------------------------------------
      exportDefaultExcel,
    }

  },
});
