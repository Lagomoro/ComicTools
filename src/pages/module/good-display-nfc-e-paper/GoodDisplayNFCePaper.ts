// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import { defineComponent, nextTick, ref } from 'vue';
import { isAndroid, isChrome } from 'vue-device-detect';
import { Html5Qrcode, Html5QrcodeResult } from 'html5-qrcode';
import { Html5QrcodeError } from 'html5-qrcode/src/core';
// ================================================================================

export default defineComponent({
  setup(){
    // ------------------------------------------------------------------------------
    // * Vue
    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // * Interface
    // ------------------------------------------------------------------------------
    enum Status {
      None = 0,
      Error,
      Warning,
      Success,
    }

    interface StatusInfo {
      status: Status;
      icon: string;
      title: string;
      message: string;
    }

    enum DialogTab {
      None = 0,
      NFCReader,
      NFCWait,
      NFCWriter,
      QRCodeScanner,
    }

    interface StepInfo {
      total: number;
      current: number;
      currentTab: DialogTab;
    }

    interface NFCRecord {
      recordType: 'text' | 'url' | 'android.com:pkg';
      data?: string | Uint8Array;
    }
    // ------------------------------------------------------------------------------
    // * Constant
    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // * Option
    // ------------------------------------------------------------------------------
    const STATUS_CLASS_NAME = ref<Record<Status, string>>( {
      [Status.None]: '',
      [Status.Error]: 'negative text-negative',
      [Status.Warning]: 'warning text-warning',
      [Status.Success]: 'positive text-positive',
    });

    const STEP_DIALOG_TITLE = ref<Record<DialogTab, string>>( {
      [DialogTab.None]: '',
      [DialogTab.NFCReader]: '读取 NFC 标签',
      [DialogTab.NFCWait]: '等待 NFC',
      [DialogTab.NFCWriter]: '写入 NFC 标签',
      [DialogTab.QRCodeScanner]: '扫描二维码',
    });
    // ------------------------------------------------------------------------------
    // * Component
    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // * Parameter
    // ------------------------------------------------------------------------------
    const _onDialogClose = ref<() => Promise<void> | void>(() => void 0);
    // ------------------------------------------------------------------------------
    const onDialogCallback = ref<() => Promise<void> | void>(() => void 0);
    // ------------------------------------------------------------------------------
    const outputLoading = ref<boolean>(false);
    // ------------------------------------------------------------------------------
    const showDialog = ref<boolean>(false);
    // ------------------------------------------------------------------------------
    const stepInfo = ref<StepInfo>({ total: 0, current: 0, currentTab: DialogTab.None });
    const statusInfo = ref<StatusInfo>({ status: Status.None, icon: '', title: '', message: '' });
    // ------------------------------------------------------------------------------
    // * Lifecycle
    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // * Emit
    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // * Function
    // ------------------------------------------------------------------------------
    //# region Button Events
    // ------------------------------------------------------------------------------
    async function copyFromNfcTag() {
      outputLoading.value = true;

      _showDialog(3);

      try {
        const result = await _stepNfcReader();
        if(result.length > 1 && result[0].recordType === 'url' && (result[0].data as string).startsWith('https://render.alipay.com/p/s/ulink/sn?s=dc&scheme=') &&
          result[1].recordType === 'android.com:pkg' && result[1].data === 'com.eg.android.AlipayGphone') {
          result[1].data = new TextEncoder().encode(result[1].data);
          await _stepNfcWait();
          await _stepNfcWriter(result);
          _showStatus(Status.Success, 'mdi-check-circle-outline', '写入成功', '从碰一碰小蓝环复制 NFC Tag 成功。');
        } else {
          _showStatus(Status.Warning, 'mdi-alert', 'NFC Tag 不符合要求', '读取的 NFC Tag 不是支付宝付款码，或者读取时发生了数据缺失。读取时请不要移动手机，会导致数据流不稳，请重新开始流程。');
        }
      } catch (error) {
        console.error(error);
      }

      await closeDialog();

      outputLoading.value = false;
    }
    // ------------------------------------------------------------------------------
    async function scanFromPayCode () {
      outputLoading.value = true;

      _showDialog(2);

      try {
        const result = await _stepQRCodeScanner();
        const text = result.decodedText;
        if(text.startsWith('https://qr.alipay.com/')){
          await _stepNfcWriter([
            { recordType: 'url', data: `https://render.alipay.com/p/s/ulink/sn?s=dc&scheme=${ encodeURIComponent(`alipay://nfc/app?id=10000007&actionType=route&codeContent=${ encodeURIComponent(`${ text }?noT=ntagtqp`) }`) }` },
            { recordType: 'android.com:pkg', data: new TextEncoder().encode('com.eg.android.AlipayGphone') }
          ]);
          _showStatus(Status.Success, 'mdi-check-circle-outline', '写入成功', '从收款码生成碰一碰 NFC Tag 成功。');
        } else {
          _showStatus(Status.Warning, 'mdi-alert', '二维码不符合要求', '扫描的二维码不是支付宝付款码，请重新开始流程。');
        }
      } catch (error) {
        console.error(error);
      }

      await closeDialog();

      outputLoading.value = false;
    }
    // ------------------------------------------------------------------------------
    function _showDialog(total: number){
      _hideStatus();
      stepInfo.value.total = total;
      stepInfo.value.current = 0;
      showDialog.value = true;
    }

    async function closeDialog(){
      await _onDialogClose.value();
      showDialog.value = false;
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------
    //# region Dialog Tab
    // ------------------------------------------------------------------------------
    async function _stepQRCodeScanner(): Promise<Html5QrcodeResult> {
      stepInfo.value.current += 1;
      stepInfo.value.currentTab = DialogTab.QRCodeScanner;

      await nextTick();

      return new Promise(async (resolve, reject) => {
        const html5QrCode = new Html5Qrcode('reader', true);
        try {
          _onDialogClose.value = async () => {
            _onDialogClose.value = () => void 0;
            _showStatus(Status.Warning, 'mdi-cancel', '流程被手动取消', '你取消了扫描二维码，请重新开始流程。');
            await html5QrCode.stop();
            reject(new Error('Cancelled'));
          };
          await html5QrCode.start({
            facingMode: 'environment'
          }, {
            fps: 10,
            qrbox: (viewfinderWidth: number, viewfinderHeight: number) => ({ width: Math.min(viewfinderWidth, viewfinderHeight) * 0.7, height: Math.min(viewfinderWidth, viewfinderHeight) * 0.7 })
          }, (decodedText: string, result: Html5QrcodeResult) => {
            _onDialogClose.value = () => void 0;
            html5QrCode.stop();
            resolve(result);
          }, (errorMessage: string, error: Html5QrcodeError) => {
            return { errorMessage, error };
          });
        } catch (error) {
          _onDialogClose.value = () => void 0;
          _showStatus(Status.Error, 'mdi-camera-off', '不受支持的摄像输入', '你的设备没有可供调用的摄像头，请确认你提供了使用摄像头的权限。');
          reject(error);
        }
      });
    }

    async function _stepNfcReader(): Promise<NFCRecord[]> {
      stepInfo.value.current += 1;
      stepInfo.value.currentTab = DialogTab.NFCReader;

      return new Promise(async (resolve, reject) => {
        const abortController = new AbortController();
        const ndef = new NDEFReader();

        try {
          _onDialogClose.value = () => {
            _onDialogClose.value = () => void 0;
            abortController.abort({ message: 'Cancelled' });
            _showStatus(Status.Warning, 'mdi-cancel', '流程被手动取消', '你取消了读取 NFC 标签，请重新开始流程。');
            reject(new Error('Cancelled'));
          };
          ndef.onreading = (event: NDEFReadingEvent) => {
            _onDialogClose.value = () => void 0;
            abortController.abort({ message: 'Cancelled' });
            resolve(event.message.records.map(p => ({ recordType: p.recordType, data: p.data ? new TextDecoder().decode(p.data as unknown as Uint8Array): undefined } as NFCRecord)));
          };
          await ndef.scan({ signal: abortController.signal });
        } catch (error) {
          _onDialogClose.value = () => void 0;
          _showStatus(Status.Error, 'mdi-nfc-variant-off', '不受支持的 NFC 设备', '你的设备没有可供调用的 NFC 设备，请确认你打开了手机的 NFC 开关，并提供了使用 NFC 设备的权限。');
          reject(error);
        }
      });
    }

    async function _stepNfcWait(): Promise<void> {
      stepInfo.value.current += 1;
      stepInfo.value.currentTab = DialogTab.NFCWait;

      return new Promise(async (resolve, reject) => {
        _onDialogClose.value = () => {
          _onDialogClose.value = () => void 0;
          onDialogCallback.value = () => void 0;
          _showStatus(Status.Warning, 'mdi-cancel', '流程被手动取消', '你取消了等待 NFC，请重新开始流程。');
          reject(new Error('Cancelled'));
        };
        onDialogCallback.value = () => {
          _onDialogClose.value = () => void 0;
          onDialogCallback.value = () => void 0;
          resolve();
        };
      });
    }

    async function _stepNfcWriter(records: NFCRecord[]): Promise<void> {
      stepInfo.value.current += 1;
      stepInfo.value.currentTab = DialogTab.NFCWriter;

      return new Promise(async (resolve, reject) => {
        const abortController = new AbortController();
        const ndef = new NDEFReader();

        try {
          _onDialogClose.value = () => {
            _onDialogClose.value = () => void 0;
            abortController.abort({ message: 'Cancelled' });
          };
          const abortControllerTemp = new AbortController();
          await ndef.scan({ signal: abortControllerTemp.signal });
          abortControllerTemp.abort();
          await ndef.write({ records }, { signal: abortController.signal });
          _onDialogClose.value = () => void 0;
          resolve();
        } catch (error) {
          if((error as Error).message === 'Cancelled'){
            _showStatus(Status.Warning, 'mdi-cancel', '流程被手动取消', '你取消了写入 NFC 标签，请重新开始流程。');
            reject(new Error('Cancelled'));
          } else if((error as Error).message.startsWith('Failed to write due to an IO error')) {
            _showStatus(Status.Error, 'mdi-pencil-remove-outline', 'NFC Tag 写入失败', '发生了 I/O 错误，写入时请不要移动手机，会导致数据流不稳定，请重新开始流程。');
            reject(error);
          } else {
            _onDialogClose.value = () => void 0;
            _showStatus(Status.Error, 'mdi-nfc-variant-off', '不受支持的 NFC 设备', '你的设备没有可供调用的 NFC 设备，请确认你打开了手机的 NFC 开关，并提供了使用 NFC 设备的权限。');
            reject(error);
          }
        }
      });
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------
    //# region Calc
    // ------------------------------------------------------------------------------
    function _showStatus(status: Status, icon: string, title: string, message: string){
      statusInfo.value.status = status;
      statusInfo.value.icon = icon;
      statusInfo.value.title = title;
      statusInfo.value.message = message;
    }

    function _hideStatus(){
      statusInfo.value.status = Status.None;
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
      DialogTab,
      // ------------------------------------------------------------------------------
      // * Constant
      // ------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------
      // * Option
      // ------------------------------------------------------------------------------
      STATUS_CLASS_NAME,
      STEP_DIALOG_TITLE,
      // ------------------------------------------------------------------------------
      // * Component
      // ------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------
      // * Parameter
      // ------------------------------------------------------------------------------
      onDialogCallback,
      // ------------------------------------------------------------------------------
      outputLoading,
      // ------------------------------------------------------------------------------
      showDialog,
      // ------------------------------------------------------------------------------
      stepInfo,
      statusInfo,
      // ------------------------------------------------------------------------------
      // * Emit
      // ------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------
      // * Function
      // ------------------------------------------------------------------------------
      copyFromNfcTag,
      scanFromPayCode,
      // ------------------------------------------------------------------------------
      closeDialog,
    }

  },
});
