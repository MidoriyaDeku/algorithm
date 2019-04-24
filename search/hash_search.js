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

var hash = {};
var key = 16384 / 2;
for (var i = 0; i < 8192; ++i) {
    insertHash(hash, 16384, Math.floor(Math.random() * 16384 + 1));
}
for (var i = 0; i < 8192; ++i) {
    insertHash(hash, 16384, 0);
}

console.time("hashSearch");
var index = hashSearch(hash, Object.keys(hash).length, key);
if (index !== -1) {
    console.log("found index: ", index);
}
else {
    console.log("not found!");
}
console.timeEnd("hashSearch");