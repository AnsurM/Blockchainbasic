const SHA256 = require('sha256')

const {returnBlockchain, addToBlockchain} = require ('./store');
const Block = require('./Block');

const initiateBlockchain = () => {
    return addToBlockchain(new Block(0, {ip: "Genesis block", coins: 0}, "0"));
}

const calculateHash = (block) => {        
    return SHA256((block.index + block.previousHash + block.timestamp + block.data).toString());
}

const getBlockchain = () => {
    const currentChain = returnBlockchain();
    if(checkBlockchainValidity(currentChain))
    {
        return currentChain;
    }
    else
    {
        return("Blockchain is fabricated..");
    }
}

const checkBlockchainValidity = (chain) => {
    const currentChain = chain;
    for(let i = 1; i < currentChain.length; i++) {
        const currentBlock = currentChain[i];
        const previousBlock = currentChain[i - 1];

        if (currentBlock.hash !== calculateHash(currentBlock)) {
            console.log("Statement 1 error")
            return false;
        }

        if (currentBlock.previousHash !== previousBlock.hash) {
            console.log("Statement 2 error")
            return false;
        }
    }
    // console.log("Blockchain valid hai boss")
    return true;
}

const addBlock = (payload) => {
    if(!getBlockchain().length)
    {
        initiateBlockchain();
    }
    const lastBlock = getBlockchain()[getBlockchain().length - 1];
    const newBlock = new Block(lastBlock.index + 1, payload, lastBlock.hash);

    if(newBlock.hash === calculateHash(newBlock))
    {
        return addToBlockchain(newBlock);
    }
    return 'This chain has been fabricated..';
}

module.exports = {
    getBlockchain, addBlock, initiateBlockchain, checkBlockchainValidity
}