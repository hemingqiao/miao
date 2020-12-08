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
    lastIndexOf
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
    const copy = array.slice();
    for (let value of values) {
      if (!Array.isArray(value)) {
        throw new TypeError("argument should be an array");
      }
      for (let e of value) {
        // 排除掉重复的元素
        while (copy.includes(e)) {
          copy[copy.indexOf(e)] = null;
        }
      }
    }

    for (let e of copy) {
      if (e) res.push(e);
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
    // const set = new Set(copy);
    // for (let e of set) {
    //   if (!res.includes(iteratee(e))) set.delete(e);
    // }
    // return [...set];
  }

  // 只判断字符串和函数
  function transform(iteratee) {
    if (typeof iteratee === "string") {
      return val => val[iteratee];
    }
    if (typeof iteratee === "function") return iteratee;
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

})();

let res = hemingqiao.differenceBy([{"x":2},{"x":1}],[{"x":1}],"x");
console.log(res);
