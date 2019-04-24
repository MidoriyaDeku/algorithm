// 归并排序（递归实现）
// 合并 left 分割后左边的区域；right 分割后右边的区域
function merge(left, right) {
    var tmp = [];   // 临时数组
    
    // 左边区域长度不为0 并且 右边区域长度也不为0
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            // 如果左边的小于右边的，那么把左边的数添加到 tmp中 并删除
            tmp.push(left.shift());
        }
        else {
            // 否则就是右边的小于左边的，将右边的数添加到 tmp中 并删除
            tmp.push(right.shift());
        }
    }
    
    // 将左边跟右边剩余的元素连接到 tmp后面 并返回
    return tmp.concat(left, right);
}
// 分割
function mergeSort(arr) {
    if (arr.length === 1) {
        // 递归结束条件
        return arr;
    }
    
    var mid = arr.length / 2;       // 取出中心分割点
    var left = arr.slice(0, mid);   // 分割出来后左边的区域
    var right = arr.slice(mid);     // 分割出来后右边的区域

    // 递归进行左右两边的合并
    return merge(mergeSort(left), mergeSort(right));
}
/*----------------------------------------------------------*/
// 归并排序（迭代实现）
// 合并 left 分割后左边的区域；right 分割后右边的区域
function merge1(left, right) {
    var result = [];    // 临时数组，存放排序好的结果
  
    // 左边区域长度不为0 并且 右边区域长度也不为0
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            // 如果左边的小于右边的，那么把左边的数添加到 tmp中 并删除
            result.push(left.shift());
        }
        else {
             // 否则就是右边的小于左边的，将右边的数添加到 tmp中 并删除
            result.push(right.shift());
        }
    }
  
    // 将左边跟右边剩余的元素连接到 tmp后面 并返回
    return result.concat(left, right);
}
// 分割
function mergeSort1(arr) {
    if (arr.length === 1) {
        // 分割到长度为1 就返回了
        return arr;
    }
  
    var work = [];
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        work.push([arr[i]]);    // 将arr的所有数据添加进来
    }
    work.push([]); // 如果数组长度为奇数
  
    for (var lim = len; lim > 1; lim = (lim + 1) / 2) {
        var j = 0;
        for (var k = 0; k < lim; j++, k += 2) {
            work[j] = merge1(work[k], work[k + 1]);
        } 
        work[j] = []; // 如果数组长度为奇数
    }

    // 返回最终数组
    return work[0];
}

var arr = [];
for (var i = 0; i < 16384; ++i) {
    arr.push(Math.floor(Math.random() * 16384 + 1));
}
console.time("mergeSort1");
var temp = mergeSort1(arr);
console.timeEnd("mergeSort1");
/*console.time("mergeSort");
var temp = mergeSort(arr);
console.timeEnd("mergeSort");*/

for (var i = 0; i < 10; ++i) {
    console.log(temp[i]);
}