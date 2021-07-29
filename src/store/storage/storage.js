
const menuList="menuList";
const user="user";
const token="token";
const authButtonList="auth_button_list"


function addUser(obj) {
    sessionStorage.setItem(user,JSON.stringify(obj));
}

function addToken(str) {
    sessionStorage.setItem(token,str);
}

function addMenuList(list) {
    sessionStorage.setItem(menuList,JSON.stringify(list));
}

function addAuthButtonList(list) {
    sessionStorage.setItem(authButtonList,JSON.stringify(list));
}

function getUser() {
    return JSON.parse(sessionStorage.getItem(user));
}
function getToken() {
    return sessionStorage.getItem(token);
}

function getMenuList() {
    return JSON.parse(sessionStorage.getItem(menuList));
}
function getAuthButtonList() {
   return JSON.parse(sessionStorage.getItem(authButtonList));
}





function removeAll() {
    remove(token);
    remove(user);
    remove(authButtonList);
    remove(menuList);
}
function remove(obj) {
    sessionStorage.removeItem(obj);
}

export default {
    addMenuList,
    addUser,
    addToken,
    addAuthButtonList,
    getMenuList,
    getUser,
    getToken,
    getAuthButtonList,
    removeAll,
    remove,
}
