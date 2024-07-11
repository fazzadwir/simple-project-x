<template>
  <div class="login_box">
    <div class="two_view">
      <div class="left"></div>
      <div class="right">
        <div class="form_container">
          <span class="logo">
            <img src="../../assets/img/tokox_logo.png" alt="tokox_logo">
          </span>
          <form>
            <input type="text" v-model="name" placeholder="Nama">
            <input type="text" v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Password">
            <input type="password" v-model="confirmPassword" placeholder="Konfirmasi Password">
            <div class="btn_group">
              <button class="btn_primary" @click="registerAction">Daftar</button>
              <button class="btn_secondary"@click="routeToLoginPage">Masuk</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "RegisterPage",
  components: {
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isSubmitting: false,
    };
  },
  methods: {
    registerAction() {

      if(this.password !== this.confirmPassword){
        alert("Password Anda tidak sama dengan konfirmasi password Anda!");
        return;
      }

      this.isSubmitting = true;
      let adduser = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: "customer",
        avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      };
      this.$axios.post("/users/", adduser)
        .then((response) => {
          this.$Swal.fire({
            title: "Pendaftaran Berhasil!",
            text: "Silahkan Login",
            icon: "success"
          });
          this.$router.push({path:'/'});
        })
        .catch((error) => {
          this.isSubmitting = false;
          if (error.response.data.errors != undefined) {
            alert("Terjadi Kesalahan!")
          }
          return error;
        });
    },
    routeToLoginPage(){
        this.$router.push({ name: 'login' });
      }
  },
};
</script>