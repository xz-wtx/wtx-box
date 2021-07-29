
const menuList="menuList";
const user="user";
const token="token";
const authButtonList="auth_button_list"


function saveUser(obj) {
    sessionStorage.setItem(user,JSON.stringify(obj));
}

function saveToken(str) {
    sessionStorage.setItem(token,str);
}

function saveMenuList(list) {
    sessionStorage.setItem(menuList,JSON.stringify(list));
}

function saveAuthButtonList(list) {
    sessionStorage.setItem(authButtonList,JSON.stringify(list));
}

function findUser() {
    return JSON.parse(sessionStorage.getItem(user));
}
function findToken() {
    return sessionStorage.getItem(token);
}

function findMenuList() {
    return JSON.parse(sessionStorage.getItem(menuList));
}
function findAuthButtonList() {
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
    saveMenuList,
    saveUser,
    saveToken,
    saveAuthButtonList,
    findMenuList,
    findUser,
    findToken,
    findAuthButtonList,
    removeAll,
    remove,
}
