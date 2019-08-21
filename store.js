var store = require('store');

const resetStore = () => {
    store.clearAll();
    return store;
}

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

const returnBlockchain = () => {
    return getStoreData('blockchain') ? getStoreData('blockchain') : [];
}

const addToBlockchain = (payload) => {
    let currentChain = returnBlockchain() ? returnBlockchain() : [];
    currentChain.push(payload);
    setStoreData('blockchain', currentChain);
    return payload
}

module.exports = {
    getUsers,
    addUser,
    returnBlockchain,
    addToBlockchain,
    resetStore
}