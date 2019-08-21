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

// class Blockchain{
//     constructor() {
//         this.chain = [this.createGenesis()];
//     }

//     createGenesis() {
//         return new Block(0, "01/01/2017", {data: "Genesis block", coins: 0}, "0");
//     }

//     latestBlock() {
//         return this.chain[this.chain.length - 1]
//     }

//     addBlock(newBlock){
//         newBlock.previousHash = this.latestBlock().hash;
//         newBlock.hash = newBlock.calculateHash();
//         newBlock.index = this.latestBlock().index + 1;
//         this.chain.push(newBlock);
//     }

//     checkValid() {
//         for(let i = 1; i < this.chain.length; i++) {
//             const currentBlock = this.chain[i];
//             const previousBlock = this.chain[i - 1];

//             if (currentBlock.hash !== currentBlock.calculateHash()) {
//                 return false;
//             }

//             if (currentBlock.previousHash !== previousBlock.hash) {
//                 return false;
//             }
//         }

//         return true;
//     }
// }

// let jsChain = new Blockchain();
// jsChain.addBlock(new Block("12/25/2017", {amount: 5}));
// jsChain.addBlock(new Block("12/26/2017", {amount: 10}));

// console.log(JSON.stringify(jsChain, null, 4));
// console.log("Is blockchain valid? " + jsChain.checkValid());
// var d=jsChain;

// module.exports = {
//     Block:Block,
//     d:d,
//     Blockchain:Blockchain
    
// }