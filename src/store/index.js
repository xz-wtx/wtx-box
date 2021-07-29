import { createStore } from "vuex";
import menu from "@/store/modules/user_store";
import user from "@/store/modules/menu_store"
export default createStore({
  state: {
    clearData:{bool:false,path:''},
  },
  mutations: {
    SET_CLEAR_DATA(state,obj){
      state.clearData = obj
    },

  },
  actions: {
    setClearData(state,obj){
      state.commit('SET_CLEAR_DATA',obj)
    },


  },
  getters: {
    getClearData:state => state.clearData,

  },
  modules: {
    menu,
    user
  },
});
