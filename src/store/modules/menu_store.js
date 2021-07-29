import asyncRouter from "@/router/asyncRouter";

const state = {
    menuList:sessionStorage.getItem("menuList"),
}

const mutations = {
    SET_MENU_LIST(state,obj){
        state.menuList=obj;
        sessionStorage.setItem("menuList",obj);
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
