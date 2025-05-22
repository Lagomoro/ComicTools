// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import axios from 'axios';
import qs from 'qs';
// --------------------------------------------------------------------------------
import { RandomAlgorithm } from 'src/scripts/module/randomizer/interface/common';
// ================================================================================

// ================================================================================
//# region RandomizerUtil
// --------------------------------------------------------------------------------
export class RandomizerUtil {
  // ------------------------------------------------------------------------------
  // * Function
  // ------------------------------------------------------------------------------
  //# region Array
  // ------------------------------------------------------------------------------
  public static getTextArray(input: string, separator: string): string[] {
    return (input || '').replace(/\n/g, separator).replace(/\r/g, separator).split(separator).filter(p => p !== '')
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region IndexArray
  // ------------------------------------------------------------------------------
  public static getIndexArray(min: number, max: number): number[] {
    const output = [];
    for(let i = min; i <= max; i++){
      output.push(i);
    }
    return output;
  };

  public static getIndexStringArray(min: number, max: number): string[] {
    const output = [];
    for(let i = min; i <= max; i++){
      output.push(i.toString());
    }
    return output;
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region Algorithm
  // ------------------------------------------------------------------------------
  public static async requestRandomRangeArray(min: number, max: number, count: number, algorithm: RandomAlgorithm) {
    const output = [];

    if(min === max) {
      for (let i = 0 ; i < count; i++){
        output.push(min);
      }
    }
    if(min < max) {
      switch (algorithm) {
        case RandomAlgorithm.Math:
          for(let i = 0; i < count; i++){
            output.push(Math.floor(Math.random() * (max + 1 - min)) + min);
          }
          break;
        case RandomAlgorithm.RandomOrg:
          await new Promise<void>((resolve) => {
            const data = { min, max, num: count, col: 1, base: 10, format: 'plain', rnd: 'new' };
            axios.get('https://www.random.org/integers/?' + qs.stringify(data)).then(response => {
              const dataArray = String(response.data).split('\n');
              for(let i = 0; i < dataArray.length; i++){
                if(dataArray[i] !== ''){
                  output.push(Number(dataArray[i]));
                }
              }
              resolve();
            }).catch(error => {
              console.log(error);
              resolve();
            });
          });
          break;
      }
    }

    return output;
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
export default RandomizerUtil;
// ================================================================================
