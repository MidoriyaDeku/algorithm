var sorts = require("../sort.js");

// 顺序查找
// arr 待查找数组；key 要查找的元素
function sequenceSearch(arr, key) {
    for (var i = 0; i < arr.length; ++i) {
        if (key === arr[i]) {
            return i;
        }
    }

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

console.time("sequenceSearch");
var index = sequenceSearch(arr, key);
if (index != -1) {
    console.log("found index: ", index);
}
else {
    console.log("not found!");
}
console.timeEnd("sequenceSearch");
