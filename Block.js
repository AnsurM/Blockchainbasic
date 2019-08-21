const SHA256 = require('sha256')

class Block {
    constructor(index, data, prevHash) {
        this.index = index;
        this.timestamp = new Date().getTime();
        this.data = data;
        this.previousHash = prevHash;
        this.hash = this.calculateHash();
        // this.nonce = 0;        
    }

    calculateHash() {        
        return SHA256((this.index + this.previousHash + this.timestamp + this.data).toString());
    }

    // mineBlock(difficulty) {
    // }
}

module.exports = Block;