// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import { defineComponent, nextTick, ref } from 'vue';
import { QDialog } from 'quasar';
import HtmlUtil from 'src/scripts/util/HtmlUtil';
import ExcelUtil from 'src/scripts/util/ExcelUtil';
import {
  ElectronMenuExcel,
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
import ElectronicMenuTitlePart from 'pages/module/electronic-menu/part/ElectronicMenuTitlePart.vue';
import ElectronicMenuDescriptionPart from 'pages/module/electronic-menu/part/ElectronicMenuDescriptionPart.vue';
import ElectronicMenuInfoPart from 'pages/module/electronic-menu/part/ElectronicMenuInfoPart.vue';
import ElectronicMenuHintPart from 'pages/module/electronic-menu/part/ElectronicMenuHintPart.vue';
// --------------------------------------------------------------------------------
import sellOut from 'src/assets/image/sell-out.png';
// ================================================================================

export default defineComponent({
  components: {
    ElectronicMenuGridItem,

    ElectronicMenuTitlePart,
    ElectronicMenuDescriptionPart,
    ElectronicMenuInfoPart,
    ElectronicMenuHintPart,
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

      showDescGroup: boolean;
      showDescData: boolean;
      showInfoGroup: boolean;
      showInfoData: boolean;
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
    const dialogScale = ref<number>(1.5);
    // ------------------------------------------------------------------------------
    // * Component
    // ------------------------------------------------------------------------------
    const elementDivElectronMenu = ref<HTMLDivElement>(undefined as unknown as HTMLDivElement);
    const dialogElectronMenu = ref<QDialog>(undefined as unknown as QDialog);
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

      showDescGroup: true,
      showDescData: true,
      showInfoGroup: true,
      showInfoData: true,
      showHintGroup: false,
      showHintData: false,
    })
    // ------------------------------------------------------------------------------
    const isFullScreen = ref<boolean>(document.fullscreenElement !== null);
    // ------------------------------------------------------------------------------
    const electronMenuExcel = ref<ElectronMenuExcel>();
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
    }
    // ------------------------------------------------------------------------------
    // * Listener
    // ------------------------------------------------------------------------------

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
        const sellOutImage = await HtmlUtil.imageSrcToImage(sellOut);
        for(const data of electronMenuExcel.value.data){
          if(data.image) {
            if(data.storage <= 0){
              data.imageSrc = await ElectronMenuUtil.getSelloutImageSrc(data.image as ArrayBuffer, sellOutImage);
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
      const workbook = ElectronMenuUtil.exportElectronMenuExcel(ElectronMenuUtil.getExampleElectronMenuExcel());
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

    async function showDialog() {
      await nextTick();
      const portal = dialogElectronMenu.value.contentEl.parentElement?.parentElement as HTMLDivElement;
      if(portal) {
        elementDivElectronMenu.value.appendChild(portal);
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
      screenList,
      // ------------------------------------------------------------------------------
      dialogScale,
      // ------------------------------------------------------------------------------
      // * Component
      // ------------------------------------------------------------------------------
      elementDivElectronMenu,
      dialogElectronMenu,
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
      showDialog,
    }
  }
});
