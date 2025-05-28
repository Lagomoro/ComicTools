// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------

// ================================================================================

// ================================================================================
//# region ObjectUtil
// --------------------------------------------------------------------------------
export class ObjectUtil{
  // ------------------------------------------------------------------------------
  // * Function
  // ------------------------------------------------------------------------------
  //# region toString
  // ------------------------------------------------------------------------------
  public static toString(object: any, replacer?: (key: string, value: any) => any, space?: number): string {
    const set = new WeakSet();
    return JSON.stringify(object, (key: string, value: any) => {
      if (value instanceof Function) {
        return;
      } else if (value instanceof Object) {
        if (set.has(value)) {
          return;
        }
        set.add(value);
      } else if (replacer) {
        const result = replacer(key, value);
        if(result !== undefined){
          return result;
        }
      }
      return value;
    }, space);
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region Copy
  // ------------------------------------------------------------------------------
  public static deepCopy<T>(object: T): T{
    return JSON.parse(this.toString(object));
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region Map
  // ------------------------------------------------------------------------------
  public static map<K extends keyof any, T, V> (record: Record<K, T>, callbackFunction: (value: T, key: K, map: Record<K, T>) => V): Record<K, V> {
    const output: Record<K, V> = {} as Record<K, V>;
    for(const key in record){
      output[key] = callbackFunction(record[key], key, record);
    }
    return output;
  };

  public static mapArray<K extends keyof any, T, V> (record: Record<K, T>, callbackFunction: (value: T, key: K, map: Record<K, T>) => V): V[] {
    const output: V[] = [];
    for(const key in record){
      output.push(callbackFunction(record[key], key, record));
    }
    return output;
  };

  public static filter<K extends keyof any, T> (record: Record<K, T>, callbackFunction: (value: T, key: K, map: Record<K, T>) => boolean): Record<K, T> {
    const output: Record<K, T> = {} as Record<K, T>;
    for(const key in record){
      if(callbackFunction(record[key], key, record)){
        output[key] = record[key];
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
export default ObjectUtil;
// ================================================================================
