var store = require('store');


const setStoreData = (variable, data) => {
    store.set(variable, data);
    return getStoreData(variable);
}

const getStoreData = (variable) => {
    return store.get(variable);
}

const getUsers = () => {
    return getStoreData('users') ? getStoreData('users') : [];
}

const addUser = (ip) => {
    const currentUsers = getUsers();
    currentUsers.push({id: currentUsers.length, ip: ip});
    setStoreData('users', currentUsers);
    return getUsers();
}

const getBlockchain = () => {
    return getStoreData('blockchain') ? getStoreData('blockchain') : [];
}

const addToBlockchain = (payload) => {
    let currentChain = getBlockchain() ? getBlockchain() : [];
    currentChain.push(payload);
    setStoreData('blockchain', currentChain);
    return getBlockchain();
}

module.exports = {
    getUsers,
    addUser,
    getBlockchain,
    addToBlockchain
}