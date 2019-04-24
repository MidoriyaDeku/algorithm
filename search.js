var search = {
    sequenceSearch: sequenceSearch,     // 顺序查找
    binarySearch: binarySearch,         // 折半查找
    hashSearch: hashSearch,             // 哈希查找
    insertHash: insertHash,             // 插入哈希
    indexSearch: indexSearch,           // 索引查找
    IndexItem: IndexItem,               // 索引项实体
    insertIndexValue: insertIndexValue, // 插入索引值

    // 二叉树操作
    insertBST: insertBST, // 插入数据
    createBST: createBST, // 创建二叉树
    searchBST: searchBST, // 搜索数据
    deleteBST: deleteBST, // 删除数据
    dlrBST: dlrBST, // 先序遍历
    ldrBST: ldrBST, // 中序遍历
    lrdBST: lrdBST, // 后序遍历
};

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

/*============================================================*/
// 折半查找
// arr 待查找数组；key 要查找的元素
function binarySearch(arr, key) {
    var low = 0;    // 最低线
    var high = arr.length - 1;  // 最高线

    while (low <= high) {
        var mid = (low + high) / 2;  // 取中间值
        
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

/*============================================================*/
// 哈希查找
// hash 哈希表；hash_len 哈希表长度；key 要在哈希表查找的键值
function hashSearch(hash, hash_len, key) {
    // 哈希函数
    var hash_address = key % hash_len;

    // 指定hash_address对应值存在但不是关键值，则用开放寻址法解决
    while (hash[hash_address] !== 0 && hash[hash_address] !== key) {
        hash_address = (++hash_address) % hash_len;
    }

    // 查找到了开放单元，表示查找失败
    if (hash[hash_address] === 0) {
        return -1;
    }

    return hash_address;    // 成功找到
}

// 插入哈希
// hash 哈希表；hash_len 哈希表长度；value 要插入到哈希表的value
function insertHash(hash, hash_len, value) {
    // 哈希函数
    var hash_address = value % hash_len;

    // 如果key存在，则说明已经被别人占用，此时必须解决冲突
    while (hash[hash_address] !== undefined) {
        // 用开放寻址法找到（线性探测）
        hash_address = (++hash_address) % hash_len;
    }

    // 将value存入哈希表里
    hash[hash_address] = value;
}

/*============================================================*/
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

/*============================================================*/
// 二叉查找树结构
function BSTree(data, left, right, parent) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.parent = parent;
}

// 二叉查找树的插入操作
// bstree 查找树；data 要插入的数；
function insertBST(bstree, data) {
    var current = bstree;   // 当前节点
    var parent = null;  // 父节点
    while (true) {
        parent = current;   // 当前为父节点
        
        // 要插入的数据 小于当前节点的数据
        if (data < current.data) {
            current = current.left; // 当前节点为左节点
            if (current === null) {  // 如果当前节点为空直接插入这个节点
                parent.left = new BSTree(data, null, null, parent);
                break;
            }
        }
        else {  // 大于等于当前节点的数走这里
            current = current.right;    // 当前节点为左节点
            if (current === null) {  // 如果当前节点为空直接插入这个节点
                parent.right = new BSTree(data, null, null, parent);
                break;
            }
        }
    }
}

// 创建二叉查找树
// list 要创建的数据表
function createBST(list) {
    // 构建BST中的根节点
    var bstree = new BSTree(list[0], null, null, null);

    for (var i = 1; i < list.length; ++i) {
        insertBST(bstree, list[i]);
    }

    return bstree;
}

// 在二叉查找树中搜索指定节点的数据
// bstree 查找树；data 要在树中查找的数
function searchBST(bstree, data) {
    // 如果bstree为空，说明已经遍历到头了
    if (bstree === null) {
        return false;
    }

    // 找到了
    if (bstree.data === data) {
        return true;
    }

    if (data < bstree.data) {
        return searchBST(bstree.left, data);
    }
    else {
        return searchBST(bstree.right, data);
    }
}

// 先序遍历二叉查找树
// bstree 查找树
function dlrBST(bstree) {
    if (bstree != null)
    {
        // 输出节点数据
        console.log(bstree.data + "");

        // 遍历左子树
        dlrBST(bstree.left);

        // 遍历右子树
        dlrBST(bstree.right);
    }
}

// 中序遍历二叉查找树
// bstree 查找树
function ldrBST(bstree) {
    if (bstree != null)
    {
        // 遍历左子树
        ldrBST(bstree.left);

        // 输出节点数据
        console.log(bstree.data + "");

        // 遍历右子树
        ldrBST(bstree.right);
    }
}

// 后序遍历二叉查找树
// bstree 查找树
function lrdBST(bstree) {
    if (bstree != null)
    {
        // 遍历左子树
        lrdBST(bstree.left);

        // 遍历右子树
        lrdBST(bstree.right);

        // 输出节点数据
        console.log(bstree.data + "");
    }
}

// 删除二叉排序树中指定key节点
// bstree 查找树；key 要删除的key节点
function deleteBST(bstree, data) {
    if (bstree === null) {
        return;
    }

    if (bstree.data === data) {
        // 第一种情况：叶子节点
        if (bstree.left === null && bstree.right === null) {
            if (bstree.data < bstree.parent.data) {
                bstree.parent.left = null;
            }
            else {
                bstree.parent.right = null;
            }
            delete bstree;
            bstree = null;
            return;
        }
        // 第二种情况：左子树不为空
        if (bstree.left !== null && bstree.right === null) {
            if (bstree.left.data < bstree.parent.data) {
                bstree.parent.left = bstree.left;
            }
            else {
                bstree.parent.right = bstree.left;
            }
            delete bstree;
            bstree = null;
            return;
        }
        // 第三种情况，右子树不为空
        if (bstree.left === null && bstree.right !== null) {
            if (bstree.right.data < bstree.parent.data) {
                bstree.parent.left = bstree.right;
            }
            else {
                bstree.parent.right = bstree.right;
            }
            delete bstree;
            bstree = null;
            return;
        }
        // 第四种情况，左右子树都不为空
        if (bstree.left !== null && bstree.right !== null) {
            var node = bstree.right; // 被删除节点的右孩子
            
            //找到右子树中的最左节点
            while (node.left !== null) {
                node = node.left;  // 遍历它的左子树
            }
            // 替换掉要删除的节点的数据（将要删除节点的右子树的最左节点的数据给它）
            bstree.data = node.data;

            // 删除节点的右节点没有左节点的时候。即上边的while循环没执行。
            if (node.parent.right === node) {
                bstree.right = node.right;
            }
            else {
                // 删除节点的右节点有左节点的时候。
                if (node.parent.left === node) {
                    node.parent.left = node.right;
                }
            }
            node = null; // 将换位到删除节点去的右子树的最左子树赋值为空。
            return;
        }
    }

    if (data < bstree.data) {
        deleteBST(bstree.left, data);
    }
    else {
        deleteBST(bstree.right, data);
    }
}

/*============================================================*/

module.exports = search;