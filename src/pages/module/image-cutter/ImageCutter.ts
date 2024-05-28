// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import { defineComponent, ref } from 'vue';
// --------------------------------------------------------------------------------
import ImageCutterUtil from 'src/scripts/module/image-cutter/util/ImageCutterUtil';
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
    const originImageSrc = ref<string>();
    const originImageWidth = ref<number>(0);
    const originImageHeight = ref<number>(0);
    // ------------------------------------------------------------------------------
    const _ratio = ref<number>(0);
    const _output = ref<number>(1024);
    // ------------------------------------------------------------------------------
    const ratioSelect = ref<'weibo' | 'bili_bili' | 'qq_space' | 'input'>('weibo');
    const ratioInputValue = ref<string>();
    // ------------------------------------------------------------------------------
    const modeSelect = ref<'cut' | 'scale'>('cut');
    // ------------------------------------------------------------------------------
    const outputSelect = ref<'original' | 'scale' | 'input'>('original');
    const outputInputValue = ref<string>();
    // ------------------------------------------------------------------------------
    const cutSize = ref<number>(-1);
    // ------------------------------------------------------------------------------
    // * Lifecycle
    // ------------------------------------------------------------------------------
    function _refresh(){
      _originImageArrayBuffer.value = undefined;
      _originImage.value = undefined;
      originImageSrc.value = undefined;
      originImageWidth.value = 0;
      originImageHeight.value = 0;
      repaintPreviewCanvas();
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
      const arrayBuffer = await ImageCutterUtil.readBlob(file, 'ArrayBuffer');
      if (arrayBuffer){
        _originImageArrayBuffer.value = arrayBuffer;
        const imageSrc = ImageCutterUtil.arrayBufferToImageSrc(arrayBuffer);
        originImageSrc.value = imageSrc;
        const originImage = await ImageCutterUtil.imageSrcToImage(imageSrc);
        _originImage.value = originImage;
        originImageWidth.value = originImage.width;
        originImageHeight.value = originImage.height;
        repaintPreviewCanvas();
      }
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------
    //# region Model Value Update
    // ------------------------------------------------------------------------------
    function onRatioInputFocusOut () {
      console.log(1231)
      try {
        if (ratioInputValue.value !== '' && ratioInputValue.value !== undefined && ratioInputValue.value !== null){
          const value = Math.max(0, Math.min(parseFloat(ratioInputValue.value), 0.5));
          _ratio.value = value;
          ratioInputValue.value = value.toString();
          ratioSelect.value = 'input';
        } else {
          _ratio.value = 0;
          ratioInputValue.value = undefined;
          ratioSelect.value = 'weibo';
        }
      } catch (e) {
        _ratio.value = 0;
        ratioInputValue.value = undefined;
        ratioSelect.value = 'weibo';
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
          outputSelect.value = 'original';
        }
      } catch (e) {
        _output.value = 0;
        outputInputValue.value = undefined;
        outputSelect.value = 'original';
      }
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------
    //# region Button Events
    // ------------------------------------------------------------------------------
    function removeOriginImage(){
      _refresh();
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------
    //# region Canvas
    // ------------------------------------------------------------------------------
    function repaintPreviewCanvas(){
      ImageCutterUtil.clearCanvas(previewCanvas.value);
      cutSize.value = -1;
      if(_originImage.value){
        ImageCutterUtil.fillImageToCanvas(previewCanvas.value, _originImage.value);
        const ratio = { 'weibo': 0.03, 'bili_bili': 0.02, 'qq_space': 0.015, 'input': _ratio.value }[ratioSelect.value];
        const mode = modeSelect.value;
        cutSize.value = ImageCutterUtil.calcCutSize(_originImage.value, { ratio, mode });
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
        const ratio = { 'weibo': 0.03, 'bili_bili': 0.02, 'qq_space': 0.015, 'input': _ratio.value }[ratioSelect.value];
        const mode = modeSelect.value;
        const output = { 'original': cutSize.value, 'scale': Math.floor(Math.max(originImageWidth.value, originImageHeight.value) / 3), 'input': _output.value }[outputSelect.value];
        const zipBlob = await ImageCutterUtil.outputSplitImageDataZip(_originImage.value, { ratio, mode, targetSize: output });
        ImageCutterUtil.downloadBlob(`export-${ ratioSelect.value }-${output}px.zip`, zipBlob);
      }
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
      // ------------------------------------------------------------------------------
      // * Component
      // ------------------------------------------------------------------------------
      previewCanvas,
      // ------------------------------------------------------------------------------
      // * Parameter
      // ------------------------------------------------------------------------------
      originImageSrc,
      originImageWidth,
      originImageHeight,
      // ------------------------------------------------------------------------------
      ratioSelect,
      ratioInputValue,
      // ------------------------------------------------------------------------------
      modeSelect,
      // ------------------------------------------------------------------------------
      outputSelect,
      outputInputValue,
      // ------------------------------------------------------------------------------
      cutSize,
      // ------------------------------------------------------------------------------
      // * Emit
      // ------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------
      // * Function
      // ------------------------------------------------------------------------------
      onOriginImageDrop,
      // ------------------------------------------------------------------------------
      onRatioInputFocusOut,
      onOutputInputFocusOut,
      // ------------------------------------------------------------------------------
      removeOriginImage,
      // ------------------------------------------------------------------------------
      repaintPreviewCanvas,
      // ------------------------------------------------------------------------------
      outputBaseImage,
    }

  },
});
