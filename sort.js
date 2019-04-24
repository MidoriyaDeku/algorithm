var sort = {
    bubbleSort: bubbleSort,         // 冒泡排序
    selectionSort: selectionSort,   // 直接选择排序
    insertSort: insertSort,         // 直接插入排序
    shellSort: shellSort,           // 希尔排序
    heapSort: heapSort,             // 堆排序
    quickSort: quickSort,           // 快速排序
    mergeSortRecursion: mergeSortRecursion, // 归并排序（递归实现）
    mergeSortIteration: mergeSortIteration, // 归并排序（迭代实现）
};

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

/*============================================================*/
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

/*============================================================*/
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

/*============================================================*/
// 构建堆
// arr 待排序的数组；parent 父节点；len 输出根堆时剔除最大值使用
function _heapAdjust(arr, parent, len) {
    // 保存当前父亲节点
    var temp = arr[parent];

    // 得到左孩子（这是二叉树的定义）
    var child = 2 * parent + 1;

    while (child < len) {
        // 如果parent有右孩子，则要判断左孩子是否小于右孩子
        if (child + 1 < len && arr[child] < arr[child + 1]) {
            ++child;
        }

        // 父亲节点大于子节点，就不用做交换
        if (temp >= arr[child]) {
            break;
        }

        // 将较大子节点的值赋给父亲节点
        arr[parent] = arr[child];

        //然后将子节点做为父亲节点，已防止是否破坏根堆时重新构造
        parent = child;

        //找到该父亲节点较小的左孩子节点
        child = 2 * parent + 1;
    }
    //最后将temp值赋给较大的子节点，以形成两值交换
    arr[parent] = temp;
}

// 堆排序
// arr 待排序的数组
function heapSort(arr) {
    //arr.length / 2 - 1: 就是堆中父节点的个数
    for (var i = arr.length / 2 - 1; i >= 0; i--)
    {
        _heapAdjust(arr, i, arr.length);
    }

    //最后输出堆元素
    for (var i = arr.length - 1; i > 0; i--)
    {
        //堆顶与当前堆的第i个元素进行值对调
        var temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        //因为两值交换，可能破坏根堆，所以必须重新构造
        _heapAdjust(arr, 0, i);
    }
}

/*============================================================*/
// 快速排序
// 分割
// arr 待排序的数组；left 左索引；right 右索引
function _division(arr, left, right) {
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
        var i = _division(arr, left, right); 

        // 对基准标号左侧的一组数值进行递归的切割，以至于将这些数值完整的排序
        quickSort(arr, left, i - 1); 

        // 对基准标号右侧的一组数值进行递归的切割，以至于将这些数值完整的排序
        quickSort(arr, i + 1, right); 
    }
}

/*============================================================*/
// 归并排序
// 合并 left 分割后左边的区域；right 分割后右边的区域
function _merge(left, right) {
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
// 分割（（递归实现））
// 待排序数组
function mergeSortRecursion(arr) {
    if (arr.length === 1) {
        // 递归结束条件
        return arr;
    }
    
    var mid = arr.length / 2;       // 取出中心分割点
    var left = arr.slice(0, mid);   // 分割出来后左边的区域
    var right = arr.slice(mid);     // 分割出来后右边的区域

    // 递归进行左右两边的合并
    return _merge(mergeSortRecursion(left), mergeSortRecursion(right));
}

// 分割（迭代实现）
// arr 待排序数组
function mergeSortIteration(arr) {
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
            work[j] = _merge(work[k], work[k + 1]);
        } 
        work[j] = []; // 如果数组长度为奇数
    }

    // 返回最终数组
    return work[0];
}

/*============================================================*/
let privateTest = null;
module.exports = sort;