import { createStore } from 'vuex'
import cookie from "js-cookie";
import Swal from 'sweetalert2';

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
      // if(confirm('Apakah anda yakin akan logout?')){
      //   commit('SET_LOGOUT')
      //   window.location.reload();
      // }

      Swal.fire({
        title: "Apakah Anda yakin?",
        showDenyButton: true,
        confirmButtonText: "Tidak",
        denyButtonText: `Ya`
      }).then((result) => {
        if (result.isDenied) {
          commit('SET_LOGOUT')
          Swal.fire({
            title: "Anda Keluar!",
            showConfirmButton: false
          }).then(window.location.reload())
        }
      });
    }
  },
})
