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
      return val => {
        let ret = val;
        for (let prop of splited) {
          ret = ret[prop];
        }
        return ret;
      }
    }
    if (typeUtils.isFunction(iteratee)) {
      return iteratee;
    }
    if (typeUtils.isNull(iteratee)) {
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


  /**
   * 简单实现深比较
   * @param a
   * @param b
   * @return {boolean}
   */
  function deepEqual(a, b) {
    const keysA = Reflect.ownKeys(a);
    const keysB = Reflect.ownKeys(b);

    if (keysA.length > keysB.length) {
      return false;
    }
    for (let key of keysA) {
      if (!keysB.includes(key)) {
        return false;
      }
    }
    for (let key of keysA) {
      let val = a[key];
      if (val === null) {
        if (b[key] !== val) {
          return false;
        }
      } else if (typeof val === "object") {
        if (typeof b[key] !== "object") {
          return false;
        }
        if (!deepEqual(val, b[key])) {
          return false;
        }
      } else {
        if (val !== b[key]) {
          return false;
        }
      }
    }
    return true;
  }

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
    every,
    filter,
    find,
    toArray,
    intersection,
    intersectionBy,
    intersectionWith,
    max,
    maxBy,
    min,
    minBy,
    sum,
    sumBy,
    nth,
    pull,
    pullAll,
    pullAllBy,
    pullAllWith,
    union,
    unionBy,
    unionWith,
    map,
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
    matches,
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


  // /**
  //  * 使用二分查找来决定 value值 应该插入到数组中 尽可能小的索引位置，以保证array的排序。
  //  * 要求数组不能有重复元素
  //  * @param array
  //  * @param value
  //  * @return {number}
  //  */
  // function sortedIndex(array, value) {
  //   let low = 0, high = array.length - 1;
  //   while (low <= high) {
  //     let mid = (low + high) >>> 1;
  //     if (array[mid] === value) {
  //       return mid;
  //     } else if (array[mid] > value) {
  //       high = mid - 1;
  //     } else {
  //       low = mid + 1;
  //     }
  //   }
  //   return low;
  // }


  /**
   * 采取暴力破解
   * 将 value 值插入到有序数组中 尽可能小的索引位置，以保证array的排序。
   * @param array
   * @param value
   * @return {number|*}
   */
  function sortedIndex(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] >= value) {
        return i;
      }
    }
    return array.length;
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
      res = {};
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
    return typeUtils.isNumber(value) && (value <= Number.MAX_SAFE_INTEGER && value >= Number.MIN_SAFE_INTEGER);
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


  function matches(source) {
    return partialDeepEqual.bind(null, source);
  }

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
