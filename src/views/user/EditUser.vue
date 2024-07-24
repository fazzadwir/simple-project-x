<template>
  <div class="container">
    <div class="edit_container">
      <div class="left">
        <div class="img_container">
          <img :src="this.avatar" alt="Gambar Produk">
        </div>
      </div>
      <div class="right">
          <div class="title">
            <h1 class="text-center white">Edit User</h1>
          </div>
          <div class="body">
            <form>
              <div class="input">
                <span>Email</span>
                <b-form-input v-model="email" class="in"></b-form-input>
              </div>
              <div class="input">
                <span>Nama</span>
                <b-form-input v-model="name" class="in"></b-form-input>
              </div>
              <div class="input">
                <span>Password Baru</span>
                <b-form-input v-model="password" type="password" class="in"></b-form-input>
              </div>
              <div class="input">
                <span>Role</span>
                  <b-form-select v-model="role" class="in mb-3">
                      <b-form-select-option value="customer">Customer</b-form-select-option>
                      <b-form-select-option value="admin">Admin</b-form-select-option>
                  </b-form-select>
              </div>
              <div class="input">
                <span>Avatar</span>
                <b-form-input  @change="listenFile" type="file" class="in"></b-form-input>
              </div>
              <div class="btn_group">
                  <button class="btn_primary btn-wide" @click="putData">Ubah User</button>
                  <button class="btn_secondary btn-wide" @click="routeToPageHome">Kembali</button>
              </div>
            </form>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import cookie from "js-cookie";
export default {
  data() {
    return {
      email: "",
      name: "",
      password: "",
      role: "",
      avatar: "",
      file: null,
    };
  },
  methods: {
    listenFile(event) {
      this.file = event.target.files[0];
      console.log("Selected file:", this.file);
      this.showUploadButton = !!this.file;
    },
    putData() {

      if(!this.email || !this.name || !this.password || !this.role){
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

      let formData = new FormData();
      let userPayload = {}

      if(this.file){
        formData.append("file", this.file);
        this.$axios
          .post("files/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((uploadResponse) => {
            let image = uploadResponse.data.location;
            userPayload = {
              id: this.$route.query.id,
              email: this.email,
              name: this.name,
              password: this.password,
              role: this.role,
              avatar: image ? image : this.avatar,
            };
            console.log("User payload:", userPayload);
            this.$axios.put("/users/" + this.$route.query.id, userPayload)
            .then((updateResponse) => {
            this.$Swal.fire({
              title: "Profil Diubah!",
              icon: "success"
            });
            let tempUserData = cookie.getJSON('userdata')
            if(tempUserData.id == this.$route.query.id){
              userPayload.access_token = tempUserData.access_token,
              userPayload.refresh_token = tempUserData.refresh_token
              console.log('updated user', userPayload)
              cookie.set("userdata", JSON.stringify(userPayload));
            }
            this.$router.push("/user").then(() => {
              window.location.reload();
            });
          }).catch(error=>{
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
          return
          })
          .catch((error) => {
            console.error(
              "Error updating profile:",
              error.response || error.message
            );
            alert("Failed to update profile. Please try again.");
          });
      }else{
        userPayload = {
          id: this.$route.query.id,
          email: this.email,
          name: this.name,
          password: this.password,
          role: this.role,
          avatar: this.avatar,
        };

        this.$axios.put("/users/" + this.$route.query.id, userPayload)
          .then((updateResponse) => {
            this.$Swal.fire({
                title: "User Diubah!",
                icon: "success"
            });
            let tempUserData = cookie.getJSON('userdata')
            if(tempUserData.id == this.$route.query.id){
              userPayload.access_token = tempUserData.access_token,
              userPayload.refresh_token = tempUserData.refresh_token
              console.log('updated user', userPayload)
              cookie.set("userdata", JSON.stringify(userPayload));
            }
            this.$router.push("/user").then(() => {
              window.location.reload();
            });
        }).catch(error=>{
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
      }
    },
    loadUserData() {
      this.$axios
        .get("users/" + this.$route.query.id)
        .then((res) => {
          const user = res.data;
          this.email = user.email;
          this.name = user.name;
          this.password = user.password;
          this.role = user.role;
          this.avatar = user.avatar;
        })
        .catch((error) => {
          console.error("Error loading user data:", error);
          alert("Failed to load user data. Please try again.");
        });
    },
    routeToPageHome(){
      this.$router.push('/user');
    },
  },
  mounted() {
    this.loadUserData();
  },
};
</script>
