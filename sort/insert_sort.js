// 直接插入排序
// arr 待排序的数组
function insertSort(arr) {
    var temp = null;
    // 无序序列
    for (var i = 1, len = arr.length; i < len; ++i) {
        temp = arr[i];
        var j = null;

        // 有序序列
        for (j = i - 1; j >= 0 && temp < arr[j]; --j) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = temp;
    }
}

var arr = [];
for (var i = 0; i < 16384; ++i) {
    arr.push(Math.floor(Math.random() * 16384 + 1));
}
console.time("insertSort");
insertSort(arr);
console.timeEnd("insertSort");

for (var i = 0; i < 10; ++i) {
    console.log(arr[i]);
}