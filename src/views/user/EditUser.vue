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
                <b-form-input v-model="email" type="email" class="in"></b-form-input>
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
      let formData = new FormData();
      let userPayload = {}
      formData.append("file", this.file);
      console.log("FormData for file upload:", formData);
      this.$axios
        .post("files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((uploadResponse) => {
          alert("File added!");
          console.log("File upload response:", uploadResponse.data.location);
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
          this.$axios.put("/users/" + this.$route.query.id, userPayload).then((updateResponse) => {
          alert("Profile updated successfully!");
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
        })
        })
        
        .catch((error) => {
          console.error(
            "Error updating profile:",
            error.response || error.message
          );
          alert("Failed to update profile. Please try again.");
        });
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
    }
  },
  mounted() {
    this.loadUserData();
  },
};
</script>
