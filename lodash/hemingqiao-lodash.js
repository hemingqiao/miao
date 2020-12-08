/*! *****************************************************************************
@author Heming
founded at 2020-12-08 15:01:56
created by WebStorm
description: 简单实现lodash中的一些方法
***************************************************************************** */

var hemingqiao = (function () {
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

  };

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
  // /**
  //  * 创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中。该方法使用 SameValueZero做相等比较。结果值的顺序是由第一个数组中的顺序确定。
  //  * @param {number[]} array
  //  * @param values
  //  */
  // function difference(array, ...values) {
  //   const set = new Set(array);
  //   for (let value of values) {
  //     if (!Array.isArray(value)) {
  //       throw new TypeError("argument should be an array");
  //     }
  //     for (let e of value) {
  //       if (array.includes(e)) {
  //         set.delete(e);
  //       }
  //     }
  //   }
  //
  //   return [...set];
  // }


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


  /** ------------------------------- 以下辅助函数 ------------------------------- **/

  /**
   * 改变iteratee
   * @param iteratee
   * @return {(function(*): *)|*}
   */
  function transform(iteratee) {
    // 这什么鬼玩意iteratee自创的吧？？？？
    if (typeof iteratee === "string") {
      return val => val[iteratee];
    }
    if (typeof iteratee === "function") {
      return iteratee;
    }
    if (iteratee === null) {
      return val => val;
    }
    if (typeof iteratee === "object") {
      if (Array.isArray(iteratee)) {
        return function (obj) {
          return obj[iteratee[0]] === iteratee[1];
        }
      } else {
        return iterateeEqual(iteratee);
      }
    }
  }

  function iterateeEqual(source) {
    return function compare(target) {
      return deepEqual(source, target);
    }
  }

  /**
   * 简单实现深比较
   * @param a
   * @param b
   * @return {boolean}
   */
  function deepEqual(a, b) {
    const keysA = Reflect.ownKeys(a);
    const keysB = Reflect.ownKeys(b);

    if (keysA.length !== keysB.length) {
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


  /** ------------------------------- 以上辅助函数 ------------------------------- **/


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
   * 同值比较算法（sameValueZero algorithm）
   * @param a
   * @param b
   * @return {boolean}
   */
  function sameValueZero(a, b) {
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    return a !== a && b !== b;
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


  /**
   * 使用二分查找来决定 value值 应该插入到数组中 尽可能小的索引位置，以保证array的排序。
   * @param array
   * @param value
   * @return {number}
   */
  function sortedIndex(array, value) {
    let low = 0, high = array.length - 1;
    while (low <= high) {
      let mid = (low + high) >>> 1;
      if (array[mid] === value) {
        return mid;
      } else if (array[mid] > value) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return low;
  }

})();
