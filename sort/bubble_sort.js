// 冒泡排序
// arr 待排序的数组
function bubbleSort(arr) {
    var temp = null;

    // 第一层循环，比较 arr.length - 1次
    for (var i = 0, len = arr.length - 1; i < len; ++i) { 
        // 从0 开始，一直比较到len
        for (var j = 0; j < len; ++j) { 
            // 如果前一个数大于后一个数就交换
            if (arr[j] > arr[j + 1]) { 
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

var arr = [];
for (var i = 0; i < 16384; ++i) {
    arr.push(Math.floor(Math.random() * 16384 + 1));
}
console.time("bubbleSort");
bubbleSort(arr);
console.timeEnd("bubbleSort");

for (var i = 0; i < 10; ++i) {
    console.log(arr[i]);
}