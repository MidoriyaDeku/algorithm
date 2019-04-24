// 希尔排序
// arr 待排序的数组
function shellSort(arr) {
    var step = arr.length / 2; // 取增量
    var temp = null;
    var len = arr.length;
    
    while (step >= 1) {
        // 无序序列
        for (var i = step; i < len; ++i) {
            temp = arr[i];
            var j = i - step;

            // 有序序列
            while (j >= 0 && temp < arr[j]) {
                arr[j + step] = arr[j];
                j = j - step;
            }
            arr[j + step] = temp;
        }
        step = step / 2;
    } 
}

var arr = [];
for (var i = 0; i < 16384; ++i) {
    arr.push(Math.floor(Math.random() * 16384 + 1));
}
console.time("shellSort");
shellSort(arr);
console.timeEnd("shellSort");

for (var i = 0; i < 10; ++i) {
    console.log(arr[i]);
}