// Testing kar raha tha trying to get the data from this file and store it in the database. 

const SHA256 = require('sha256')

class Block {
    constructor(index, timestamp, data, prevHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = prevHash;
        this.hash = this.calculateHash();
        // this.nonce = 0;        
    }

    calculateHash() {        
        return SHA256((this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString());
    }

    // mineBlock(difficulty) {
    // }
}

module.exports = {Block};
