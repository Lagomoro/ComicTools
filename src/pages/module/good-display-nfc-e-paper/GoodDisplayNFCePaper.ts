// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import { defineComponent, onMounted, ref } from 'vue';
import { isAndroid, isChrome } from 'vue-device-detect';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import html2canvas from 'html2canvas';
import copy from 'copy-to-clipboard'
// ------------------------------------------------------------------------------
import { EPaperAlgorithm, EPaperDisplayType } from 'src/scripts/module/good-display-nfc-e-paper/interface/common';
import GoodDisplayNFCePaperUtil from 'src/scripts/module/good-display-nfc-e-paper/util/GoodDisplayNFCePaperUtil';
import HtmlUtil from 'src/scripts/util/HtmlUtil';
// ================================================================================

export default defineComponent({
  setup(){
    // ------------------------------------------------------------------------------
    // * Vue
    // ------------------------------------------------------------------------------
    onMounted(async () => {
      calcTagData();
    });
    // ------------------------------------------------------------------------------
    // * Interface
    // ------------------------------------------------------------------------------
    interface TagInputData {
      title: string;

      discount: string;
      discountColor: 'bg-black' | 'bg-yellow' | 'bg-negative';

      priceA: string;
      unitA: string;
      priceB: string;
      unitB: string;
      currency: string;
      free: boolean;
      freeInfo: string;
      qrCodeText: string;

      logoEnglish: string;
      logoChinese: string;
      barcodeText: string;
      keyA: string;
      keyB: string;
      keyC: string;
      valueA: string;
      valueB: string;
      valueC: string;

      info: string;
      infoColor: 'bg-black' | 'bg-yellow' | 'bg-negative';
    }

    interface TagCalcData {
      qrCodeData: Uint8Array;
      qrCodeSize: number;
      barcode: number[];
    }

    interface ColorPickerOption {
      label: string;
      value: string;
    }

    interface CurrencyOption {
      label: string;
      value: string;
    }
    // ------------------------------------------------------------------------------
    // * Constant
    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // * Option
    // ------------------------------------------------------------------------------
    const colorPickerOption= ref<ColorPickerOption[]>([
      { label: '黑色', value: 'bg-black' },
      { label: '黄色', value: 'bg-yellow' },
      { label: '红色', value: 'bg-negative' },
    ]);

    const currencyOption = ref<CurrencyOption[]>([
      { label: '人民币', value: 'CNY' },
      { label: '日元', value: 'JPY' },
    ])
    // ------------------------------------------------------------------------------
    // * Component
    // ------------------------------------------------------------------------------
    const outputElement = ref<HTMLDivElement>(undefined as unknown as HTMLDivElement);
    // ------------------------------------------------------------------------------
    // * Parameter
    // ------------------------------------------------------------------------------
    const outputLoading = ref<boolean>(false);
    // ------------------------------------------------------------------------------
    const tagInputData = ref<TagInputData>({
      title: '光栅卡 • 游戏开发部角色信息卡',

      discount: '当期新品',
      discountColor: 'bg-yellow',

      priceA: '10',
      unitA: '个',
      priceB: '36',
      unitB: '套',
      currency: 'CNY',
      free: false,
      freeInfo: '加入兔萌社粉丝群，且群等级达到 LV1',
      qrCodeText: 'https://qm.qq.com/cgi-bin/qm/qr?k=7Zm6aRRzOjNRPMl49QEa99uv5Pd7mRvR&jump_from=webapi&qr=1',

      logoEnglish: 'MoroWorks',
      logoChinese: '兔萌社',
      barcodeText: 'M-BA-BD001',
      keyA: '材 质',
      keyB: '工 艺',
      keyC: '画 师',
      valueA: 'PVC',
      valueB: '透明光栅',
      valueC: 'Lagomoro',

      info: '展会限定制品',
      infoColor: 'bg-negative',
    })

    const tagCalcData = ref<TagCalcData>({
      qrCodeData: new Uint8Array(0),
      qrCodeSize: 0,
      barcode: [],
    })
    // ------------------------------------------------------------------------------
    // * Emit
    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // * Function
    // ------------------------------------------------------------------------------
    //# region calcData
    // ------------------------------------------------------------------------------
    function calcTagData(){
      tagCalcData.value.qrCodeData = new Uint8Array(0);
      tagCalcData.value.qrCodeSize = 0;
      if(tagInputData.value.qrCodeText) {
        const qrcode = QRCode.create(tagInputData.value.qrCodeText, { errorCorrectionLevel: 'H' });
        tagCalcData.value.qrCodeData = qrcode.modules.data;
        tagCalcData.value.qrCodeSize = qrcode.modules.size;
      }

      tagCalcData.value.barcode = [];
      if(tagInputData.value.barcodeText) {
        const data: any = {};
        JsBarcode(data, tagInputData.value.barcodeText);
        tagCalcData.value.barcode = data.encodings[0].data.split('').map((p: string) => parseInt(p));
      }
    }
    // ------------------------------------------------------------------------------
    async function _calcCanvasData(){
      const canvas = document.createElement('canvas');
      canvas.style.imageRendering = 'pixelated';
      canvas.width = outputElement.value.clientWidth;
      canvas.height = outputElement.value.clientHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if(ctx) {
        ctx.imageSmoothingEnabled = false;
        await html2canvas(outputElement.value, { canvas, scale: 1 });
        const imageData = GoodDisplayNFCePaperUtil.applyDithering(ctx.getImageData(0, 0, canvas.width, canvas.height), EPaperAlgorithm.FourColors);
        ctx.putImageData(imageData, 0, 0);
      }
      return canvas;
    }
    // ------------------------------------------------------------------------------
    async function saveCanvasData(){
      outputLoading.value = true;
      const canvas = await _calcCanvasData();
      const blob = await HtmlUtil.canvasToBlob(canvas, 'image/png', 1.0);
      if(blob){
        HtmlUtil.downloadBlob('output.png', blob);
      }
      outputLoading.value = false;
    }

    async function exportToEPaper(){
      outputLoading.value = true;
      const canvas = await _calcCanvasData();
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if(ctx) {
        const hexStringArray = GoodDisplayNFCePaperUtil.imageDataToHexStringArray(ctx.getImageData(0, 0, canvas.width, canvas.height), EPaperDisplayType.GDEY029F51H);
        copy(hexStringArray.join('|'));
        window.location.href = 'moro-works://comic-tools/good-display-nfc-e-paper';
      }
      outputLoading.value = false;
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------

    return {
      // ------------------------------------------------------------------------------
      // * Class
      // ------------------------------------------------------------------------------
      isAndroid,
      isChrome,
      // ------------------------------------------------------------------------------
      // * Constant
      // ------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------
      // * Option
      // ------------------------------------------------------------------------------
      colorPickerOption,
      currencyOption,
      // ------------------------------------------------------------------------------
      // * Component
      // ------------------------------------------------------------------------------
      outputElement,
      // ------------------------------------------------------------------------------
      // * Parameter
      // ------------------------------------------------------------------------------
      outputLoading,
      // ------------------------------------------------------------------------------
      tagInputData,
      tagCalcData,
      // ------------------------------------------------------------------------------
      // * Emit
      // ------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------
      // * Function
      // ------------------------------------------------------------------------------
      calcTagData,
      // ------------------------------------------------------------------------------
      saveCanvasData,
      exportToEPaper,
    }
  }
});
