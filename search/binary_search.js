var sorts = require("../sort.js");

// 折半查找
// arr 待查找数组；key 要查找的元素
function binarySearch(arr, key) {
    var low = 0;    // 最低线
    var high = arr.length - 1;  // 最高线

    while (low <= high) {
        var mid = Math.floor((low + high) / 2);  // 取中间值
        // 找到了直接返回该位置的索引
        
        if (arr[mid] === key) {
            return mid;
        }
        else {
            if (arr[mid] > key) {
                high = mid - 1; // 下降一半
            }
            else {
                low = mid + 1;  // 上升一半
            }
        }
    }
    // 未找到
    return -1;
}

var arr = [];
var key = 16384 / 2;
for (var i = 0; i < 16384; ++i) {
    arr.push(Math.floor(Math.random() * 16384 + 1));
}

console.time("quickSort");
sorts.quickSort(arr, 0, arr.length - 1);
console.timeEnd("quickSort");

console.time("binarySearch");
var index = binarySearch(arr, key);
if (index !== -1) {
    console.log("found index: ", index);
}
else {
    console.log("not found!");
}
console.timeEnd("binarySearch");
