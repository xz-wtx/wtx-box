import asyncRouter from "@/router/asyncRouter";
import storage from "@/store/storage/storage";
const state = {
    menuList:storage.findMenuList(),
    authButtonList:storage.findAuthButtonList(),
}

const mutations = {
    SET_MENU_LIST(state,obj){
        state.menuList=obj;
        storage.saveMenuList(obj);
        //加载路由
        asyncRouter.addRouter();
    },
    SET_AUTH_BUTTON_LIST(state,obj){
        state.authButtonList=obj;
        storage.saveAuthButtonList(obj);
    },

}

const actions = {
    setMenuList(state,obj){
        state.commit("SET_MENU_LIST",obj)
    },
    setAuthButtonList(state,obj){
        state.commit("SET_AUTH_BUTTON_LIST",obj)
    }
}
const getters={
    getMenuList:state =>state.menuList,
    getAuthButtonList:state =>state.authButtonList,
}

export default {
    state,
    mutations,
    actions,
    getters
}
