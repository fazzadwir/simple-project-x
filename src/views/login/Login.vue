<template>
  <div class="login_box">
    <div class="two_view">
      <div class="left"></div>
      <div class="right">
        <div class="form_container">
          <span class="logo">
            <img src="../../assets/img/tokox_logo.png" alt="tokox_logo">
          </span>
          <form @submit.prevent="submit">
            <input type="text" v-model="email" placeholder="Masukkan Email">
            <input type="password" v-model="password" placeholder="Masukkan password">
            <div class="btn_group">
              <button class="btn_primary">Masuk</button>
              <button class="btn_secondary"@click="routeToRegisterPage">Daftar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from "js-cookie";
  export default{
    name: 'Login',
    data(){
      return{
        email: '',
        password: ''
      }
    },
    methods: {
      reset(){
        this.email = "";
        this.password = "";
      },
      submit(){
        if(!this.email || !this.password){
          this.$Swal.fire({
            title: "Isi Semua Form!",
          });
          return;
        }

        if(this.password.length < 4){
        this.$Swal.fire({
            title: "Password minimal 4 karakter!",
        });
        return;
      }

      if(!this.email.includes("@") || !this.email.includes(".")){
        this.$Swal.fire({
            title: "Email salah!",
        });
        return;
      }

        this.$axios.post("auth/login", {
           email: this.email,
           password: this.password
        }).then(response => {
          // console.log(response)
          this.getDataUser(response.data)
        }).catch(error => {
          if(error.response.data.message){
            this.$Swal.fire({
              icon: "error",
              title: error.response.data.message,
            });
          }else{
            this.$Swal.fire({
              icon: "error",
              title: "Terjadi kesalahan!",
            });
          }
        })
      },
      getDataUser(data){
        this.$axios.get("auth/profile", {
           headers:{
              Authorization: 'Bearer ' + data.access_token
           }
        }).then(response => {
          console.log('resProfile', response)
          let userdata = Object.assign(response.data, data)
          let forcookie = JSON.stringify(userdata)
          cookie.set("userdata", forcookie, {expires: 1});
          // 1 = 1 jam
          this.$store.commit('SET_LOGIN', forcookie)
          this.$Swal.fire({
            title: "Login Berhasil!",
            icon: "success"
          });
          this.$router.push({path: '/product'})
        })
      },
      routeToRegisterPage(){
        this.$router.push({ name: 'register' });
      }
    }
  }
</script>
