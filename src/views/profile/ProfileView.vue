<template>
  <div class="container">
    <div v-if="user" class="single_add_container">
      <div class="title">
        <h3 class="text-center">{{ user.name }}</h3>
      </div>
      <div class="body">
        <div class="image">
          <img :src="user.avatar" alt="profil picture">
        </div>

        <div class="input">
          <span>Ubah Foto</span>
          <b-form-input
              class="center"
              id="avatar-input"
              @change="listenFile"
              type="file"
            ></b-form-input>
        </div>
      </div>

      <div class="btn_group">
        <button 
          v-if="showUploadButton"
          class="btn_primary btn-wide mt-4"
          @click="editPicture"
        >
          Ubah Foto Profil
        </button>
        <button 
          class="btn_primary btn-wide mt-2 mb-2"
          @click="editProfile(user.id)"
        >
          Ubah detail user
        </button>
        <button class="btn_secondary btn-wide" @click="goHome">Kembali</button>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from "js-cookie";

export default {
  name: "UserProfile",
  data() {
    return {
      file: null,
      showUploadButton: false,
    };
  },
  computed: {
    user() {
      const userdata = cookie.get("userdata");
      console.log(userdata);
      return userdata ? JSON.parse(userdata) : null;
    },
  },
  methods: {
    listenFile(event) {
      this.file = event.target.files[0];
      console.log("Selected file:", this.file);
      this.showUploadButton = !!this.file;
    },
    editPicture() {
      if (!this.file) {
        alert("Please select a file first.");
        return;
      }

      let formData = new FormData();
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
          let image = uploadResponse.data.location;
          let userPayload = {
            avatar: image,
          };
          console.log("User payload:", userPayload);
          this.$axios.put("/users/" + this.user.id, userPayload)
          .then((updateResponse) => {
            this.$Swal.fire({
                title: "Profil Diubah!",
                icon: "success"
            })
            let updatedUser = {
              ...this.user,
              avatar: updateResponse.data.avatar,
            };
            console.log('update user', updatedUser)
            cookie.set("userdata", JSON.stringify(updatedUser));
            this.$router.push("/profile").then(() => {
              window.location.reload();
            });
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
        })
    },
    editProfile(id) {
      console.log("Navigating to editProfile with ID:", id);
      this.$router.push("/editProfile/?id=" + id);
    },
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>
