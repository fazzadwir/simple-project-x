<template>
  <div class="views_login">
    <div class="box">
      <h1>Login</h1>
      <form @submit.prevent="submit">
        <input type="text" v-model="email" placeholder="Enter your username">
        <input type="password" v-model="password" placeholder="Enter your password">
        <button class="white" @click="reset">Reset</button>
        <button class="blue">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { BButton } from "bootstrap-vue-next";
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
      }
    }
  }
</script>
