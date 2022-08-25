const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    // Your code here
    this.count = 0
    this.capacity = numBuckets
    this.data = new Array(numBuckets).fill(null)

  }

  hash(key) {
    // Your code here
    let temp = sha256(key).slice(0, 8)
    let hash = parseInt(temp, 16)
    return hash
    console.log(temp)

  }

  hashMod(key) {
    // Your code here
    return this.hash(key) % this.capacity
  }

  insertNoCollisions(key, value) {
    // Your code here
    const newNode = new KeyValuePair(key, value)
    let index = this.hashMod(key)
    if (this.data[index] === null) {
      this.data[index] = newNode
    } else {
      throw new Error("hash collision or same key/value pair already exists!")
    }
    this.count++
    return index
  }

  insertWithHashCollisions(key, value) {
    // Your code here
    const newNode = new KeyValuePair(key, value)
    let index = this.hashMod(key)
    if (this.data[index] === null) {
      this.data[index] = newNode
    } else {
      let curr = this.data[index]
      this.data[index] = newNode
      this.data[index].next = curr

    }
    this.count++
    return index
  }

  insert(key, value) {
    // Your code here
    const newNode = new KeyValuePair(key, value)
    let index = this.hashMod(key)
    if (this.data[index] === null) {
      this.data[index] = newNode
      this.count++
    } else {
      let curr = this.data[index]
      while (curr) {
        if (curr.key === key) {
          curr.value=value
          return this
        }
        curr = curr.next
      }
        let temp = this.data[index]
        this.data[index] = newNode
        this.data[index].next = temp
        this.count++
    }
    return this
  }

}


module.exports = HashTable;