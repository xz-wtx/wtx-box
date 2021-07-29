import asyncRouter from "@/router/asyncRouter";
import storage from "@/store/storage/storage";
const state = {
    menuList:storage.getMenuList(),
}

const mutations = {
    SET_MENU_LIST(state,obj){
        state.menuList=obj;
        storage.addMenuList(obj);
        //加载路由
        asyncRouter.addRouter();
    },
}

const actions = {
    setMenuList(state,obj){
        state.commit("SET_MENU_LIST",obj)
    }
}
const getters={
    getMenuList:state =>state.menuList,
}

export default {
    state,
    mutations,
    actions,
    getters
}
