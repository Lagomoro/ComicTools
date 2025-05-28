// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import { defineComponent, ref } from 'vue';
import HtmlUtil from 'src/scripts/util/HtmlUtil';
import ExcelUtil from 'src/scripts/util/ExcelUtil';
import {
  ElectronMenuExcel,
  EXAMPLE_ELECTRON_MENU_EXCEL,
  Screen,
  SCREEN_LIST,
  ScreenKey,
  Group,
  Data
} from 'src/scripts/module/electron-menu/interface/common';
import ElectronMenuUtil from 'src/scripts/module/electron-menu/util/ElectronMenuUtil';
// --------------------------------------------------------------------------------
import ElectronicMenuGridItem from 'pages/module/electronic-menu/item/ElectronicMenuGridItem.vue';
// --------------------------------------------------------------------------------
import sellOut from 'src/assets/image/sell-out.png';
// ================================================================================

export default defineComponent({
  components: {
    ElectronicMenuGridItem
  },
  setup(){
    // ------------------------------------------------------------------------------
    // * Vue
    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // * Interface
    // ------------------------------------------------------------------------------
    interface MenuInputData {
      title: string;

      logoEnglish: string;
      logoChinese: string;

      paddingLeft: number;
      paddingRight: number;
      paddingTop: number;
      paddingBottom: number;
      paddingVertical: number;
      paddingHorizontal: number;

      showInfoFirst: boolean;
      showInfoInner: boolean;
      showHintGroup: boolean;
      showHintData: boolean;
    }
    // ------------------------------------------------------------------------------
    // * Constant
    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // * Option
    // ------------------------------------------------------------------------------
    const screenList = ref<Screen[]>(SCREEN_LIST);
    // ------------------------------------------------------------------------------
    // * Component
    // ------------------------------------------------------------------------------
    const elementDivElectronMenu = ref<HTMLDivElement>(undefined as unknown as HTMLDivElement);
    // ------------------------------------------------------------------------------
    // * Parameter
    // ------------------------------------------------------------------------------
    const outputLoading = ref<boolean>(false);
    // ------------------------------------------------------------------------------
    const menuInputData = ref<MenuInputData>({
      title: '嘉兴•蔚蓝档案 Only',

      logoEnglish: 'MoroWorks',
      logoChinese: '兔萌社',

      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 6,
      paddingBottom: 4,
      paddingVertical: 0,
      paddingHorizontal: 0,

      showInfoFirst: true,
      showInfoInner: false,
      showHintGroup: true,
      showHintData: false,
    })
    // ------------------------------------------------------------------------------
    const isFullScreen = ref<boolean>(document.fullscreenElement !== null);
    // ------------------------------------------------------------------------------
    const electronMenuExcel = ref<ElectronMenuExcel>();
    const imageRecord = ref<Record<number, string>>({});
    // ------------------------------------------------------------------------------
    const screenSelect = ref<ScreenKey>(SCREEN_LIST[0].key);
    // ------------------------------------------------------------------------------
    const dialogShow = ref<boolean>(false);
    const groupSelect = ref<Group>(undefined as unknown as Group);
    const dataSelect = ref<Data>(undefined as unknown as Data);
    // ------------------------------------------------------------------------------
    // * Lifecycle
    // ------------------------------------------------------------------------------
    function _refreshElectronMenuExcel(){
      electronMenuExcel.value = undefined;
      imageRecord.value = {};
    }
    // ------------------------------------------------------------------------------
    // * Emit
    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // * Function
    // ------------------------------------------------------------------------------
    //# region FileDrop
    // ------------------------------------------------------------------------------
    async function onExcelConfigDrop(file: File){
      const arrayBuffer = await HtmlUtil.readBlob(file, 'ArrayBuffer');
      if (arrayBuffer){
        const workbook = await ExcelUtil.arrayBufferToExcelJSWorkbook(arrayBuffer);
        electronMenuExcel.value = ElectronMenuUtil.importElectronMenuExcel(workbook);
        console.log(electronMenuExcel.value);
        imageRecord.value = {};
        const sellOutImage = await HtmlUtil.imageSrcToImage(sellOut);
        for(const data of electronMenuExcel.value.data){
          if(data.image) {
            if(data.storage && data.storage > 0){
              imageRecord.value[data.id as number] = ElectronMenuUtil.getNormalImageSrc(data.image as ArrayBuffer);
            } else {
              imageRecord.value[data.id as number] = await ElectronMenuUtil.getSelloutImageSrc(data.image as ArrayBuffer, sellOutImage);
            }
          }
        }
      }
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------
    //# region Button Events
    // ------------------------------------------------------------------------------
    function removeElectronMenuExcel(){
      _refreshElectronMenuExcel();
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------
    //# region FullScreen
    // ------------------------------------------------------------------------------
    async function requestFullScreen(element: HTMLDivElement) {
      if(document.fullscreenElement !== null) {
        await document.exitFullscreen();
      } else {
        await element.requestFullscreen();
      }
      isFullScreen.value = document.fullscreenElement !== null;
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------
    //# region Output
    // ------------------------------------------------------------------------------
    async function exportDefaultExcel () {
      outputLoading.value = true;
      const workbook = ElectronMenuUtil.exportElectronMenuExcel(EXAMPLE_ELECTRON_MENU_EXCEL);
      const excelBlob = await ExcelUtil.excelJSWorkbookToBlob(workbook);
      HtmlUtil.downloadBlob('example.xlsx', excelBlob);
      outputLoading.value = false;
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------
    //# region Dialog
    // ------------------------------------------------------------------------------
    function setGroupDialog(group: Group) {
      dialogShow.value = true;
      groupSelect.value = group;
      dataSelect.value = undefined as unknown as Data;
    }

    function setDataDialog(data: Data) {
      dialogShow.value = true;
      groupSelect.value = undefined as unknown as Group;
      dataSelect.value = data;
    }

    function closeDialog() {
      dialogShow.value = false;
      groupSelect.value = undefined as unknown as Group;
      dataSelect.value = undefined as unknown as Data;
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
      screenList,
      // ------------------------------------------------------------------------------
      // * Component
      // ------------------------------------------------------------------------------
      elementDivElectronMenu,
      // ------------------------------------------------------------------------------
      // * Parameter
      // ------------------------------------------------------------------------------
      outputLoading,
      // ------------------------------------------------------------------------------
      menuInputData,
      // ------------------------------------------------------------------------------
      isFullScreen,
      // ------------------------------------------------------------------------------
      electronMenuExcel,
      imageRecord,
      // ------------------------------------------------------------------------------
      screenSelect,
      // ------------------------------------------------------------------------------
      dialogShow,
      groupSelect,
      dataSelect,
      // ------------------------------------------------------------------------------
      // * Emit
      // ------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------
      // * Function
      // ------------------------------------------------------------------------------
      onExcelConfigDrop,
      // ------------------------------------------------------------------------------
      removeElectronMenuExcel,
      // ------------------------------------------------------------------------------
      requestFullScreen,
      // ------------------------------------------------------------------------------
      exportDefaultExcel,
      // ------------------------------------------------------------------------------
      setGroupDialog,
      setDataDialog,
      closeDialog,
    }
  }
});
