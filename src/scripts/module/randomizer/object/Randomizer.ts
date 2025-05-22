// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import ObjectUtil from 'src/scripts/util/ObjectUtil';
// --------------------------------------------------------------------------------
import { RandomAlgorithm, RandomizerConfig } from 'src/scripts/module/randomizer/interface/common';
import RandomizerUtil from 'src/scripts/module/randomizer/util/RandomizerUtil';
// ================================================================================

// ================================================================================
//# region RandomizerBase
// --------------------------------------------------------------------------------
export class Randomizer {
  // ------------------------------------------------------------------------------
  // * Property
  // ------------------------------------------------------------------------------
  private _config: RandomizerConfig;
  // ------------------------------------------------------------------------------
  private _storage: string[];
  private _ignore: string[];
  private _result: string[];
  // ------------------------------------------------------------------------------
  private _currentValue: string[];
  // ------------------------------------------------------------------------------
  private _interval: NodeJS.Timeout | undefined;
  private _tempIndexArray: number[];
  private _isBusy: boolean;
  private _allowStop: boolean;
  private _requestCount: number;
  private _requestMax: number;
  private _interruptTag: boolean;
  private _dataUpdatedTag: boolean;
  // ------------------------------------------------------------------------------
  // * Getter & Setter
  // ------------------------------------------------------------------------------
  public get storage(): string[] {
    return this._storage;
  };

  public get ignore(): string[] {
    return this._storage;
  };

  public get result(): string[] {
    return this._result;
  };
  // ------------------------------------------------------------------------------
  public get currentValue(): string[] {
    return this._currentValue;
  };
  // ------------------------------------------------------------------------------
  public get isBusy(): boolean {
    return this._isBusy;
  };

  public get allowStop(): boolean {
    return this._allowStop;
  };

  public get requestCount(): number {
    return this._requestCount;
  };

  public get requestMax(): number {
    return this._requestMax;
  };
  // ------------------------------------------------------------------------------
  public get isEmpty(): boolean {
    return this._storage.length === 0;
  };
  // ------------------------------------------------------------------------------
  // * Constructor
  // ------------------------------------------------------------------------------
  public constructor() {
    this._config = {
      dataArray: [],
      ignoreArray: [],
      allowRepeated: false,
      algorithm: RandomAlgorithm.Math,
    };

    this._storage = [];
    this._ignore = [];
    this._result = [];

    this._currentValue = [];

    this._requestCount = 0;
    this._requestMax = 1;

    this._interval = undefined;
    this._tempIndexArray = [];
    this._isBusy = false;
    this._allowStop = false;
    this._interruptTag = false;
    this._dataUpdatedTag = false;
  };
  // ------------------------------------------------------------------------------
  // * Lifecycle
  // ------------------------------------------------------------------------------
  public initialize(config: RandomizerConfig) {
    this._config = config;
    this.clear();
  }
  // ------------------------------------------------------------------------------
  public clear(){
    this._storage = ObjectUtil.deepCopy(this._config.dataArray);
    this._ignore = [];
    this._result = [];
    this._translateStorage();

    this._currentValue = [];

    this._requestCount = 0;
    this._requestMax = 1;

    this._clearTemp();
  };

  private _clearTemp(){
    this._clearInterval();
    this._tempIndexArray = [];
    this._isBusy = false;
    this._allowStop = false;
    this._interruptTag = false;
    this._dataUpdatedTag = false;
  };
  // ------------------------------------------------------------------------------
  // * Function
  // ------------------------------------------------------------------------------
  //# region Set
  // ------------------------------------------------------------------------------
  public setIgnoreArray(ignoreArray: string[]){
    this._config.ignoreArray = ignoreArray;
    this._translateStorage();
  };

