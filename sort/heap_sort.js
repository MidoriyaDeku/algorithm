// 构建堆
// arr 待排序的数组；parent 父节点；len 输出根堆时剔除最大值使用
function heapAdjust(arr, parent, len) {
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
        heapAdjust(arr, i, arr.length);
    }

    //最后输出堆元素
    for (var i = arr.length - 1; i > 0; i--)
    {
        //堆顶与当前堆的第i个元素进行值对调
        var temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        //因为两值交换，可能破坏根堆，所以必须重新构造
        heapAdjust(arr, 0, i);
    }
}
// 堆排序
// arr 待排序的数组；top 前K大
function heapSort1(arr, top) {
    var top_arr = [];

    //arr.length / 2 - 1: 就是堆中父节点的个数
    for (var i = arr.length / 2 - 1; i >= 0; i--)
    {
        heapAdjust(arr, i, arr.length);
    }

    //最后输出堆元素
    for (var i = arr.length - 1; i >= arr.length - top; i--)
    {
        //堆顶与当前堆的第i个元素进行值对调
        var temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        top_arr.push(temp);

        //因为两值交换，可能破坏根堆，所以必须重新构造
        heapAdjust(arr, 0, i);
    }

    return top_arr;
}

var arr = [];
for (var i = 0; i < 16384; ++i) {
    arr.push(Math.floor(Math.random() * 16384 + 1));
}
console.time("heapSort");
heapSort(arr);
console.timeEnd("heapSort");

for (var i = 0; i < 10; ++i) {
    console.log(arr[i]);
}

/*console.time("heapSort1");
var top_arr = heapSort1(arr, 10);
console.timeEnd("heapSort1");

for (var i = 0; i < top_arr.length; ++i) {
    console.log(top_arr[i]);
}*/