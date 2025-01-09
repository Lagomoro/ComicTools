// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import { defineComponent, ref } from 'vue';
import { isAndroid, isChrome } from 'vue-device-detect';
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
      NFCWriter,
    }

    interface StepInfo {
      total: number;
      current: number;
      currentTab: DialogTab;
    }

    interface NFCRecord {
      recordType: 'text' | 'url' | 'android.com:pkg';
      data: string | Uint8Array;
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
      [DialogTab.NFCWriter]: '写入 NFC 标签',
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
    async function createLaunchCard (data: string) {
      outputLoading.value = true;

      _showDialog(1);

      try {
        await _stepNfcWriter([
          { recordType: 'android.com:pkg', data: new TextEncoder().encode(data) }
        ]);
        _showStatus(Status.Success, 'mdi-check-circle-outline', '写入成功', '生成 NFC 启动卡成功。');
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
          try {
            const abortControllerTemp = new AbortController();
            await ndef.scan({ signal: abortControllerTemp.signal });
            abortControllerTemp.abort();
          } catch (error) {

          }
          await ndef.write({ records }, { signal: abortController.signal });
          _onDialogClose.value = () => void 0;
          resolve();
        } catch (error) {
          if(error.message === 'Cancelled'){
            _showStatus(Status.Warning, 'mdi-cancel', '流程被手动取消', '你取消了写入 NFC 标签，请重新开始流程。');
            reject(new Error('Cancelled'));
          } else if(error.message.startsWith('Failed to write due to an IO error')) {
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
      createLaunchCard,
      // ------------------------------------------------------------------------------
      closeDialog,
  }

  },
});
