function storeUser(user) {
    localStorage.setItem('User', JSON.stringify(user));
}

function getCurrentUser() {
    const user = localStorage.getItem('User');
    if (user) {
        return JSON.parse(user);
    }
    return {}
}

function removeCurrentUser() {
    localStorage.removeItem('User');
}

export default {
    storeUser,
    getCurrentUser,
    removeCurrentUser
};