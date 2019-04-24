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
    /*
                60
            30      80
          10 35   70  120
            20       90
    */

    if (data < bstree.data) {
        deleteBST(bstree.left, data);
    }
    else {
        deleteBST(bstree.right, data);
    }
}

var list = [60, 30, 80, 10, 120, 90, 70, 20, 35];
var data = 20;
var bstree = createBST(list);
console.log("-----中序遍历-----");
ldrBST(bstree);
console.log("-----中序遍历-----");

/*var is_include = searchBST(bstree, data);
console.log(data, "是否包含在二叉树中: ", is_include);*/

/*var del_value = 60;
deleteBST(bstree, del_value);
console.log("删除二叉树中的", del_value);
console.log("-----中序遍历-----");
ldrBST(bstree);
console.log("-----中序遍历-----");*/