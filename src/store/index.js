import { createStore } from "vuex";

export default createStore({
  state: {
    clearData:{bool:false,path:''},
    token:sessionStorage.getItem("token"),
    menuList:sessionStorage.getItem("menuList"),
  },
  mutations: {
    SET_CLEAR_DATA(state,obj){
      state.clearData = obj
    },
    SET_MENU_LIST(state,obj){
      state.menuList=obj
      sessionStorage.setItem("menuList",obj);
    },
    SET_TOKEN(state,token){
      state.token = token;
      sessionStorage.setItem("token",token);
    }
  },
  actions: {
    setClearData(state,obj){
      state.commit('SET_CLEAR_DATA',obj)
    },
    setToken(state,token){
      state.commit('SET_TOKEN',token)
    },
    setMenuList(state,obj){
      state.commit("SET_MENU_LIST",obj)
    }
  },
  getters: {
    getClearData:state => state.clearData,
    getToken:state => state.token,
    getMenuList:state =>state.menuList,
  },
  modules: {},
});
