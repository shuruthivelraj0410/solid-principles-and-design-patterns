class Node {
    constructor(value, prev = null, next = null) {
        this.prev = prev;
        this.next = next;
        this.value = value
    }
}

class Cache {
    put(key, value) { };
    get(key) { };
    remove(key) { };
}

class LRU extends Cache {  // ocp principle
    constructor(capacity) {
        super();
        this.head = null;
        this.tail = null;
        this.saveCache = new Map();
        this.capacity = capacity
    }
    put(key, value) {
        let data = this.addNode(value)
        this.saveCache.set(key, data)
    }
    get(key) {
        if (this.saveCache.has(key)) {
            this.removeNode(this.saveCache.get(key))
            this.addNode(this.saveCache.get(key).value)
            return this.saveCache.get(key).value
        }
        else {
            return `no key found`
        }
    }
    remove(key) {
        if (this.saveCache.has(key)) {
            this.removeNode(this.saveCache.get(key))
            this.saveCache.delete(key)
            return "deleted successfully"
        }
        else {
            return "no key found"
        }
    }
    addNode(value) {
        let node;
        if (this.head == null) {
            node = new Node(value);
            this.head = node;
            this.tail = node;
        }
        else {
            node = new Node(value, null, this.head);
            this.head.prev = node;
            this.head = node
        }
        if (this.saveCache.size >= this.capacity) {
            let key_pos;
            for (let [key, value] of this.saveCache.entries()) {
                if (value == this.tail) {
                    key_pos = key
                }
            }
            if (key_pos) {
                this.saveCache.delete(key_pos)
            }
            this.removeNode(this.tail)
        }
        return node
    }
    display() {
        let curr = this.head;
        while (curr != null) {
            console.log(curr.value)
            curr = curr.next
        }
    }
    removeNode(node) {
        if (node == this.head) {
            this.head = node.next;
        }
        if (node == this.tail) {
            this.tail = node.prev;
        }
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev
        }

    }
}

const obj = new LRU(3);
obj.put("sh", { a: 1, b: 2 })
obj.put("shu", { a: 2, b: 3 })
obj.put("shur", { a: 3, b: 4 })
obj.put("shuru", { a: 4, b: 5 })
obj.put("shurut", { a: 5, b: 6 })
obj.display()
console.log("----------------->>>>>>>", obj.get("sh"))
console.log("********************")
obj.display()
console.log("###############", obj.head.value)
console.log("------------->>>>", obj.remove('shuru'))
obj.display()
console.log("------------->>>>", obj.remove('sh'))

