const {getBlockchain, addToBlockchain} = require ('./store');
const Block = require('./Block');

const initiateBlockchain = () => {
    return addToBlockchain(new Block(0, {ip: "Genesis block", coins: 0}, "0"));
}

const checkBlockchainValidity = () => {
    const currentChain = getBlockchain();
    for(let i = 1; i < currentChain.length; i++) {
        const currentBlock = currentChain[i];
        const previousBlock = currentChain[i - 1];

        if (currentBlock.hash !== currentBlock.calculateHash()) {
            return false;
        }

        if (currentBlock.previousHash !== previousBlock.hash) {
            return false;
        }
    }

    return true;
}

const addBlock = (payload) => {
    if(!getBlockchain().length)
    {
        initiateBlockchain();
    }
    const lastBlock = getBlockchain()[getBlockchain().length - 1];
    const newBlock = new Block(lastBlock.index + 1, payload, lastBlock.hash);
    addToBlockchain(newBlock);
    return newBlock;
}

module.exports = {
    getBlockchain, addBlock, initiateBlockchain, checkBlockchainValidity
}