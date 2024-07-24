<template>
  <div class="container">
    <div class="single_add_container">
      <div class="title">
        <h1 class="text-center white">Edit Profil</h1>
      </div>
      <div class="body">
        <b-form @submit.prevent="putData">
          <div class="input">
            <span>Email</span>
            <b-form-input
              id="email-input"
              type="email"
              v-model="email"
            ></b-form-input>
          </div>
 
          <div class="input">
            <span>Nama</span>
            <b-form-input
              id="name-input"
              type="text"
              v-model="name"
            ></b-form-input>
          </div>

          <div class="input">
            <span>Password</span>
            <b-form-input
              id="password-input"
              type="password"
              v-model="password"
            ></b-form-input>
          </div>
          
          <div class="input" v-if="userRole !== 'customer'">
            <span>Role</span>
            <b-form-select id="role-select" v-model="role">
              <option value="">Select role</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </b-form-select>
          </div>

          <div class="input">
            <span>Ubah Gambar</span>
            <b-form-input
              class="center"
              id="avatar-input"
              @change="listenFile"
              type="file"
            ></b-form-input>
          </div>

          <div class="btn_group">
            <button class="btn_primary btn-wide" type="submit">Simpan</button>
            <button class="btn_secondary btn-wide" @click="goProfile">Kembali</button>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from "js-cookie";
export default {
  name: "EditProfile",
  data() {
    return {
      email: "",
      name: "",
      password: "",
      role: "",
      avatar: "",
      file: null,
      user: null,
      userRole: "",
    };
  },
  methods: {
    listenFile(event) {
      this.file = event.target.files[0];
      console.log("Selected file:", this.file);
    },
    putData() {
      let formData = new FormData();
      if (this.file) {
        formData.append("file", this.file);
        console.log("FormData for file upload:", formData);
        this.$axios
          .post("files/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((uploadResponse) => {
            console.log("File upload response:", uploadResponse.data.location);
            this.updateUser(uploadResponse.data.location);
          })
          .catch((error) => {
            console.error(
              "Error uploading file:",
              error.response || error.message
            );
            alert("Failed to upload file. Please try again.");
          });
      } else {
        this.updateUser(this.avatar);
      }
    },
    updateUser(image) {
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

      
      let tempUserData = cookie.getJSON('userdata')
      let userPayload = {
        email: this.email,
        name: this.name,
        password: this.password,
        role: this.role,
        avatar: image,
        access_token: tempUserData.access_token,
        refresh_token: tempUserData.refresh_token
      };
      console.log("User payload:", userPayload);
      this.$axios
        .put("/users/" + this.$route.query.id, userPayload)
        .then(() => {
          this.$Swal.fire({
              title: "Profil Diubah!",
              icon: "success"
          });
          let updatedUser = {
            ...this.user,
            ...userPayload,
          };
          cookie.set("userdata", JSON.stringify(updatedUser));
          // this.$router.push("/profile");
          window.location.reload()
        })
        .catch(error=>{
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
    loadUserData() {
      console.log("Loading user data for ID:", this.$route.query.id);
      this.$axios
        .get("users/" + this.$route.query.id)
        .then((res) => {
          const user = res.data;
          this.user = user;
          this.email = user.email;
          this.name = user.name;
          this.role = user.role;
          this.avatar = user.avatar;
          this.password = user.password
          console.log("Loaded user data:", user);
        })
        .catch((error) => {
          console.error("Error loading user data:", error);
          alert("Failed to load user data. Please try again.");
        });
    },
    goProfile() {
      this.$router.push("/profile");
    },
    fetchUserRole() {
        const userdata = cookie.getJSON("userdata");
            if (userdata && userdata.role) {
                this.userRole = userdata.role.toLowerCase();
            } else {
                console.error("User role is not available in the cookie");
            }
        },
  },
  mounted() {
    this.loadUserData();
  },
  created(){
        this.fetchUserRole();
    }
};
</script>
