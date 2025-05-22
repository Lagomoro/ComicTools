// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import { defineComponent, ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
// --------------------------------------------------------------------------------
import Randomizer from 'src/scripts/module/randomizer/object/Randomizer';
import { RandomAlgorithm } from 'src/scripts/module/randomizer/interface/common';
import RandomizerUtil from 'src/scripts/module/randomizer/util/RandomizerUtil';
// ================================================================================

export default defineComponent({
  setup(){
    // ------------------------------------------------------------------------------
    // * Vue
    // ------------------------------------------------------------------------------
    onMounted(() => {
      window.addEventListener('resize', _resizeListener);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', _resizeListener);
    });
    // ------------------------------------------------------------------------------
    // * Interface
    // ------------------------------------------------------------------------------
    interface ConfigRandom {
      lock: boolean;
      manual: boolean;
      title: string;
      min: string;
      max: string;
      count: string;
      allowRepeated: boolean;
      algorithm: boolean;
    }

    interface ConfigLottery {
      lock: boolean;
      manual: boolean;
      title: string;
      dataArray: string;
      ignoreArray: string;
      count: string;
      algorithm: boolean;
      autoMin: string;
      autoMax: string;
    }
    // ------------------------------------------------------------------------------
    // * Constant
    // ------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------
    // * Option
    // ------------------------------------------------------------------------------
    const disableAutoRandom = computed(() => randomizerRandom.value.isBusy || (randomizerRandom.value.isEmpty && configRandom.value.lock));
    const disableManualRandom = computed(() => (randomizerRandom.value.isBusy && !randomizerRandom.value.allowStop) || (randomizerRandom.value.isEmpty && configRandom.value.lock));
    const disableResetRandom = computed(() => randomizerRandom.value.isBusy || !configRandom.value.lock );
    // ------------------------------------------------------------------------------
    const disableAutoLottery = computed(() => randomizerLottery.value.isBusy || (randomizerLottery.value.isEmpty && configLottery.value.lock) );
    const disableManualLottery = computed(() => (randomizerLottery.value.isBusy && !randomizerLottery.value.allowStop) || (randomizerLottery.value.isEmpty && configLottery.value.lock));
    const disableResetLottery = computed(() => randomizerLottery.value.isBusy || !configLottery.value.lock );
    // ------------------------------------------------------------------------------
    // * Component
    // ------------------------------------------------------------------------------
    const elementDivRandom = ref<HTMLDivElement>(undefined as unknown as HTMLDivElement);
    const elementTextRandom = ref<HTMLDivElement>(undefined as unknown as HTMLDivElement);
    const elementAutoRandom = ref<HTMLDivElement>(undefined as unknown as HTMLDivElement);
    // ------------------------------------------------------------------------------
    const elementDivLottery = ref<HTMLDivElement>(undefined as unknown as HTMLDivElement);
    const elementTextLottery = ref<HTMLDivElement>(undefined as unknown as HTMLDivElement);
    const elementAutoLottery = ref<HTMLDivElement>(undefined as unknown as HTMLDivElement);
    // ------------------------------------------------------------------------------
    // * Parameter
    // ------------------------------------------------------------------------------
    const currentTab = ref<string>('random');
    // ------------------------------------------------------------------------------
    const configRandom = ref<ConfigRandom>({
      lock: false,
      manual: false,
      title: '',
      min: '',
      max: '',
      count: '',
      allowRepeated: false,
      algorithm: true
    });

    const configLottery = ref<ConfigLottery>({
      lock: false,
      manual: false,
      title: '',
      dataArray: '',
      ignoreArray: '',
      count: '',
      algorithm: true,
      autoMin: '',
      autoMax: ''
    });
    // ------------------------------------------------------------------------------
    const randomizerRandom = ref<Randomizer>(new Randomizer());
    const randomizerLottery = ref<Randomizer>(new Randomizer());
    // ------------------------------------------------------------------------------
    watch(() => randomizerRandom.value.currentValue, () => _watchAutoFontSize(elementDivRandom.value, elementAutoRandom.value, elementTextRandom.value, 120));
    watch(() => randomizerLottery.value.currentValue, () => _watchAutoFontSize(elementDivLottery.value, elementAutoLottery.value, elementTextLottery.value, 120));
    // ------------------------------------------------------------------------------
    // * Lifecycle
    // ------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------
    // * Listener
    // ------------------------------------------------------------------------------
    function _resizeListener (){
      _watchAutoFontSize(elementDivRandom.value, elementAutoRandom.value, elementTextRandom.value, 120);
      _watchAutoFontSize(elementDivLottery.value, elementAutoLottery.value, elementTextLottery.value, 120);
    }
    // ------------------------------------------------------------------------------
    // * Emit
    // ------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------
    // * Function
    // ------------------------------------------------------------------------------
    //# region H5 Events
    // ------------------------------------------------------------------------------
    function _watchAutoFontSize(div: HTMLDivElement, auto: HTMLDivElement, text: HTMLDivElement, value: number) {
      if(div && auto && text && value > 0) {
        for (let i = value; i > 0; i--) {
          auto.style.fontSize = i + 'px';
          if (auto.offsetHeight <= div.offsetHeight) {
            text.style.fontSize = i + 'px';
            break;
          }
        }
      }
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------
    //# region Random Events
    // ------------------------------------------------------------------------------
    async function _lockRandom() {
      if(!configRandom.value.lock) {
        configRandom.value.lock = true;
        randomizerRandom.value.initialize({
          dataArray: RandomizerUtil.getIndexStringArray(parseInt(configRandom.value.min || '0'), parseInt(configRandom.value.max || '1')),
          ignoreArray: [],
          allowRepeated: configRandom.value.allowRepeated,
          algorithm: configRandom.value.algorithm ? RandomAlgorithm.RandomOrg : RandomAlgorithm.Math,
        });
      }
    }

    async function _unlockRandom() {
      if (configRandom.value.lock) {
        randomizerRandom.value.clear();
        configRandom.value.lock = false;
      }
      await nextTick();
      elementTextRandom.value.style.fontSize = '120px';
    }
    // ------------------------------------------------------------------------------
    async function autoRandom() {
      await _lockRandom();
      await randomizerRandom.value.startPushValue(parseInt(configRandom.value.count || '1'), true);
    }

    async function manualRandom() {
      await _lockRandom();
      if(randomizerRandom.value.allowStop){
        randomizerRandom.value.stopPushValue();
      } else {
        await randomizerRandom.value.startPushValue(parseInt(configRandom.value.count || '1'), false);
      }
    }

    async function resetRandom() {
      await _unlockRandom();
    }
    // ------------------------------------------------------------------------------
    async function updateAlgorithmRandom() {
      randomizerRandom.value.setAlgorithm(configRandom.value.algorithm ? RandomAlgorithm.RandomOrg : RandomAlgorithm.Math);
    }
    // ------------------------------------------------------------------------------
    //# endregion
    // ------------------------------------------------------------------------------
    //# region Lottery Events
    // ------------------------------------------------------------------------------
    async function _lockLottery() {
      if(!configLottery.value.lock) {
        configLottery.value.lock = true;
        randomizerLottery.value.initialize({
          dataArray: RandomizerUtil.getTextArray(configLottery.value.dataArray || '1 2 3 4', ' '),
          ignoreArray: RandomizerUtil.getTextArray(configLottery.value.ignoreArray || '', ' '),
          allowRepeated: false,
          algorithm: configLottery.value.algorithm ? RandomAlgorithm.RandomOrg : RandomAlgorithm.Math,
        });
      }
    }

    async function _unlockLottery() {
      if (configLottery.value.lock) {
        randomizerLottery.value.clear();
        configLottery.value.lock = false;
      }
      await nextTick();
      elementTextLottery.value.style.fontSize = '120px';
    }
    // ------------------------------------------------------------------------------
    async function autoLottery() {
      await _lockLottery();
      await randomizerLottery.value.startPushValue(parseInt(configLottery.value.count || '1'), true);
    }

    async function manualLottery() {
      await _lockLottery();
      if(randomizerLottery.value.allowStop){
        randomizerLottery.value.stopPushValue();
      } else {
        await randomizerLottery.value.startPushValue(parseInt(configLottery.value.count || '1'), false);
      }
    }

    async function resetLottery() {
      await _unlockLottery();
    }
    // ------------------------------------------------------------------------------
    async function updateIgnoreArrayLottery() {
      randomizerLottery.value.setIgnoreArray(RandomizerUtil.getTextArray(configLottery.value.ignoreArray || '', ' '));
    }

    async function updateAlgorithmLottery() {
      randomizerLottery.value.setAlgorithm(configLottery.value.algorithm ? RandomAlgorithm.RandomOrg : RandomAlgorithm.Math);
    }
    // ------------------------------------------------------------------------------
    function autoFillLottery() {
      configLottery.value.dataArray = RandomizerUtil.getIndexStringArray(parseInt(configLottery.value.autoMin || '0'), parseInt(configLottery.value.autoMax || '1')).join(' ');
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
      disableAutoRandom,
      disableManualRandom,
      disableResetRandom,
      // ------------------------------------------------------------------------------
      disableAutoLottery,
      disableManualLottery,
      disableResetLottery,
      // ------------------------------------------------------------------------------
      // * Component
      // ------------------------------------------------------------------------------
      elementDivRandom,
      elementTextRandom,
      elementAutoRandom,
      // ------------------------------------------------------------------------------
      elementDivLottery,
      elementTextLottery,
      elementAutoLottery,
      // ------------------------------------------------------------------------------
      // * Parameter
      // ------------------------------------------------------------------------------
      currentTab,
      // ------------------------------------------------------------------------------
      configRandom,
      configLottery,
      // ------------------------------------------------------------------------------
      randomizerRandom,
      randomizerLottery,
      // ------------------------------------------------------------------------------
      // * Emit
      // ------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------
      // * Function
      // ------------------------------------------------------------------------------
      autoRandom,
      manualRandom,
      resetRandom,
      updateAlgorithmRandom,
      // ------------------------------------------------------------------------------
      autoLottery,
      manualLottery,
      resetLottery,
      updateIgnoreArrayLottery,
      updateAlgorithmLottery,
      autoFillLottery,
    }

  },
});
