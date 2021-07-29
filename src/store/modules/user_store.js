const state = {
    token:sessionStorage.getItem("token"),
    user:sessionStorage.getItem("user"),
}

const mutations = {
    SET_TOKEN(state,token){
        state.token = token;
        sessionStorage.setItem("token",token);
    }
}

const actions = {
    setToken(state,token){
        state.commit('SET_TOKEN',token)
    },
}
const getters={
        geToken:state => state.token,
}

export default {
    state,
    mutations,
    actions,
    getters
}

