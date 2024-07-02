import { createStore } from 'vuex'
import cookie from "js-cookie";

export default createStore({
  state: {
    userdata: null
  },
  mutations: {
    SET_LOGIN(state, payload){
      state.userdata = payload;
    },
    SET_LOGOUT(state){
      cookie.remove("userdata")
      state.userdata = null;
    }
  },
  actions: {
    logout({commit}, router){
      if(confirm('Apakah anda yakin akan logout?')){
        commit('SET_LOGOUT')
        window.location.reload();
      }
    }
  },
})
