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
            <input type="text" v-model="email" placeholder="Enter your username">
            <input type="password" v-model="password" placeholder="Enter your password">
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
        this.$axios.post("auth/login", {
           email: this.email,
           password: this.password
        }).then(response => {
          // console.log(response)
          this.getDataUser(response.data)
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
          alert('Anda telah berhasil Login!');
          this.$router.push({path: '/product'})
        })
      },
      routeToRegisterPage(){
        this.$router.push({ name: 'register' });
      }
    }
  }
</script>
