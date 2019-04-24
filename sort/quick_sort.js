// 分割
// arr 待排序的数组；left 左索引；right 右索引
function division(arr, left, right) {
    var base = arr[left]; // 首先选一个基数

    while (left < right) {
        // 从数组的右端开始向前找，一直找到比base 小的数为止（包括base 同等数）
        while (left < right && arr[right] >= base) { 
            --right;
        }
        // 最终找到了比base 小的元素，把它放到base 的位置
        arr[left] = arr[right]; 

        // 从数组的左端开始向后找，一直找到比base 大的数为止（包括base 同等数）
        while (left < right && arr[left] <= base) { 
            ++left;
        }
        // 最终找到了比base 大的元素，把它放到base 的位置
        arr[right] = arr[left]; 
    }
    // 最后把base 放到该left 的位置
    arr[left] = base; 

    // 返回下次分割的基准标号
    return left; 
}

// 快排
// arr 待排序的数组；left 左索引；right 右索引
function quickSort(arr, left, right) {
    // 左下标一定小于右下标，否则就超越了
    if (left < right) { 
        // 对数组进行分割，取出下次分割的基准标号
        var i = division(arr, left, right); 

        // 对基准标号左侧的一组数值进行递归的切割，以至于将这些数值完整的排序
        quickSort(arr, left, i - 1); 

        // 对基准标号右侧的一组数值进行递归的切割，以至于将这些数值完整的排序
        quickSort(arr, i + 1, right); 
    }
}
// 快排
// arr 待排序的数组；left 左索引；right 右索引；top 前K大
function quickSort1(arr, left, right, top) {
    // 左下标一定小于右下标，否则就超越了
    if (left < right) { 
        // 对数组进行分割，取出下次分割的基准标号
        var i = division(arr, left, right); 

        // 对基准标号右侧的一组数值进行递归的切割，以至于将这些数值完整的排序
        quickSort(arr, i + 1, right, top); 

        var top_arr = [];
        for (var j = arr.length - 1; j >= arr.length - top; --j) {
            top_arr.push(arr[j]);
        }
        return top_arr;
    }
}

var arr = [];
for (var i = 0; i < 16384; ++i) {
    arr.push(Math.floor(Math.random() * 16384 + 1));
}
console.time("quickSort");
quickSort(arr, 0, arr.length - 1);
console.timeEnd("quickSort");

for (var i = 0; i < 10; ++i) {
    console.log(arr[i]);
}

/*console.time("quickSort1");
var top_arr = quickSort1(arr, 0, arr.length - 1, 10);
console.timeEnd("quickSort1");

for (var i = 0; i < top_arr.length; ++i) {
    console.log(top_arr[i]);
}*/