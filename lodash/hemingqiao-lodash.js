/*! *****************************************************************************
@author Heming
founded at 2020-12-08 15:01:56
created by WebStorm
description: 简单实现lodash中的一些方法
***************************************************************************** */

var hemingqiao = (function () {

  /** ------------------------------- 以下为辅助工具 ------------------------------- **/

  /**
   * 同值比较算法（sameValueZero algorithm）
   * @param a
   * @param b
   * @return {boolean}
   */
  function sameValueZero(a, b) {
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    return a !== a && b !== b;
  }


  // 类型判断工具
  const typeUtils = {};
  const types = [
    "Boolean", "Number", "String", "Symbol", "Arguments",
    "Array", "Date", "Null", "Undefined", "Function",
    "RegExp", "Object", "Error", "BigInt", "ArrayBuffer",
    "Map", "Set", "WeakMap", "WeakSet",
  ];
  const TypedArrays = [
    "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array",
    "Uint16Array", "Int32Array", "Uint32Array", "Float32Array",
    "Float64Array",
  ];

  types.forEach(type => {
    typeUtils["is" + type] = function (obj) {
      return Object.prototype.toString.call(obj) === "[object " + type + "]";
    };
  });


  /**
   * 包装iteratee
   * @param iteratee
   * @return {(function(*): *)|*}
   */
  function transform(iteratee) {
    if (typeUtils.isString(iteratee)) {
      let splited = iteratee.split(".");
      if (splited.length === 1) {
        return val => val[iteratee];
      }
      // return val => {
      //   let ret = val;
      //   for (let prop of splited) {
      //     ret = ret[prop];
      //   }
      //   return ret;
      // }
      // 简洁是简洁了，不过不好做错误处理
      return val => splited.reduce((ret, cur) => ret[cur], val);
    }
    if (typeUtils.isFunction(iteratee)) {
      return iteratee;
    }
    if (typeUtils.isNull(iteratee) || typeUtils.isUndefined(iteratee)) {
      return val => val;
    }

    if (typeUtils.isObject(iteratee)) {
      // return iterateeEqual(iteratee);
      // return deepEqual.bind(null, iteratee);
      return matches(iteratee);
    } else if (typeUtils.isArray(iteratee)) {
      return function (obj) {
        return obj[iteratee[0]] === iteratee[1];
      }
    } else if (typeUtils.isRegExp(iteratee)) {
      return val => iteratee.test(val);
    }
  }

  // function iterateeEqual(source) {
  //   return function compare(target) {
  //     return deepEqual(source, target);
  //   }
  // }


  // 使用下面定义的partialDeepEqual替代
  // /**
  //  * 简单实现深比较
  //  * @param a
  //  * @param b
  //  * @return {boolean}
  //  */
  // function deepEqual(a, b) {
  //   const keysA = Reflect.ownKeys(a);
  //   const keysB = Reflect.ownKeys(b);
  //
  //   if (keysA.length > keysB.length) {
  //     return false;
  //   }
  //   for (let key of keysA) {
  //     if (!keysB.includes(key)) {
  //       return false;
  //     }
  //   }
  //   for (let key of keysA) {
  //     let val = a[key];
  //     if (val === null) {
  //       if (b[key] !== val) {
  //         return false;
  //       }
  //     } else if (typeof val === "object") {
  //       if (typeof b[key] !== "object") {
  //         return false;
  //       }
  //       if (!deepEqual(val, b[key])) {
  //         return false;
  //       }
  //     } else {
  //       if (val !== b[key]) {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // }

  /** ------------------------------- 以上为辅助工具 ------------------------------- **/


  return {
    chunk,
    compact,
    concat,
    difference,
    differenceBy,
    differenceWith,
    join,
    last,
    indexOf,
    lastIndexOf,
    drop,
    dropRight,
    dropRightWhile,
    dropWhile,
    fill,
    findIndex,
    findLastIndex,
    flatten,
    flattenDeep,
    flattenDepth,
    fromPairs,
    head,
    initial,
    reverse,
    sortedIndex,
    sortedIndexBy,
    sortedIndexOf,
    sortedLastIndex,
    sortedLastIndexBy,
    sortedLastIndexOf,
    uniq,
    uniqBy,
    uniqWith,
    unzip,
    unzipWith,
    without,
    xor,
    xorBy,
    xorWith,
    zip,
    zipObject,
    zipObjectDeep,
    zipWith,
    countBy,
    sortedUniq,
    sortedUniqBy,
    every,
    filter,
    find,
    findLast,
    flatMap,
    flatMapDeep,
    flatMapDepth,
    forEach,
    forEachRight,
    groupBy,
    includes,
    invokeMap,
    keyBy,
    toArray,
    toFinite,
    toInteger,
    toLength,
    toNumber,
    toSafeInteger,
    add,
    ceil,
    divide,
    floor,
    assign,
    assignIn,
    intersection,
    intersectionBy,
    intersectionWith,
    max,
    maxBy,
    mean,
    meanBy,
    min,
    minBy,
    multiply,
    round,
    subtract,
    sum,
    sumBy,
    clamp,
    inRange,
    random,
    nth,
    pull,
    pullAll,
    pullAllBy,
    pullAllWith,
    tail,
    take,
    takeRight,
    takeRightWhile,
    takeWhile,
    union,
    unionBy,
    unionWith,
    map,
    orderBy,
    partition,
    reduce,
    reduceRight,
    reject,
    sample,
    sampleSize,
    size,
    some,
    sortBy,
    defer,
    delay,
    castArray,
    cloneDeep,
    conformsTo,
    eq,
    gt,
    gte,
    lt,
    lte,
    isEqual,
    isArguments,
    isArray,
    isArrayLike,
    isArrayLikeObject,
    isBoolean,
    isDate,
    isElement,
    isArrayBuffer,
    isError,
    isRegExp,
    isEmpty,
    isFinite,
    isFunction,
    isInteger,
    isLength,
    isMap,
    isMatch,
    matches,
    isNaN,
    isNil,
    isNull,
    isNumber,
    isObject,
    isObjectLike,
    isPlainObject,
    isSafeInteger,
    isSet,
    isString,
    isSymbol,
    isTypedArray,
    isUndefined,
    isWeakMap,
    isWeakSet,
    curry,

  };


  /** ------------------------------- 以下为具体实现 ------------------------------- **/


  /**
   * Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
   * @param {number[]} arr
   * @param size
   * @return {[]}
   */
  function chunk(arr, size = 1) {
    let res = [];
    if (size <= 0 || arr == undefined || arr.length === 0) return res;
    let len = arr.length;
    if (size > len) {
      res.push(arr);
      return res;
    }
    // 还可以使用splice
    let j = 0;
    let temp = [];
    for (let i = 0; i < len; i++) {
      if (j++ < size) {
        temp.push(arr[i]);
      } else {
        res.push(temp);
        j = 0;
        temp = [arr[i]];
        j++;
      }
    }
    res.push(temp);

    return res;
  }


  /**
   * Creates an array with all falsy values removed. The values false, null, 0, "", undefined, and NaN are falsy.
   * @param {number[]} arr
   * @return {[]}
   */
  function compact(arr) {
    let res = [];
    for (let e of arr) {
      if (e) res.push(e);
    }
    return res;
  }


  /**
   * Creates a new array concatenating array with any additional arrays and/or values.
   * @param {number[]} arr
   * @param args
   * @return {*}
   */
  function concat(arr, ...args) {
    const res = arr.slice();
    for (let arg of args) {
      // 只拉平一层
      if (Array.isArray(arg)) {
        for (let e of arg) {
          res.push(e);
        }
      } else {
        res.push(arg);
      }
    }
    return res;
  }


  // 返回给定数组array和传入的数组之间的差集(a - b)。
  // 一般地，记A和B是两个集合，则所有属于A且不属于B的元素构成的集合,叫做集合A和集合B的差集。
  /**
   * 创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中。该方法使用 SameValueZero做相等比较。结果值的顺序是由第一个数组中的顺序确定。
   * @param {number[]} array
   * @param values
   */
  function difference(array, ...values) {
    const res = [];

    values.forEach(value => {
      if (!Array.isArray(value)) {
        throw new TypeError("argument should be an array");
      }
    });
    const total = concat([], ...values);
    for (let e of array) {
      if (!total.includes(e)) {
        res.push(e);
      }
    }
    return res;
  }


  /**
   * see official document
   * @param array
   * @param values
   * @param iteratee
   * @return {any[]}
   */
  function differenceBy(array, values, iteratee) {
    let args = Array.from(arguments);
    args.shift();
    let last = args[args.length - 1];
    if (Array.isArray(last) || last === undefined) {
      return difference(array, ...args);
    }

    iteratee = args.pop();
    iteratee = transform(iteratee);
    let copy = array.slice();
    let mapped = array.map(value => iteratee(value));
    args = args.map(value => value.map(value1 => iteratee(value1)));
    let res = difference(mapped, ...args);

    let ret = [];
    for (let e of copy) {
      if (res.includes(iteratee(e))) ret.push(e);
    }
    return ret;
  }


  /**
   * 这个方法类似 _.difference ，除了它接受一个 comparator，它调用比较array，values中的元素。 结果值是从第一数组中选择。comparator 调用参数有两个：(arrVal, othVal)。
   * @param arr
   * @param values
   * @param comparator
   * @return {[]}
   */
  function differenceWith(arr, values, comparator) {
    let res = [];
    for (let e of arr) {
      for (let v of values) {
        if (!comparator(e, v)) res.push(e);
      }
    }
    return res;
  }


  /**
   * 将 array 中的所有元素转换为由 separator 分隔的字符串。
   * @param arr
   * @param separator
   * @return {string}
   */
  function join(arr, separator) {
    let res = "";
    if (arr.length === 0) return res;
    separator = String(separator);
    for (let i = 0; i < arr.length - 1; i++) {
      res = res + arr[i] + separator;
    }
    res += arr[arr.length - 1];
    return res;
  }


  /**
   * 获取array中的最后一个元素。
   * @param {number[]} arr
   * @return {*}
   */
  function last(arr) {
    let res;
    if (arr.length) res = arr[arr.length - 1];
    return res;
  }


  /**
   * 使用 SameValueZero 等值比较，返回首次 value 在数组array中被找到的 索引值， 如果 fromIndex 为负值，将从数组array尾端索引进行匹配。
   * @param {number[]} arr
   * @param {number} val
   * @param {number} fromIdx
   * @return {number|*}
   */
  function indexOf(arr, val, fromIdx = 0) {
    let len = arr.length;
    if (!len) return -1;
    if (fromIdx < 0) {
      fromIdx = len + fromIdx;
    }
    for (let i = fromIdx < 0 ? 0 : fromIdx; i < len; i++) {
      if (sameValueZero(val, arr[i])) return i;
    }
    return -1;
  }


  /**
   * 这个方法类似 _.indexOf ，区别是它是从右到左遍历array的元素。
   * @param arr
   * @param val
   * @param fromIdx
   * @return {number}
   */
  function lastIndexOf(arr, val, fromIdx = arr.length - 1) {
    if (!arr.length) return -1;
    if (fromIdx < 0) {
      fromIdx = arr.length + fromIdx;
    }
    for (let i = fromIdx < 0 ? 0 : fromIdx; i >= 0; i--) {
      if (sameValueZero(val, arr[i])) return i;
    }
    return -1;
  }


  /**
   * 创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
   * @param arr
   * @param n
   * @return {[]|*}
   */
  function drop(arr, n = 1) {
    let len = arr.length;
    let res = [];
    if (!len) return res;
    if (n < 0) return arr.slice();
    for (let i = n; i < len; i++) {
      res.push(arr[i]);
    }
    return res;
  }


  /**
   * Creates a slice of array excluding elements dropped from the end. Elements are dropped until predicate returns falsey.
   * The predicate is invoked with three arguments: (value, index, array).
   * @param array
   * @param predicate
   * @return {*}
   */
  function dropRightWhile(array, predicate) {
    predicate = transform(predicate);
    const ret = array.slice();
    for (let i = array.length - 1; i >= 0; i--) {
      if (predicate(array[i])) ret.pop();
      else break;
    }
    return ret;
  }


  /**
   * Creates a slice of array excluding elements dropped from the beginning. Elements are dropped until predicate returns falsey.
   * The predicate is invoked with three arguments: (value, index, array).
   * @param array
   * @param predicate
   * @return {[]}
   */
  function dropWhile(array, predicate) {
    predicate = transform(predicate);
    let i;
    for (i = 0; i < array.length; i++) {
      if (!predicate(array[i])) break;
    }
    return array.slice(i);
  }


  /**
   * 创建一个切片数组，去除array尾部的n个元素。（n默认值为1。）
   * @param arr
   * @param n
   * @return {[]|*}
   */
  function dropRight(arr, n = 1) {
    let len = arr.length;
    let res = [];
    if (!len) return res;
    if (n < 0) return arr.slice();
    for (let i = 0; i < len - n; i++) {
      res.push(arr[i]);
    }
    return res;
  }


  /**
   * 使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）。
   * Note: 这个方法会改变 array
   * @param arr
   * @param val
   * @param start
   * @param end
   * @return {*}
   */
  function fill(arr, val, start = 0, end = arr.length) {
    let len = arr.length;
    if (start >= end) {
      return arr;
    } else {
      start = start < 0 ? start + len : start;
      end = end < 0 ? end + len : end;
      for (let i = start; i < end; i++) {
        if (i < 0) continue;
        if (i >= len) break;
        arr[i] = val;
      }
    }
    return arr;
  }


  /**
   * 该方法类似 _.find，区别是该方法返回第一个通过 predicate 判断为真值的元素的索引值（index），而不是元素本身。
   * @param arr
   * @param predicate
   * @param fromIdx
   * @return {number}
   */
  function findIndex(arr, predicate, fromIdx = 0) {
    predicate = transform(predicate);
    for (let i = fromIdx; i < arr.length; i++) {
      if (predicate(arr[i])) {
        return i;
      }
    }
    return -1;
  }


  /**
   * 这个方式类似 _.findIndex， 区别是它是从右到左的迭代集合array中的元素。
   * @param arr
   * @param predicate
   * @param fromIdx
   * @return {number}
   */
  function findLastIndex(arr, predicate, fromIdx = arr.length - 1) {
    predicate = transform(predicate);
    for (let i = fromIdx; i >= 0; i--) {
      if (predicate(arr[i])) {
        return i;
      }
    }
    return -1;
  }


  /**
   * 减少一级array嵌套深度。
   * @param array
   * @return {*[]}
   */
  function flatten(array) {
    return [].concat(...array);
  }


  /**
   * 将array递归为一维数组。
   * @param array
   * @return {*}
   */
  function flattenDeep(array) {
    return array.reduce((prev, next) => prev.concat(Array.isArray(next) ? flattenDeep(next) : next), []);
  }


  /**
   * 根据 depth 递归减少 array 的嵌套层级
   * @param array
   * @param depth
   * @return {*[]}
   */
  function flattenDepth(array, depth = 1) {
    let res = array.slice();
    while (depth--) {
      res = [].concat(...res);
    }
    return res;
  }


  /**
   * 与 _.toPairs正好相反；这个方法返回一个由键值对pairs构成的对象。
   * @param pairs
   * @return {{}}
   */
  function fromPairs(pairs) {
    let ret = {};
    for (let pair of pairs) {
      const [key, value] = pair;
      ret[key] = value;
    }
    return ret;
  }


  /**
   * 获取数组 array 的第一个元素。
   * @param arr
   * @return {*|undefined}
   */
  function head(arr) {
    return arr.length ? arr[0] : undefined;
  }


  /**
   * 获取数组array中除了最后一个元素之外的所有元素（去除数组array中的最后一个元素）。
   * @param array
   * @return {[]}
   */
  function initial(array) {
    let ret = [];
    for (let i = 0; i < array.length - 1; i++) {
      ret.push(array[i]);
    }
    return ret;
  }


  /**
   * 反转array，使得第一个元素变为最后一个元素，第二个元素变为倒数第二个元素，依次类推。
   * Note: 这个方法会改变原数组 array，基于 Array#reverse.
   * @param array
   * @return {*}
   */
  function reverse(array) {
    let low = 0, high = array.length - 1;
    while (low <= high) {
      let temp = array[low];
      array[low] = array[high];
      array[high] = temp;
      low++;
      high--;
    }
    return array;
  }


  /**
   * Uses a binary search to determine the lowest index at which value should be inserted into array in order to maintain its sort order.
   * @param array
   * @param value
   * @return {number}
   */
  function sortedIndex(array, value) {
    let low = 0, high = array.length; // 插入位置可能是数组的末尾，因此将high初始化为length
    while (low < high) {
      let mid = (low + high) >>> 1;
      // 小于value的位置一定不是寻找的解
      if (array[mid] < value) {
        // 新的搜索区间为[mid + 1, high]
        low = mid + 1;
      } else {
        // array[mid]大于等于value时还需要继续向左进行查找
        // 因为数组中可能存在重复元素，而要求是寻找可能的最小的插入位置
        // 新的搜索区间为[low, high]
        high = mid;
      }
    }
    return high; // 退出循环时low == high，返回high和low均可
  }

  // /**
  //  * 采取暴力破解
  //  * 将 value 值插入到有序数组中 尽可能小的索引位置，以保证array的排序。
  //  * @param array
  //  * @param value
  //  * @return {number|*}
  //  */
  // function sortedIndex(array, value) {
  //   for (let i = 0; i < array.length; i++) {
  //     if (array[i] >= value) {
  //       return i;
  //     }
  //   }
  //   return array.length;
  // }


  /**
   * This method is like _.sortedIndex except that it accepts iteratee which is invoked for value and each element of
   * array to compute their sort ranking. The iteratee is invoked with one argument: (value).
   * @param array
   * @param value
   * @param iteratee
   * @return {number}
   */
  function sortedIndexBy(array, value, iteratee) {
    iteratee = transform(iteratee);
    const arrayCopy = array.map(val => iteratee(val));
    const valueCopy = iteratee(value);
    return sortedIndex(arrayCopy, valueCopy);
  }


  /**
   * This method is like _.indexOf except that it performs a binary search on a sorted array(有序数组).
   * @param array
   * @param value
   * @return {number}
   */
  function sortedIndexOf(array, value) {
    // 与sortedIndex的不同之处在于此处查找上界为len - 1，保证了退出循环时得到的值一定是合法索引
    // 而sortedIndex的查找上界是len，所以对于某个大于数组中所有的值的value，退出循环时会得到len，此时已经越界，应该返回-1
    let low = 0, high = array.length - 1;
    while (low < high) {
      let mid = (low + high) >>> 1;
      // 小于value的位置一定不是解
      if (array[mid] < value) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    // 如果low处对应的值不等于目标值value，返回-1
    if (array[low] === value) {
      return low;
    }
    return -1;
  }


  /**
   * This method is like _.sortedIndex except that it returns the highest index at which value should be inserted into
   * array in order to maintain its sort order.
   * @param array
   * @param value
   * @return {number}
   */
  function sortedLastIndex(array, value) {
    let low = 0, high = array.length;
    while (low < high) {
      let mid = (low + high) >>> 1;
      // 寻找最大的插入位置，即寻找到值等于value的位置后仍需向右边移动
      // 与sortedIndex的不同之处就在于此处判断条件多了等于
      if (array[mid] <= value) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }


  /**
   * This method is like _.sortedLastIndex except that it accepts iteratee which is invoked for value and each element
   * of array to compute their sort ranking. The iteratee is invoked with one argument: (value).
   * @param array
   * @param value
   * @param iteratee
   * @return {number}
   */
  function sortedLastIndexBy(array, value, iteratee) {
    iteratee = transform(iteratee);
    const arrayCopy = array.map(val => iteratee(val));
    const valueCopy = iteratee(value);
    return sortedLastIndex(arrayCopy, valueCopy);
  }


  /**
   * This method is like _.lastIndexOf except that it performs a binary search on a sorted array.
   * @param array
   * @param value
   * @return {number}
   */
  function sortedLastIndexOf(array, value) {
    let index = sortedLastIndex(array, value);
    if (array[index - 1] === value) {
      return index - 1;
    }
    return -1;
  }


  /**
   * Creates a duplicate-free version of an array, using SameValueZero for equality comparisons, in which only the first
   * occurrence of each element is kept. The order of result values is determined by the order they occur in the array.
   * @param array
   * @return {any[]}
   */
  function uniq(array) {
    return [...new Set(array)];
  }


  /**
   * This method is like _.uniq except that it accepts iteratee which is invoked for each element in array to generate
   * the criterion by which uniqueness is computed. The order of result values is determined by the order they occur
   * in the array. The iteratee is invoked with one argument: (value).
   * @param array
   * @param iteratee
   * @return {[]}
   */
  function uniqBy(array, iteratee) {
    iteratee = transform(iteratee);
    const mappedArray = array.map(val => iteratee(val));
    const uniqArray = uniq(mappedArray);

    const ret = [];
    let i = 0;
    let uniqVal = uniqArray[i];
    for (let e of array) {
      if (iteratee(e) === uniqVal) {
        ret.push(e);
        i++;
        uniqVal = uniqArray[i];
      }
    }
    return ret;
  }


  /**
   * This method is like _.uniq except that it accepts comparator which is invoked to compare elements of array. The
   * order of result values is determined by the order they occur in the array.The comparator is invoked with two
   * arguments: (arrVal, othVal).
   * @param array
   * @param comparator
   * @return {[]}
   */
  function uniqWith(array, comparator) {
    const len = array.length;
    const ret = [];
    if (!len) {
      return ret;
    }
    ret.push(array[0]);
    outer:
      for (let i = 1; i < len; i++) {
        let val = array[i];
        for (let e of ret) {
          if (comparator(e, val)) {
            break outer;
          }
        }
        ret.push(val);
      }
    return ret;
  }


  /**
   * This method is like _.zip except that it accepts an array of grouped elements and creates an array regrouping the
   * elements to their pre-zip configuration.
   * @param arrays
   * @return {*[][]|*[]}
   */
  function unzip(arrays) {
    let len = arrays.length;
    if (!len) return [];
    const ret = Array(arrays[0].length).fill(0).map(_ => []);
    for (let j = 0; j < len; j++) {
      let array = arrays[j];
      for (let i = 0; i < array.length; i++) {
        ret[i][j] = array[i];
      }
    }
    return ret;
  }


  /**
   * This method is like _.unzip except that it accepts iteratee to specify how regrouped values should be combined.
   * The iteratee is invoked with the elements of each group: (...group).
   * @param array
   * @param iteratee
   * @return {[]|*[]}
   */
  function unzipWith(array, iteratee) {
    iteratee = transform(iteratee);
    if (!array.length) return [];
    let ret = [];
    let invoked = [];
    for (let i = 0; i < array[0].length; i++) {
      for (let e of array) {
        invoked.push(e[i]);
      }
      ret.push(iteratee(...invoked));
      invoked = [];
    }
    return ret;
  }


  /**
   * Creates an array excluding all given values using SameValueZero for equality comparisons.
   * Note: Unlike _.pull, this method returns a new array.
   * @param array
   * @param values
   * @return {[]}
   */
  function without(array, ...values) {
    const ret = [];
    for (let v of array) {
      if (!values.includes(v)) ret.push(v);
    }
    return ret;
  }


  // 一般地，记A和B是两个集合，集合A与集合B的对称差集定义为集合A与集合B中所有不属于A∩B的元素的集合，记为A Δ B，
  // 也就是说A Δ B = {x|x∈A∪B,x∉A∩B}，即A Δ B=(A∪B)-(A∩B)。也就是A Δ B=(A-B)∪(B-A)
  /**
   * Creates an array of unique values that is the symmetric difference of the given arrays. The order of result values
   * is determined by the order they occur in the arrays.
   * @param arrays
   * @return {*}
   */
  function xor(...arrays) {
    const union = (a, b) => new Set(a.concat(b));
    const intersection = (a, b) => a.reduce((arr, cur) => {
      if (b.includes(cur)) {
        arr.push(cur);
      }
      return arr;
    }, []);
    const difference = (a, b) => {
      const ret = [];
      for (let aVal of a) {
        if (!b.includes(aVal)) ret.push(aVal);
      }
      return ret;
    }

    // 根据定义，A和B的对称差集可以表达为(A∪B)-(A∩B)
    return arrays.reduce((ret, cur) => difference(union(ret, cur), intersection(ret, cur)));
  }


  /**
   * This method is like _.xor except that it accepts iteratee which is invoked for each element of each arrays to
   * generate the criterion by which by which they're compared. The order of result values is determined by the order
   * they occur in the arrays. The iteratee is invoked with one argument: (value).
   * @param args
   * @return {[]}
   */
  function xorBy(...args) {
    let iteratee = args.pop();
    iteratee = transform(iteratee);
    let argsCopy = args.map(value => value.slice().map(v => iteratee(v)));
    argsCopy = xor(...argsCopy);
    const map = new Map();
    for (let e of argsCopy) {
      map.set(e, true);
    }

    const ret = [];
    for (let arg of args) {
      for (let val of arg) {
        if (map.get(iteratee(val))) {
          ret.push(val);
          map.set(iteratee(val), false);
        }
        if (ret.length === argsCopy.length) {
          return ret;
        }
      }
    }
    return ret;
  }


  /**
   * This method is like _.xor except that it accepts comparator which is invoked to compare elements of arrays. The
   * order of result values is determined by the order they occur in the arrays. The comparator is invoked with
   * two arguments: (arrVal, othVal).
   * @param args
   * @return {[]}
   */
  function xorWith(...args) {
    let comparator = args.pop();
    comparator = transform(comparator);

    args.push(comparator);
    const itersec = intersectionWith(...args);
    args.pop();
    const ret = [];
    for (let e of args) {
      for (let v of e) {
        let flag = true;
        for (let i of itersec) {
          if (comparator(v, i)) {
            flag = false;
            break
          }
        }
        if (flag) ret.push(v);
      }
    }
    return ret;
  }


  /**
   * Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the
   * second of which contains the second elements of the given arrays, and so on.
   * @param arrays
   * @return {*[][]|*[]}
   */
  function zip(...arrays) {
    const len = arrays.length;
    if (!len) return [];

    const maxLen = Math.max(...(arrays.map(arr => arr.length)));
    const ret = Array(maxLen).fill(0).map(_ => []);
    for (let i = 0; i < maxLen; i++) {
      for (let j = 0; j < len; j++) {
        ret[i][j] = arrays[j][i];
      }
    }
    return ret;
  }


  /**
   * This method is like _.fromPairs except that it accepts two arrays, one of property identifiers and one of corresponding values.
   * @param props
   * @param values
   * @return {{}}
   */
  function zipObject(props = [], values = []) {
    const ret = {};
    // 以属性数组的长度为准
    for (let i = 0; i < props.length; i++) {
      ret[props[i]] = values[i];
    }
    return ret;
  }


  /**
   * 待完善
   * This method is like _.zipObject except that it supports property paths.
   * @param props
   * @param values
   * @return {{}}
   */
  function zipObjectDeep(props = [], values = []) {
    console.log(props); // debug
    const regexp = /^([a-zA-Z_$])+\[([\w$])+\]$/;
    const ret =  {};
    let temp = ret;
    for (let i = 0; i < props.length; i++) {
      let propValue = props[i];
      let splitedProp = propValue.split(".");
      for (let j = 0; j < splitedProp.length; j++) {
        let p = splitedProp[j];
        if (j === splitedProp.length - 1) {
          temp[p] = values[i];
          break;
        }
        if (!regexp.test(p)) { // 是字符串属性，没有[]
          if (temp[p] === undefined) {
            temp[p] = {}; // 对应属性值为undefined就新创建一个对象
          }
          temp = temp[p];
        } else if (regexp.test(p)) { // 需要创建数组
          let matches = p.match(regexp);
          let arrName = matches[1]; // 要创建的数组名字
          let order = matches[2]; // 数组中的索引
          if (temp[arrName] === undefined) {
            temp[arrName] = [];
            temp[arrName][order] = {};
            temp = temp[arrName][order];
          } else {
            if (temp[arrName][order] === undefined) {
              temp[arrName][order] = {};
            }
            temp = temp[arrName][order];
          }
        }
      }
      temp = ret;
    }
    return ret;
  }


  /**
   * This method is like _.zip except that it accepts iteratee to specify how grouped values should be combined. The
   * iteratee is invoked with the elements of each group: (...group).
   * @param args
   * @return {[]}
   */
  function zipWith(...args) {
    let iteratee = args.pop();
    iteratee = transform(iteratee);
    let maxLen = Math.max(...args.map(arg => arg.length));
    let invoked = [];
    let ret = [];
    for (let i = 0; i < maxLen; i++) {
      for (let arr of args) {
        invoked.push(arr[i]);
      }
      ret.push(iteratee(...invoked));
      invoked = [];
    }
    return ret;
  }


  /**
   * （只支持处理collection为数组的情况，collection为对象暂时不支持）
   * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
   * The corresponding value of each key is the number of times the key was returned by iteratee. The iteratee is
   * invoked with one argument: (value).
   * @param collection
   * @param iteratee
   * @return {{}}
   */
  function countBy(collection, iteratee) {
    iteratee = transform(iteratee);
    const ret = {};
    collection = collection.map(val => iteratee(val));
    for (let e of collection) {
      if (ret[e] !== undefined) {
        ret[e]++;
      } else {
        ret[e] = 1;
      }
    }
    return ret;
  }


  /**
   * This method is like _.uniq except that it's designed and optimized for sorted arrays.
   * @param array
   * @return {[]}
   */
  function sortedUniq(array) {
    const ret = [];
    const len = array.length;
    if (!len) {
      return ret;
    }
    ret.push(array[0]);
    for (let i = 1; i < len; i++) {
      if (array[i] !== array[i - 1]) {
        ret.push(array[i]);
      }
    }
    return ret;
  }


  /**
   * This method is like _.uniqBy except that it's designed and optimized for sorted arrays.
   * @param array
   * @param iteratee
   * @return {[]}
   */
  function sortedUniqBy(array, iteratee) {
    const len = array.length;
    const ret = [];
    if (!len) return ret;

    iteratee = transform(iteratee);
    const mappedArray = array.map(val => iteratee(val));
    const uniqArray = sortedUniq(mappedArray);
    let i = 0;
    let uniqVal = uniqArray[i];
    for (let e of array) {
      if (iteratee(e) === uniqVal) {
        ret.push(e);
        i++;
        uniqVal = uniqArray[i];
      }
    }
    return ret;
  }


  /**
   * Gets all but the first element of array.
   * @param array
   * @return {*}
   */
  function tail(array) {
    const [first, ...tails] = array;
    return tails;
  }


  /**
   * Creates a slice of array with n elements taken from the beginning.
   * @param array
   * @param n
   * @return {[]}
   */
  function take(array, n = 1) {
    const len = array.length;
    const ret = [];
    if (!len || n <= 0) return ret;
    for (let i = 1; i <= n; i++) {
      if (i > len) break;
      ret.push(array[i - 1]);
    }
    return ret;
  }


  /**
   * Creates a slice of array with n elements taken from the end.
   * @param array
   * @param n
   * @return {[]}
   */
  function takeRight(array, n = 1) {
    const len = array.length;
    const ret = [];
    if (!len || n <= 0) return ret;
    if (n > len) n = len;
    for (let i = len - 1; i >= 0; i--) {
      if (n-- > 0) {
        ret.unshift(array[i]);
      }
    }
    return ret;
  }


  /**
   * Creates a slice of array with elements taken from the end. Elements are taken until predicate returns falsey.
   * The predicate is invoked with three arguments: (value, index, array).
   * @param array
   * @param predicate
   * @return {[]}
   */
  function takeRightWhile(array, predicate) {
    predicate = transform(predicate);
    const ret = [];
    const len = array.length;
    for (let i = len - 1; i >= 0; i--) {
      // predicate接三个参数
      if (predicate(array[i], i, array)) {
        ret.unshift(array[i]);
      } else {
        break;
      }
    }
    return ret;
  }


  /**
   * Creates a slice of array with elements taken from the beginning. Elements are taken until predicate returns falsey.
   * The predicate is invoked with three arguments: (value, index, array).
   * @param array
   * @param predicate
   * @return {[]}
   */
  function takeWhile(array, predicate) {
    predicate = transform(predicate);
    const ret = [];
    const len = array.length;
    for (let i = 0; i < len; i++) {
      if (predicate(array[i], i, array)) {
        ret.push(array[i]);
      } else {
        break;
      }
    }
    return ret;
  }


  /**
   * 通过 predicate（断言函数） 检查 collection（集合）中的 所有 元素是否都返回真值。一旦 predicate（断言函数） 返回假值，迭代就马上停止。
   * predicate（断言函数）调用三个参数： (value, index|key, collection)。
   * @param collection
   * @param predicate
   * @return {boolean}
   */
  function every(collection, predicate) {
    predicate = transform(predicate);
    if (Array.isArray(collection)) {
      if (!collection.length) {
        return true;
      } else {
        for (let e of collection) {
          if (!predicate(e)) return false;
        }
      }
    } else if (typeUtils.isObject(collection)) {
      if (!Object.keys(collection).length) {
        return true;
      } else {
        for (let key of Object.keys(collection)) {
          if (!predicate(collection[key])) return false;
        }
      }
    }
    return true;
  }


  /**
   * 遍历 collection（集合）元素，返回 predicate（断言函数）返回真值 的所有元素的数组。 predicate（断言函数）调用三个参数：(value, index|key, collection)。
   * @param collection
   * @param predicate
   * @return {{}|boolean}
   */
  function filter(collection, predicate) {
    let res;
    predicate = transform(predicate);
    if (Array.isArray(collection)) {
      res = [];
      if (!collection.length) {
        return null;
      } else {
        for (let e of collection) {
          if (predicate(e)) res.push(e);
        }
      }
    } else if (typeUtils.isObject(collection)) {
      res = {};
      if (!Object.keys(collection).length) {
        return null;
      } else {
        for (let key of Object.keys(collection)) {
          if (predicate(collection[key])) res[key] = collection[key];
        }
      }
    }
    return res;
  }


  /**
   * 遍历 collection（集合）元素，返回 predicate（断言函数）第一个返回真值的第一个元素。predicate（断言函数）调用3个参数： (value, index|key, collection)。
   * @param collection
   * @param predicate
   * @param fromIdx
   * @return {null|*}
   */
  function find(collection, predicate, fromIdx = 0) {
    predicate = transform(predicate);
    if (Array.isArray(collection)) {
      if (!collection.length) {
        return null;
      } else {
        for (let i = fromIdx; i < collection.length; i++) {
          if (predicate(collection[i])) {
            return collection[i];
          }
        }
      }
    } else if (typeUtils.isObject(collection)) {
      if (!Object.keys(collection).length) {
        return null;
      } else {
        for (let key of Object.keys(collection)) {
          if (predicate(collection[key])) {
            return collection[key];
          }
        }
      }
    }
    return undefined;
  }


  /**
   * This method is like _.find except that it iterates over elements of collection from right to left.
   * @param collection
   * @param predicate
   * @param fromIndex
   * @return {undefined|*}
   */
  function findLast(collection, predicate, fromIndex = collection.length - 1) {
    predicate = transform(predicate);
    if (typeUtils.isArray(collection)) {
      if (!collection.length) {
        return undefined;
      } else {
        for (let i = fromIndex; i >= 0; i--) {
          if (predicate(collection[i])) {
            return collection[i];
          }
        }
      }
    } else if (typeUtils.isObject(collection)) {
      let keys = Object.keys(collection);
      if (!keys) {
        return undefined;
      } else {
        for (let key of keys) {
          if (predicate(collection[key])) {
            return collection[key];
          }
        }
      }
    }
    return undefined;
  }


  function baseFlatMap(collection, iteratee, depth = 1) {
    iteratee = transform(iteratee);
    if (typeUtils.isArray(collection)) {
      if (!collection.length) {
        return [];
      }
      collection = collection.map((value, idx, array) => iteratee(value, idx, array));
      return depth === Infinity ? flattenDeep(collection) : flattenDepth(collection, depth);
    } else if (typeUtils.isObject(collection)) {
      const ret = [];
      let keys = Object.keys(collection);
      if (!keys.length) {
        return ret;
      }
      for (let key of keys) {
        ret.push(iteratee(collection[key], key, collection));
      }
      return depth === Infinity ? flattenDeep(ret) : flattenDepth(ret, depth);
    }
    return [];
  }


  /**
   * Creates a flattened array of values by running each element in collection thru iteratee and flattening the mapped
   * results. The iteratee is invoked with three arguments: (value, index|key, collection).
   * @param collection
   * @param iteratee
   * @return {[]|*[]|*}
   */
  function flatMap(collection, iteratee) {
    return baseFlatMap(collection, iteratee);
  }


  /**
   * This method is like _.flatMap except that it recursively flattens the mapped results.
   * @param collection
   * @param iteratee
   * @return {*[]|*[]|*}
   */
  function flatMapDeep(collection, iteratee) {
    return baseFlatMap(collection, iteratee, Infinity);
  }


  /**
   * This method is like _.flatMap except that it recursively flattens the mapped results up to depth times.
   * @param collection
   * @param iteratee
   * @param depth
   * @return {[]|*|*[]}
   */
  function flatMapDepth(collection, iteratee, depth = 1) {
    return baseFlatMap(collection, iteratee, depth);
  }


  function baseForEach(collection, iteratee, direction) {
    iteratee = transform(iteratee);
    let flag = true;
    if (typeUtils.isArray(collection)) {
      if (!collection.length) {
        return collection;
      }
      if (direction) { // direction为true，表明迭代方向是正常的从左到右
        for (let i = 0; i < collection.length; i++) {
          flag = iteratee(collection[i], i, collection);
          if (flag === false) break;
        }
      } else { // 否则，迭代方向是从右到左
        for (let i = collection.length - 1; i >= 0; i--) {
          flag = iteratee(collection[i], i, collection);
          if (flag === false) break;
        }
      }
    } else if (typeUtils.isObject(collection)) {
      let keys = Object.keys(collection);
      if (!keys.length) {
        return collection;
      }
      if (direction) {
        for (let i = 0; i < keys.length; i++) {
          flag = iteratee(collection[keys[i]], keys[i], collection);
          if (flag === false) break;
        }
      } else {
        for (let i = keys.length - 1; i >= 0; i--) {
          flag = iteratee(collection[keys[i]], keys[i], collection);
          if (flag === false) break;
        }
      }
    }
    return collection;
  }


  /**
   * Iterates over elements of collection and invokes iteratee for each element. The iteratee is invoked with three
   * arguments: (value, index|key, collection). Iteratee functions may exit iteration early by explicitly returning false.
   * @param collection
   * @param iteratee
   * @return {*}
   */
  function forEach(collection, iteratee) {
    return baseForEach(collection, iteratee, true);
  }


  /**
   * This method is like _.forEach except that it iterates over elements of collection from right to left.
   * @param collection
   * @param iteratee
   * @return {*}
   */
  function forEachRight(collection, iteratee) {
    return baseForEach(collection, iteratee, false);
  }


  /**
   * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
   * The order of grouped values is determined by the order they occur in collection. The corresponding value of each
   * key is an array of elements responsible for generating the key. The iteratee is invoked with one argument: (value).
   * @param collection
   * @param iteratee
   * @return {{}}
   */
  function groupBy(collection, iteratee) {
    iteratee = transform(iteratee);
    if (typeUtils.isObject(collection)) {
      collection = Object.keys(collection).map(key => collection[key]);
    }
    const ret = {};
    for (let val of collection) {
      const key = iteratee(val);
      if (ret[key] === undefined) {
        ret[key] = [val];
      } else {
        ret[key].push(val);
      }
    }
    return ret;
  }


  // /**
  //  * Checks if value is in collection. If collection is a string, it's checked for a substring of value, otherwise
  //  * SameValueZero is used for equality comparisons. If fromIndex is negative, it's used as the offset from the end
  //  * of collection.
  //  * @param collection
  //  * @param value
  //  * @param fromIndex
  //  * @return {number|*}
  //  */
  // function includes(collection, value, fromIndex = 0) {
  //   if (typeUtils.isObject(collection)) {
  //     collection = Object.keys(collection).map(key => collection[key]);
  //   }
  //   return collection.indexOf(value, fromIndex) !== -1;
  // }


  /**
   * 查找字符串needle是否存在于字符串haystack中，存在返回索引，否则返回-1。
   * 参见：https://leetcode-cn.com/problems/implement-strstr/submissions/
   * @param haystack
   * @param needle
   * @param fromIndex
   * @return {number}
   */
  function strStr(haystack, needle, fromIndex = 0) {
    let M = haystack.length, N = needle.length;
    if (N === 0) return 0;
    if (N > M) return -1;
    for (let i = fromIndex; i <= M - N; i++) {
      for (let j = 0; j < N; j++) {
        if (haystack.charAt(i + j) !== needle.charAt(j)) break;
        if (j === N - 1) return i;
      }
    }
    return -1;
  }

  /**
   * Checks if value is in collection. If collection is a string, it's checked for a substring of value, otherwise
   * SameValueZero is used for equality comparisons. If fromIndex is negative, it's used as the offset from the end
   * of collection.
   * @param collection
   * @param value
   * @param fromIndex
   * @return {boolean}
   */
  function includes(collection, value, fromIndex = 0) {
    // 不使用indexOf方法
    if (typeUtils.isString(value)) {
      if (fromIndex < 0) fromIndex += collection.length;
      return strStr(collection, value, fromIndex) !== -1;
    }
    if (typeUtils.isObject(collection)) {
      collection = Object.keys(collection).map(key => collection[key]);
    }
    if (fromIndex < 0) fromIndex += collection.length;
    for (let i = fromIndex; i < collection.length; i++) {
      if (sameValueZero(value, collection[i])) return true;
    }
    return false;
  }


  /**
   * Invokes the method at path of each element in collection, returning an array of the results of each invoked method.
   * Any additional arguments are provided to each invoked method. If path is a function, it's invoked for, and this
   * bound to, each element in collection.
   * @param collection
   * @param path
   * @param args
   * @return {[]}
   */
  function invokeMap(collection, path, ...args) {
    // 暂时就这样吧，整的花里胡哨的
    if (typeUtils.isString(path)) {
      path = collection[path];
    }
    if (typeUtils.isObject(collection)) {
      collection = Object.keys(collection).map(key => collection[key]);
    }
    const ret = [];
    for (let e of collection) {
      ret.push(path.call(e, ...args));
    }
    return ret;
  }


  /**
   * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
   * The corresponding value of each key is the last element responsible for generating the key. The iteratee is
   * invoked with one argument: (value).
   * @param collection
   * @param iteratee
   * @return {{}}
   */
  function keyBy(collection, iteratee) {
    iteratee = transform(iteratee);
    const map = {};
    if (typeUtils.isObject(collection)) {
      Object.keys(collection).forEach(key => map[iteratee(collection[key])] = collection[key]);
    } else {
      collection.forEach(val => map[iteratee(val)] = val);
    }
    return map;
  }


  /**
   * 转换 value 为一个数组。
   * @param value
   * @return {[]|*[]|*}
   */
  function toArray(value) {
    let ret = [];
    if (Array.isArray(value)) {
      return value;
    } else if (typeUtils.isString(value)) {
      ret = [...value];
      return ret;
    } else if (typeUtils.isObject(value)) {
      for (let key of Object.keys(value)) {
        ret.push(value[key]);
      }
      return ret;
    } else {
      return [];
    }
  }


  /**
   * Converts value to a finite number.
   * @param value
   * @return {*|number|number}
   */
  function toFinite(value) {
    if (!typeUtils.isNumber(value)) {
      value = +value;
    }
    if (value !== value) return 0;
    switch (value) {
      case Infinity:
        return Number.MAX_VALUE;
      case -Infinity:
        return -Number.MAX_VALUE;
      default:
        return value;
    }
  }


  /**
   * Converts value to an integer.
   * @param value
   * @return {number}
   */
  function toInteger(value) {
    if (!typeUtils.isNumber(value)) {
      value = +value;
    }
    if (value !== value) return 0;
    if (Math.abs(value) <= Number.MIN_VALUE) return 0;
    switch (value) {
      case Infinity:
        return Number.MAX_VALUE;
      case -Infinity:
        return -Number.MAX_VALUE;
      default:
        return value | 0;
    }
  }


  /**
   * Converts value to an integer suitable for use as the length of an array-like object.
   * @param value
   * @return {number}
   */
  function toLength(value) {
    const threshold = 4294967295; // Math.pow(2, 32) - 1
    if (value > threshold) return threshold;
    return toInteger(value);
  }


  /**
   * Converts value to a number.
   * @param value
   * @return {number}
   */
  function toNumber(value) {
    return +value;
  }


  /**
   * Converts value to a safe integer. A safe integer can be compared and represented correctly.
   * @param value
   * @return {number}
   */
  function toSafeInteger(value) {
    if (!typeUtils.isNumber(value)) {
      value = +value;
    }
    if (value !== value) return 0;
    if (Math.abs(value) >= Number.MAX_SAFE_INTEGER) {
      return Number.MAX_SAFE_INTEGER;
    }
    if (Math.abs(value) <= Number.MIN_SAFE_INTEGER) {
      return 0;
    }
    return value | 0;
  }


  /**
   * Adds two numbers.
   * @param a
   * @param b
   * @return {*}
   */
  function add(a, b) {
    return a + b;
  }


  function basePrecision(value, precision, action) {
    let mul = Math.pow(10, precision);
    value *= mul;
    return action(value) / mul;
  }

  /**
   * Computes number rounded up to precision.
   * @param value
   * @param precision
   * @return {number}
   */
  function ceil(value, precision = 0) {
    return basePrecision(value, precision, Math.ceil);
  }


  /**
   * Divide two numbers.
   * @param dividend
   * @param divisor
   * @return {number}
   */
  function divide(dividend, divisor) {
    return dividend / divisor;
  }


  /**
   * Computes number rounded down to precision.
   * @param value
   * @param precision
   * @return {*}
   */
  function floor(value, precision = 0) {
    return basePrecision(value, precision, Math.floor);
  }


  /**
   * Assigns own enumerable string keyed properties of source objects to the destination object. Source objects are
   * applied from left to right. Subsequent sources overwrite property assignments of previous sources.
   * @see Object.assign
   * @param object
   * @param sources
   * @return {*}
   */
  function assign(object, ...sources) {
    sources.forEach(val => {
      for (let key of Object.keys(val)) {
        object[key] = val[key];
      }
    });
    return object;
  }


  /**
   * This method is like _.assign except that it iterates over own and inherited source properties.
   * Note: This method mutates object.
   * @param object
   * @param sources
   * @return {*}
   */
  function assignIn(object, ...sources) {
    sources.forEach(val => {
      while (val !== null) {
        assign(object, val);
        val = Reflect.getPrototypeOf(val);
      }
    });
    return object;
  }


  /**
   * 求交集
   * @param source
   * @param args
   * @return {[]}
   */
  function intersection(source, ...args) {
    let ret = [];
    for (let arg of args) {
      for (let e of arg) {
        if (source.includes(e)) {
          ret.push(e);
        }
      }
      source = ret;
      ret = [];
    }
    return source;
  }


  // /**
  //  * 返回两个或更多数组的交集
  //  * @param source
  //  * @param args
  //  * @return {any[]}
  //  */
  // function intersection(source, ...args) {
  //   const intersectionSet = new Set(source);
  //   for (const aVal of intersectionSet) {
  //     for (const b of args) {
  //       if (!b.includes(aVal)) {
  //         intersectionSet.delete(aVal);
  //         break;
  //       }
  //     }
  //   }
  //   return [...intersectionSet];
  // }


  /**
   * 这个方法类似 _.intersection，区别是它接受一个 iteratee 调用每一个arrays的每个值以产生一个值，通过产生的值进行了比较。结果值是从第一数组中选择。iteratee 会传入一个参数：(value)。
   * @param args
   * @return {[]|*[]}
   */
  function intersectionBy(...args) {
    let last = args[args.length - 1];
    let first = args.shift();
    if (Array.isArray(last) || last == null) {
      return intersection(first, args);
    }

    const ret = [];
    last = transform(last);
    args.pop();
    args = args.map(arg => arg.map(value => last(value)));
    let copy = first.slice().map(value => last(value));
    const res = intersection(copy, ...args);
    for (let e of first) {
      if (res.includes(last(e))) {
        ret.push(e);
      }
    }
    return ret;
  }


  /**
   * 这个方法类似 _.intersection，区别是它接受一个 comparator 调用比较arrays中的元素。结果值是从第一数组中选择。comparator 会传入两个参数：(arrVal, othVal)。
   * @param args
   * @return {[]}
   */
  function intersectionWith(...args) {
    let last = args.pop();
    let first = args[0];
    last = transform(last);
    const ret = [];

    for (let i = 1; i < args.length; i++) {
      for (let e of args[i]) {
        for (let v of first) {
          if (last(e, v)) {
            ret.push(e);
          }
        }
      }
    }
    return ret;
  }


  /**
   * 计算 array 中的最大值。 如果 array 是 空的或者假值将会返回 undefined。
   * @param array
   * @return {undefined|*}
   */
  function max(array) {
    if (!array.length) return undefined;
    return array.reduce((prev, next) => Math.max(prev, next), -Infinity);
  }


  /**
   * 这个方法类似 _.max 除了它接受 iteratee 来调用 array中的每一个元素，来生成其值排序的标准。 iteratee 会调用1个参数: (value) 。
   * @param array
   * @param iteratee
   * @return {undefined|*}
   */
  function maxBy(array, iteratee) {
    iteratee = transform(iteratee);
    array.sort((a, b) => iteratee(a) - iteratee(b));
    return array[array.length - 1];
  }


  /**
   * Computes the mean of the values in array.
   * @param array
   * @return {number}
   */
  function mean(array) {
    return array.reduce((prev, cur) => prev + cur) / array.length;
  }


  /**
   * This method is like _.mean except that it accepts iteratee which is invoked for each element in array to generate
   * the value to be averaged. The iteratee is invoked with one argument: (value).
   * @param array
   * @param iteratee
   * @return {number}
   */
  function meanBy(array, iteratee) {
    iteratee = transform(iteratee);
    array = array.map(val => iteratee(val));
    return mean(array);
  }


  /**
   * 计算 array 中的最小值。 如果 array 是 空的或者假值将会返回 undefined。
   * @param array
   * @return {undefined|*}
   */
  function min(array) {
    if (!array.length) return undefined;
    return array.reduce((prev, next) => Math.min(prev, next), Infinity);
  }


  /**
   * 这个方法类似 _.min 除了它接受 iteratee 来调用 array中的每一个元素，来生成其值排序的标准。 iteratee 会调用1个参数: (value) 。
   * @param array
   * @param iteratee
   * @return {*}
   */
  function minBy(array, iteratee) {
    iteratee = transform(iteratee);
    array.sort((a, b) => iteratee(a) - iteratee(b));
    return array[0];
  }


  /**
   * Multiply two numbers.
   * @param a
   * @param b
   * @return {number}
   */
  function multiply(a, b) {
    return a * b;
  }


  /**
   * Computes number rounded to precision.
   * @param number
   * @param precision
   * @return {*}
   */
  function round(number, precision = 0) {
    return basePrecision(number, precision, Math.round);
  }


  /**
   * Subtract two numbers.
   * @param a
   * @param b
   * @return {number}
   */
  function subtract(a, b) {
    return a - b;
  }


  /**
   * 计算 array 中值的总和
   * @param array
   * @return {*}
   */
  function sum(array) {
    return array.reduce((prev, next) => prev + next);
  }


  /**
   * 这个方法类似 _.summin 除了它接受 iteratee 来调用 array中的每一个元素，来生成其值排序的标准。 iteratee 会调用1个参数: (value) 。
   * @param array
   * @param iteratee
   * @return {*}
   */
  function sumBy(array, iteratee) {
    iteratee = transform(iteratee);
    const mapped = array.map(value => iteratee(value));
    return sum(mapped);
  }


  /**
   * Clamps number within the inclusive lower and upper bounds.
   * @param number
   * @param lower
   * @param upper
   * @return {*}
   */
  function clamp(number, lower, upper) {
    if (number <= lower) return lower;
    if (number >= upper) return upper;
    return number;
  }


  /**
   * Checks if n is between start and up to, but not including, end. If end is not specified, it's set to start with
   * start then set to 0. If start is greater than end the params are swapped to support negative ranges.
   * @param number
   * @param start
   * @param end
   * @return {boolean}
   */
  function inRange(number, start = 0, end) {
    if (end === undefined) {
      end = start;
      start = 0;
    } else if (start > end) {
      [start, end] = [end, start];
    }
    return !(number < start || number >= end);
  }


  function isFloatNumber(value) {
    return (value | 0) !== value;
  }


  /**
   * Produces a random number between the inclusive lower and upper bounds. If only one argument is provided a number
   * between 0 and the given number is returned. If floating is true, or either lower or upper are floats, a
   * floating-point number is returned instead of an integer.
   * @param lower
   * @param upper
   * @param floating
   * @return {number}
   */
  function random(lower, upper, floating) {
    if (!isFloatNumber(lower) && !isFloatNumber(upper === undefined ? 0 : upper) && !floating) {
      if (arguments.length === 1) {
        if (lower <= 0) {
          return 0;
        } else {
          upper = lower;
          lower = 0;
        }
      }
      return lower + ((Math.random() * (upper - lower)) | 0);
    } else {
      if (arguments.length === 1) {
        if (lower <= 0) {
          return 0;
        } else {
          upper = lower;
          lower = 0;
        }
      }
      return lower + Math.random() * (upper - lower);
    }
  }


  /**
   * 获取array数组的第n个元素。如果n为负数，则返回从数组结尾开始的第n个元素。
   * @param array
   * @param n
   * @return {*}
   */
  function nth(array, n = 0) {
    let len = array.length;
    if (n < 0) n = n + len;
    return array[n];
  }


  /**
   * 移除数组array中所有和给定值相等的元素，使用 SameValueZero 进行全等比较。
   * 注意： 和 _.without 方法不同，这个方法会改变数组。使用 _.remove 从一个数组中移除元素。
   * @param array
   * @param values
   * @return {*}
   */
  function pull(array, ...values) {
    let copy = array;
    for (let val of values) {
      copy = filter(copy, res => !sameValueZero(res, val));
    }
    array.length = copy.length;
    for (let i = 0; i < copy.length; i++) {
      array[i] = copy[i];
    }
    return array;
  }


  /**
   * 这个方法类似 _.pull，区别是这个方法接收一个要移除值的数组。
   * Note: 不同于 _.difference, 这个方法会改变数组 array。
   * @param array
   * @param values
   */
  function pullAll(array, values) {
    return pull(array, ...values);
  }


  /**
   * 这个方法类似于 _.pullAll ，区别是这个方法接受一个 iteratee（迭代函数） 调用 array 和 values的每个值以产生一个值，通过产生的值进行了比较。iteratee 会传入一个参数： (value)。
   * Note: 不同于 _.differenceBy, 这个方法会改变数组 array。
   * @param array
   * @param values
   * @param iteratee
   * @return {*}
   */
  function pullAllBy(array, values, iteratee) {
    iteratee = transform(iteratee);
    let copy = array;
    for (let val of values) {
      copy = filter(copy, res => iteratee(res) !== iteratee(val));
    }
    array.length = copy.length;
    for (let i = 0; i < copy.length; i++) {
      array[i] = copy[i];
    }
    return array;
  }


  /**
   * 这个方法类似于 _.pullAll，区别是这个方法接受 comparator 调用array中的元素和values比较。comparator 会传入两个参数：(arrVal, othVal)。
   * 注意: 和 _.differenceWith 不同, 这个方法会改变数组 array。
   * @param array
   * @param values
   * @param comparator
   * @return {*}
   */
  function pullAllWith(array, values, comparator) {
    let copy = [];
    for (let val of values) {
      for (let e of array) {
        if (!comparator(val, e)) {
          copy.push(e);
        }
      }
    }
    array.length = copy.length;
    for (let i = 0; i < copy.length; i++) {
      array[i] = copy[i];
    }
    return array;
  }


  /**
   * 创建一个按顺序排列的唯一值的数组。所有给定数组的元素值使用 SameValueZero做等值比较。
   * @param initArr
   * @param arrays
   * @return {any[]}
   */
  function union(initArr, ...arrays) {
    const set = new Set(initArr);
    arrays.forEach(value => value.forEach(v => set.add(v)));
    return [...set];
  }


  /**
   * 这个方法类似 _.union ，除了它接受一个 iteratee （迭代函数），调用每一个数组（array）的每个元素以产生唯一性计算的标准。iteratee 会传入一个参数：(value)。
   * @param values
   * @return {*[]}
   */
  function unionBy(...values) {
    let last = values[values.length - 1];
    if (Array.isArray(last) || last == null) {
      return union(...values);
    }

    last = transform(last);
    values.pop();
    let first = values.shift();
    const ret = [...first];
    values = concat([], ...values);
    for (let i = 0; i < values.length; i++) {
      let temp = last(values[i]);
      if (!ret.map(value => last(value)).includes(temp)) {
        ret.push(values[i]);
      }
    }
    return ret;
  }


  /**
   * 这个方法类似 _.union， 除了它接受一个 comparator 调用比较arrays数组的每一个元素。 comparator 调用时会传入2个参数： (arrVal, othVal)。
   * @param values
   * @return {*[]}
   */
  function unionWith(...values) {
    let comparator = values.pop();

    let first = values.shift();
    const ret = [...first];
    values = concat([], ...values);
    for (let val of first) {
      values = filter(values, res => !comparator(res, val));
    }
    return ret.concat(values);
  }


  /**
   * 创建一个数组， value（值） 是 iteratee（迭代函数）遍历 collection（集合）中的每个元素后返回的结果。
   * @param collection
   * @param iteratee
   * @return {[]}
   */
  function map(collection, iteratee) {
    iteratee = transform(iteratee);
    let res = [];
    if (Array.isArray(collection)) {
      if (!collection.length) {
        return res;
      } else {
        for (let i = 0; i < collection.length; i++) {
          res.push(iteratee(collection[i], i, collection));
        }
      }
    } else if (typeUtils.isObject(collection)) {
      let keys = Object.keys(collection);
      if (!keys.length) {
        return res;
      } else {
        for (let key of keys) {
          res.push(iteratee(collection[key]));
        }
      }
    }
    return res;
  }

  /*
  // old version
  function orderBy(collection, iteratees, orders) {
    const sortAsc = (o1, o2) => o1 < o2 ? -1 : o1 > o2 ? 1 : 0;
    const sortDesc = (o1, o2) => o1 < o2 ? 1 : o1 > o2 ? -1 : 0;

    iteratees = iteratees
      .map(val => transform(val))
      .map((fn, index) => (o1, o2) => orders[index] === "desc"
        ? sortDesc(fn(o1), fn(o2))
        : sortAsc(fn(o1), fn(o2)));
    collection.sort((o1, o2) => {
      for (let fn of iteratees) {
        let res = fn(o1, o2);
        if (res !== 0) return res;
      }
    });
    return collection;
  }
  */


  /**
   * This method is like _.sortBy except that it allows specifying the sort orders of the iteratees to sort by. If
   * orders is unspecified, all values are sorted in ascending order. Otherwise, specify an order of "desc" for
   * descending or "asc" for ascending sort order of corresponding values.
   * @param collection
   * @param iteratees
   * @param orders
   * @return {*}
   */
  function orderBy(collection, iteratees, orders) {
    // 暂时只支持collection为数组
    iteratees = iteratees
      .map(val => transform(val))
      .map((fn, index) => (o1, o2) => orders[index] === "desc"
        ? fn(o1) < fn(o2) ? 1 : fn(o1) > fn(o2) ? -1 : 0
        : fn(o1) < fn(o2) ? -1 : fn(o1) > fn(o2) ? 1 : 0);
    collection.sort((o1, o2) => {
      for (let fn of iteratees) {
        let res = fn(o1, o2);
        if (res !== 0) return res; // res === 0，在此基础上继续调用后续函数进行比较，否则，退出并返回比较结果
      }
    });
    return collection;
  }


  /**
   * Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy
   * for, the second of which contains elements predicate returns falsey for. The predicate is invoked with one
   * argument: (value).
   * @param collection
   * @param predicate
   * @return {[][]}
   */
  function partition(collection, predicate) {
    predicate = transform(predicate);
    const ret = [[], []];
    if (typeUtils.isObject(collection)) {
      collection = Object.keys(collection).map(key => collection[key]);
    }
    for (let e of collection) {
      if (predicate(e)) {
        ret[0].push(e);
      } else {
        ret[1].push(e);
      }
    }
    return ret;
  }


  /**
   * Reduces collection to a value which is the accumulated result of running each element in collection thru iteratee,
   * where each successive invocation is supplied the return value of the previous. If accumulator is not given, the
   * first element of collection is used as the initial value. The iteratee is invoked with four arguments:
   * (accumulator, value, index|key, collection).
   * @param collection
   * @param iteratee
   * @param accumulator
   * @return {*[]|*}
   */
  function reduce(collection, iteratee, accumulator) {
    let startIdx = 0;
    if (typeUtils.isObject(collection)) {
      let keys = Object.keys(collection);

      if (accumulator === undefined) {
        accumulator = collection[keys[0]];
        startIdx = 1;
      }
      for (let i = startIdx; i < keys.length; i++) {
        accumulator = iteratee(accumulator, collection[keys[i]], keys[i], collection);
      }
      return accumulator;
    } else if (typeUtils.isArray(collection)) {
      if (accumulator === undefined) {
        accumulator = collection[0];
        startIdx = 1;
      }
      for (let i = startIdx; i < collection.length; i++) {
        accumulator = iteratee(accumulator, collection[i], i, collection);
      }
      return accumulator;
    }
    return [];
  }


  /**
   * This method is like _.reduce except that it iterates over elements of collection from right to left.
   * @param collection
   * @param iteratee
   * @param accumulator
   * @return {*[]|*}
   */
  function reduceRight(collection, iteratee, accumulator) {
    let startIdx;
    if (typeUtils.isObject(collection)) {
      let keys = Object.keys(collection);
      startIdx = keys.length - 1;

      if (accumulator === undefined) {
        accumulator = collection[keys[startIdx]];
        startIdx--;
      }
      for (let i = startIdx; i >= 0; i--) {
        accumulator = iteratee(accumulator, collection[keys[i]], keys[i], collection);
      }
      return accumulator;
    } else if (typeUtils.isArray(collection)) {
      startIdx = collection.length - 1;
      if (accumulator === undefined) {
        accumulator = collection[startIdx];
        startIdx--;
      }
      for (let i = startIdx; i >= 0; i--) {
        accumulator = iteratee(accumulator, collection[i], i, collection);
      }
      return accumulator;
    }
    return [];
  }


  /**
   * The opposite of _.filter; this method returns the elements of collection that predicate does not return truthy for.
   * @param collection
   * @param predicate
   * @return {[]}
   */
  function reject(collection, predicate) {
    predicate = transform(predicate);
    const ret = [];
    if (typeUtils.isObject(collection)) {
      let keys = Object.keys(collection);
      for (let key of keys) {
        if (!predicate(collection[key])) {
          ret.push(collection[key]);
        }
      }
    } else if (typeUtils.isArray(collection)) {
      for (let e of collection) {
        if (!predicate(e)) {
          ret.push(e);
        }
      }
    }
    return ret;
  }


  /**
   * Gets a random element from collection.
   * @param collection
   * @return {*}
   */
  function sample(collection) {
    let random;
    if (typeUtils.isObject(collection)) {
      let keys = Object.keys(collection);
      random = Math.random() * (keys.length) | 0;
      return collection[keys[random]];
    } else if (typeUtils.isArray(collection)) {
      random = Math.random() * (collection.length) | 0;
      return collection[random];
    }
  }


  /**
   * Gets n random elements at unique keys from collection up to the size of collection.
   * @param collection
   * @param n
   * @return {[]}
   */
  function sampleSize(collection, n = 1) {
    const ret = [];
    let random;
    if (typeUtils.isObject(collection)) {
      if (n > Object.keys(collection).length) n = Object.keys(collection.length);
      while (n-- > 0) {
        let keys = Object.keys(collection);
        random = Math.random() * (keys.length) | 0;
        ret.push(collection[keys.splice(random, 1)[0]]);
      }
    } else if (typeUtils.isArray(collection)) {
      if (n > collection.length) n = collection.length;
      while (n-- > 0) {
        random = Math.random() * (collection.length) | 0;
        ret.push(collection.splice(random, 1)[0]);
      }
    }
    return ret;
  }


  /**
   * Gets the size of collection by returning its length for array-like values or the number of own enumerable string
   * keyed properties for objects.
   * @param collection
   * @return {number|*}
   */
  function size(collection) {
    if (typeUtils.isString(collection) || typeUtils.isArray(collection)) {
      return collection.length;
    } else if (typeUtils.isObject(collection)) {
      return Object.keys(collection).length;
    }
  }


  /**
   * Checks if predicate returns truthy for any element of collection. Iteration is stopped once predicate returns truthy.
   * The predicate is invoked with three arguments: (value, index|key, collection).
   * @param collection
   * @param predicate
   * @return {boolean}
   */
  function some(collection, predicate) {
    predicate = transform(predicate);
    if (typeUtils.isObject(collection)) {
      let keys = Object.keys(collection);
      for (let key of keys) {
        if (predicate(collection[key])) {
          return true;
        }
      }
    } else if (typeUtils.isArray(collection)) {
      for (let e of collection) {
        if (predicate(e)) {
          return true;
        }
      }
    }
    return false;
  }


  /**
   * Creates an array of elements, sorted in ascending order by the results of running each element in a collection thru
   * each iteratee. This method performs a stable sort, that is, it preserves the original sort order of equal elements.
   * The iteratees are invoked with one argument: (value).
   * @param collection
   * @param iteratee
   * @return {*}
   */
  function sortBy(collection, iteratee) {
    return orderBy(collection, iteratee, []);
  }


  /**
   * Defers invoking the func until the current call stack has cleared. Any additional arguments are provided to func
   * when it's invoked.
   * @param func
   * @param args
   * @return {number}
   */
  function defer(func, ...args) {
    let id = setTimeout(func, 0, ...args);
    return id - 1;
  }


  /**
   * Invokes func after wait milliseconds. Any additional arguments are provided to func when it's invoked.
   * @param func
   * @param wait
   * @param args
   * @return {number}
   */
  function delay(func, wait, ...args) {
    let id = setTimeout(func, wait, ...args);
    return id - 1;
  }


  /**
   * Casts value as an array if it's not one.
   * @param value
   * @return {[]|*}
   */
  function castArray(value) {
    if (typeUtils.isArray(value)) {
      return value;
    }
    const ret = [];
    if (arguments.length > 0) {
      for (let i = 0; i < arguments.length; i++) {
        ret.push(arguments[i]);
      }
    }
    return ret;
  }


  /**
   * This method is like _.clone except that it recursively clones value.
   * @param value
   * @return {any|*[]}
   */
  function cloneDeep(value) {
    const map = new Map(); // 解决循环引用
    return _cloneDeep(value);

    function _cloneDeep(obj) {
      if (obj === null) {
        return null;
      }

      if (typeUtils.isRegExp(obj)) {
        return obj;
      }

      if (typeof obj === "object") {
        if (map.has(obj)) {
          return map.get(obj);
        }
        let newObj = Array.isArray(obj) ? [] : {};
        let keys = Object.keys(obj);
        keys.forEach(key => {
          newObj[key] = _cloneDeep(obj[key]);
        });
        return newObj;
      } else {
        return obj;
      }
    }
  }


  /**
   * Checks if object conforms to source by invoking the predicate properties of source with the corresponding property
   * values of object.
   * Note: This method is equivalent to _.conforms when source is partially applied.
   * @param object
   * @param source
   * @return {boolean}
   */
  function conformsTo(object, source) {
    let keysS = Object.keys(source);
    for (let key of keysS) {
      if (!source[key].call(null, object[key])) {
        return false;
      }
    }
    return true;
  }


  /**
   * Performs a SameValueZero comparison between two values to determine if they are equivalent.
   * @param value
   * @param other
   * @return {boolean}
   */
  function eq(value, other) {
    return sameValueZero(value, other);
  }


  /**
   * Checks if value is greater than other.
   * @param value
   * @param other
   * @return {boolean}
   */
  function gt(value, other) {
    return value > other;
  }


  /**
   * Checks if value is greater than or equal to other.
   * @param value
   * @param other
   * @return {boolean}
   */
  function gte(value, other) {
    return value >= other;
  }


  /**
   * Checks if value is less than other.
   * @param value
   * @param other
   * @return {boolean}
   */
  function lt(value, other) {
    return value < other;
  }


  /**
   * Checks if value is less than or equal to other.
   * @param value
   * @param other
   * @return {boolean}
   */
  function lte(value, other) {
    return value <= other;
  }

  /**
   * 深比较（不支持循环引用）
   * @param obj1
   * @param obj2
   * @return {boolean}
   */
  function isEqual(obj1, obj2) {
    if (obj1 === null) {
      return obj2 === null;
    } else if (typeof obj1 === "object") {
      // 确保传递给_deepEqual()的两个参数均是非null的对象
      return typeof obj2 === "object" && _deepEqual(obj1, obj2);
    } else {
      return sameValueZero(obj1, obj2);
    }

    /**
     * 假定传入的两个参数o1和o2都是非null的对象
     * @param {any} o1
     * @param {any} o2
     * @return {boolean}
     */
    function _deepEqual(o1, o2) {
      const {toString} = Object.prototype;
      if (toString.call(o1) !== toString.call(o2)) return false;
      // 获取对象自身的所有属性（包括不可枚举属性和Symbol属性）
      const keysA = Reflect.ownKeys(o1);
      const keysB = Reflect.ownKeys(o2);

      // 如果两者的属性个数不同，直接返回false
      if (keysA.length !== keysB.length) {
        return false;
      }

      // 如果一个对象拥有另一个对象所没有的属性，直接返回false
      for (let key of keysA) {
        if (!keysB.includes(key)) {
          return false;
        }
      }

      // 逐一判断对应的属性是否相同（内容）
      for (let key of keysA) {
        // 特判null
        if (o1[key] === null) {
          if (o2[key] !== null) {
            return false;
          }
          // o1[key]和o2[key]均为null时本轮比较为true，进行下一轮比较
        } else if (typeof o1[key] === "object") {
          if (typeof o2[key] !== "object") {
            return false;
          }

          // 如果两者都是对象，递归调用进行深度比较
          // 要确保传递给_deepEqual方法的参数是非null的对象，否则Reflect.ownKeys会抛出错误
          if (!_deepEqual(o1[key], o2[key])) {
            return false;
          }
        } else {
          if (o1[key] !== o2[key]) {
            return false;
          }
        }
      }

      return true;
    }
  }


  /**
   * 检查 value 是否是一个类 arguments 对象。
   * @param value
   * @return {boolean|*}
   */
  function isArguments(value) {
    return typeUtils.isArguments(value);
  }

  /**
   * 检查 value 是否是 Array 类对象。
   * @param value
   * @return {*}
   */
  function isArray(value) {
    return typeUtils.isArray(value);
  }


  /**
   * 检查 value 是否是 ArrayBuffer 对象。
   * @param value
   * @return {boolean|*}
   */
  function isArrayBuffer(value) {
    return typeUtils.isArrayBuffer(value);
  }


  /**
   * Checks if value is array-like. A value is considered array-like if it's not a function and has a value.length
   * that's an integer greater than or equal to 0 and less than or equal to Number.MAX_SAFE_INTEGER.
   * @param value
   * @return {boolean|boolean|*|boolean}
   */
  function isArrayLike(value) {
    return !typeUtils.isFunction(value)
      && typeUtils.isNumber(value.length)
      && value.length >= 0
      && value.length <= Number.MAX_SAFE_INTEGER;
  }


  /**
   * This method is like _.isArrayLike except that it also checks if value is an object.
   * @param value
   * @return {boolean|boolean|*}
   */
  function isArrayLikeObject(value) {
    return !typeUtils.isObject(value) && isArrayLike(value);
  }


  /**
   * Checks if value is classified as a boolean primitive or object.
   * @param value
   * @return {boolean|*}
   */
  function isBoolean(value) {
    return typeUtils.isBoolean(value);
  }


  /**
   * Checks if value is classified as a Date object.
   * @param value
   * @return {boolean|*}
   */
  function isDate(value) {
    return typeUtils.isDate(value);
  }


  /**
   * Checks if value is likely a DOM element.
   * @param value
   * @return {boolean}
   */
  function isElement(value) {
    let regexp = /^\[object HTML\w+\]$/;
    return regexp.test(Object.prototype.toString.call(value));
  }


  /**
   * Checks if value is an empty object, collection, map, or set.
   * Objects are considered empty if they have no own enumerable string keyed properties.
   * Array-like values such as arguments objects, arrays, buffers, strings, or jQuery-like collections are considered
   * empty if they have a length of 0. Similarly, maps and sets are considered empty if they have a size of 0.
   * @param value
   * @return {boolean}
   */
  function isEmpty(value) {
    if (typeUtils.isBoolean(value)
      || typeUtils.isNumber(value)
      || typeUtils.isNull(value)
      || typeUtils.isUndefined(value)) {
      return true;
    } else if (typeUtils.isString(value)
      || typeUtils.isArguments(value)
      || typeUtils.isArray(value)) {
      return value.length === 0;
    } else if (typeUtils.isMap(value)
      || typeUtils.isSet(value)) {
      return value.size === 0;
    } else if (typeUtils.isObject(value)) {
      return Object.keys(value).length === 0;
    }
  }


  /**
   * Checks if value is an Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, or URIError object.
   * @param value
   * @return {boolean|*}
   */
  function isError(value) {
    return typeUtils.isError(value);
  }


  /**
   * Checks if value is classified as a RegExp object.
   * @param value
   * @return {boolean|*}
   */
  function isRegExp(value) {
    return typeUtils.isRegExp(value);
  }


  /**
   * Checks if value is a finite primitive number.
   * Note: This method is based on Number.isFinite.
   * @param value
   * @return {boolean|*|boolean}
   */
  function isFinite(value) {
    return typeUtils.isNumber(value) && (value !== Infinity && value !== -Infinity);
  }


  /**
   * Checks if value is classified as a Function object.
   * @param value
   * @return {boolean|*}
   */
  function isFunction(value) {
    return typeUtils.isFunction(value);
  }


  /**
   * Checks if value is an integer.
   * Note: This method is based on Number.isInteger.
   * @param value
   * @return {boolean|*}
   */
  function isInteger(value) {
    return isFinite(value) && Math.floor(value) === value;
  }


  /**
   * Checks if value is a valid array-like length.
   * Note: This method is loosely based on ToLength.
   * @param value
   * @return {boolean|*|boolean}
   */
  function isLength(value) {
    if (!typeUtils.isNumber(value)) {
      return false;
    }
    if (value < 0) {
      value = -value;
    }
    return value > Number.MIN_VALUE && value < Number.MAX_VALUE;
  }


  /**
   * Checks if value is classified as a Map object.
   * @param value
   * @return {*}
   */
  function isMap(value) {
    return typeUtils.isMap(value);
  }


  /**
   * Performs a partial deep comparison between object and source to determine if object contains equivalent property values.
   * @param object
   * @param source
   * @return {boolean}
   */
  function isMatch(object, source) {
    return partialDeepEqual(source, object);
  }


  /**
   * Checks if value is NaN.
   * @param value
   * @return {boolean}
   */
  function isNaN(value) {
    if (!typeUtils.isNumber(value)) {
      return false;
    }
    if (typeof value === "object") {
      value = value.valueOf();
    }
    return value !== value;
  }


  /**
   * Checks if value is null or undefined.
   * @param value
   * @return {boolean}
   */
  function isNil(value) {
    return value == undefined;
  }


  /**
   * Checks if value is null.
   * @param value
   * @return {boolean|*}
   */
  function isNull(value) {
    return typeUtils.isNull(value);
  }


  /**
   * Checks if value is classified as a Number primitive or object.
   * Note: To exclude Infinity, -Infinity, and NaN, which are classified as numbers, use the _.isFinite method.
   * @param value
   * @return {boolean|*}
   */
  function isNumber(value) {
    return typeUtils.isNumber(value);
  }


  /**
   * Checks if value is the language type of Object. (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))
   * @param value
   * @return {boolean}
   */
  function isObject(value) {
    return typeof value === "object" && value !== null || typeof value === "function";
  }


  /**
   * Checks if value is object-like. A value is object-like if it's not null and has a typeof result of "object".
   * @param value
   * @return {boolean}
   */
  function isObjectLike(value) {
    return typeof value === "object" && value !== null;
  }


  /**
   * Checks if value is a plain object, that is, an object created by the Object constructor or one with a [[Prototype]] of null.
   * @param value
   * @return {boolean}
   */
  function isPlainObject(value) {
    let proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
  }


  /**
   * Checks if value is a safe integer. An integer is safe if it's an IEEE-754 double precision number which isn't the result of a rounded unsafe integer.
   * Note: This method is based on Number.isSafeInteger.
   * @param value
   * @return {*|boolean}
   */
  function isSafeInteger(value) {
    return typeUtils.isNumber(value)
      && Math.abs(value) <= Number.MAX_SAFE_INTEGER
      && Math.abs(value) > Number.MIN_VALUE;
  }


  /**
   * Checks if value is classified as a Set object.
   * @param value
   * @return {boolean|*}
   */
  function isSet(value) {
    return typeUtils.isSet(value);
  }


  /**
   * Checks if value is classified as a String primitive or object.
   * @param value
   * @return {boolean|*}
   */
  function isString(value) {
    return typeUtils.isString(value);
  }


  /**
   * Checks if value is classified as a Symbol primitive or object.
   * @param value
   * @return {boolean|*}
   */
  function isSymbol(value) {
    return typeUtils.isSymbol(value);
  }


  /**
   * Checks if value is classified as a typed array.
   * @param value
   * @return {boolean}
   */
  function isTypedArray(value) {
    const {toString} = Object.prototype;
    const regexp = /\b(\w+)\]/;
    return TypedArrays.includes(toString.call(value).match(regexp)[1]);
  }


  /**
   * Checks if value is undefined.
   * @param value
   * @return {boolean|*}
   */
  function isUndefined(value) {
    return typeUtils.isUndefined(value);
  }


  /**
   * Checks if value is classified as a WeakMap object.
   * @param value
   * @return {boolean|*}
   */
  function isWeakMap(value) {
    return typeUtils.isWeakMap(value);
  }


  /**
   * Checks if value is classified as a WeakSet object.
   * @param value
   * @return {boolean|*}
   */
  function isWeakSet(value) {
    return typeUtils.isWeakSet(value);
  }


  /**
   * 函数的柯里化（不支持占位符功能）
   * @param fn
   * @param arity
   * @return {function(...[*]): (*)}
   */
  function curry(fn, arity = fn.length) {
    return function (...args) {
      if (arity <= args.length) {
        return fn(...args);
      } else {
        return curry(curryAuxiliary(fn, ...args), arity - args.length);
      }
    }
  }

  // 柯里化辅助函数
  function curryAuxiliary(fn, ...args) {
    return function (...vars) {
      return fn(...args, ...vars);
    }
  }


  /**
   * Creates a function that performs a partial deep comparison between a given object and source, returning true
   * if the given object has equivalent property values, else false.
   * @param source
   * @return {any}
   */
  function matches(source) {
    return partialDeepEqual.bind(null, source);
  }


  /**
   * partial deep equal
   * @param source
   * @param target
   * @return {boolean}
   */
  function partialDeepEqual(source, target) {
    const {toString} = Object.prototype;
    if (toString.call(source) !== toString.call(target)) return false;
    // 获取对象自身的所有属性（包括不可枚举属性和Symbol属性）
    const keysS = Reflect.ownKeys(source);
    const keysT = Reflect.ownKeys(target);

    // 如果source的属性值个数大于比较值的属性值个数，返回false
    if (keysS.length > keysT.length) {
      return false;
    }

    for (let key of keysS) {
      if (!keysT.includes(key)) {
        return false;
      }
    }

    // 逐一判断source和target对应的属性是否相同（内容）
    for (let key of keysS) {
      // 特判null
      if (source[key] === null) {
        if (target[key] !== null) {
          return false;
        }
        // source[key]和target[key]均为null时本轮比较为true，进行下一轮比较
      } else if (typeof source[key] === "object") {
        if (typeof target[key] !== "object") {
          return false;
        }

        // 如果两者都是对象，递归调用进行深度比较
        // 要确保传递给_deepEqual方法的参数是非null的对象，否则Reflect.ownKeys会抛出错误
        if (!partialDeepEqual(source[key], target[key])) {
          return false;
        }
      } else {
        if (source[key] !== target[key]) {
          return false;
        }
      }
    }

    return true;
  }

})();

// var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
//
// console.log(hemingqiao.uniqWith(objects, (a, b) => {
//   const keysA = Object.keys(a);
//   const keysB = Object.keys(b);
//
//   if (keysA.length !== keysB.length) {
//     return false;
//   }
//   for (let key of keysA) {
//     if (a[key] !== b[key]) {
//       return false;
//     }
//   }
//   return true;
// }));
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]

