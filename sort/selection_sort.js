// 直接选择排序
// arr 待排序的数组
function selectionSort(arr) {
    var min_index = null;
    var temp = null;

    // 要遍历的次数
    for (var i = 0, len = arr.length - 1; i < len; ++i) {   
        min_index = i;  // 先认为第 i个数是最小的

        for (var j = i + 1; j < len + 1; ++j) {
            // 如果第 j个数比第 i个数还小，那么就把j 的索引赋值给 min_index
            if (arr[j] < arr[min_index]) { 
                min_index = j;
            }
        }

        // 最终找到最小的数的索引, 执行值的互换
        temp = arr[i];
        arr[i] = arr[min_index];
        arr[min_index] = temp;
    }
}

var arr = [];
for (var i = 0; i < 16384; ++i) {
    arr.push(Math.floor(Math.random() * 16384 + 1));
}
console.time("selectionSort");
selectionSort(arr);
console.timeEnd("selectionSort");

for (var i = 0; i < 10; ++i) {
    console.log(arr[i]);
}