  public setAlgorithm(algorithm: RandomAlgorithm){
    this._config.algorithm = algorithm;
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region Temp
  // ------------------------------------------------------------------------------
  private _translateStorage() {
    const storage = [];
    const ignore = [];
    storage.push(...this._storage);
    storage.push(...this._ignore);
    for(let i = storage.length - 1; i >= 0; i--){
      if(this._config.ignoreArray.includes(storage[i])){
        ignore.push(...storage.splice(i, 1));
      }
    }
    this._storage = storage;
    this._ignore = ignore;
  };
  // ------------------------------------------------------------------------------
  private _clearInterval(){
    if(this._interval){
      clearInterval(this._interval);
      this._interval = undefined;
    }
  };

  private _setInterval(callback: () => Promise<void>, timeout: number){
    this._clearInterval();
    this._interval = setInterval(callback, timeout);
  };

  private _buildCurrentValueInterval(callback: (storage: string[]) => Promise<string[]>){
    const storage = ObjectUtil.deepCopy(this._storage);
    return async () => { this._currentValue = await callback(storage) };
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region Push
  // ------------------------------------------------------------------------------
  public async startPushValue(count: number, autoStop: boolean = false) {
    if(!this._isBusy){
      if(this._storage.length > 0) {
        this._requestCount = 0;
        this._requestMax = this._config.allowRepeated ? count : Math.min(count, this._storage.length);

        this._isBusy = true;
        this._allowStop = !autoStop;
        this._interruptTag = false;
        this._dataUpdatedTag = false;

        this._setInterval(this._buildCurrentValueInterval(async (storage: string[]) => {
          const output = [];
          const storageTemp = ObjectUtil.deepCopy(storage);
          for(let i = 0; i < count; i++){
            const indexArray = await RandomizerUtil.requestRandomRangeArray(0, storageTemp.length - 1, 1, RandomAlgorithm.Math);
            if(indexArray.length > 0){
              const index = indexArray[0];
              if(this._config.allowRepeated){
                output.push(storageTemp[index]);
              } else {
                output.push(...storageTemp.splice(index, 1));
              }
            }
          }
          return output;
        }), 10);

        this._tempIndexArray = [];
        const tempIndexArray = RandomizerUtil.getIndexArray(0, this._storage.length - 1);
        for(let i = 0; i < count; i++){
          const indexArray = await RandomizerUtil.requestRandomRangeArray(0, tempIndexArray.length - 1, 1, this._config.algorithm);
          if(indexArray.length > 0){
            const index = indexArray[0];
            if(this._config.allowRepeated){
              this._requestCount++;
              this._tempIndexArray.push(tempIndexArray[index]);
            } else {
              this._requestCount++;
              this._tempIndexArray.push(...tempIndexArray.splice(index, 1));
            }
          }
        }

        this._dataUpdatedTag = true;

        if(autoStop || this._interruptTag){
          this.stopPushValue();
        }
      }
    }
  };

  public stopPushValue() {
    if(this._isBusy){
      if(this._dataUpdatedTag) {
        const value = [];
        const sortedIndexArray = this._tempIndexArray.map((value, index) => ({ value, index })).sort((a, b) => a.value - b.value);
        for(let i = 0; i < sortedIndexArray.length; i++){
          value.push('');
        }
        for(let i = sortedIndexArray.length - 1; i >= 0; i--){
          const sortedIndex = sortedIndexArray[i];
          if(this._config.allowRepeated){
            value[sortedIndex.index] = this._storage[sortedIndex.value];
          } else {
            value[sortedIndex.index] = this._storage.splice(sortedIndex.value, 1)[0];
          }
        }
        this._currentValue = value;
        this._result.push(...value);

        this._clearTemp();
      } else {
        this._allowStop = false;
        this._interruptTag = true;
      }
    }
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region Request
  // ------------------------------------------------------------------------------
  public async requestRandomInt(max: number){
    return await this.requestRandomRange(0, max);
  };

  public async requestRandomRange(min: number, max: number){
    return (await this.requestRandomRangeArray(min, max, 1))[0];
  };

  public async requestRandomRangeArray(min: number, max: number, count: number) {
    return await RandomizerUtil.requestRandomRangeArray(min, max, count, this._config.algorithm);
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
export default Randomizer;
// ================================================================================
