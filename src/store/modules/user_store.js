import storage from "@/store/storage/storage";


const state = {
    token:storage.findToken(),
    user:storage.findUser(),
}

const mutations = {
    SET_TOKEN(state,token){
        state.token = token;
        storage.saveToken(token);
    },
    SET_USER(state,user){
        state.user = user;
        storage.saveUser(user)
    }
}

const actions = {
    setToken(state,token){
        state.commit('SET_TOKEN',token)
    },
    setUser(state,token){
        state.commit('SET_USER',token)
    },
}
const getters={
        geToken:state => state.token,
        getUser:state => state.user,
}

export default {
    state,
    mutations,
    actions,
    getters
}

