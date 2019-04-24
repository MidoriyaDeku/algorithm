// 索引项实体
function IndexItem(index, start, len) {
    this.index = index; // 对应主表的值
    this.start = start; // 主表记录区间段的开始位置
    this.len = len;     // 主表记录区间段的长度
}

// 学生主表
var students = [ 
    101, 102, 103, 104, 105, 0, 0, 0, 0, 0,
    201, 202, 203, 204, 0, 0, 0, 0, 0, 0,
    301, 302, 303, 0, 0, 0, 0, 0, 0, 0
];

// 学生索引表
var index_item = [ 
    new IndexItem(1, 0, 5),
    new IndexItem(2, 10, 4),
    new IndexItem(3, 20, 3),
];

// 索引查找
// key 要查找的key
function indexSearch(key) {
    var item = null;

    // 建立索引规则
    var index = Math.floor(key / 100);

    // 首先去索引找
    for (var i = 0, len = index_item.length; i < len; ++i) {
        if (index_item[i].index === index) {
            item = new IndexItem(index_item[i].index, index_item[i].start, index_item[i].len);
            break;
        }
    }

    // 如果item为null，则说明在索引中查找失败
    if (item === null) {
        return -1;
    }
    
    for (var i = item.start, len = item.start + item.len; i < len; ++i) {
        if (students[i] === key) {
            return i;
        }
    }

    return -1;
}

// 插入数据
// key 要插入的key
function insertIndexValue(value) {
    var item = null;

    // 建立索引规则
    var index = Math.floor(value / 100);
    
    var i = 0;
    for (i = 0, len = index_item.length; i < len; ++i) {
        // 获取到了索引
        if (index_item[i].index === index) {
            item = new IndexItem(index_item[i].index, index_item[i].start, index_item[i].len);
            break;
        }
    }
    // 如果item为null，则说明在索引中插入失败
    if (item === null) {
        return -1;
    }

    students[item.start + item.len] = value; // 更新主表
    index_item[i].len++; // 更新索引表

    return 1;
}

console.time("indexSearch");
var index = indexSearch(105);
console.timeEnd("indexSearch");

if (index !== -1) {
    console.log("find index: ", index);
}
else {
    console.log("not found!");
}