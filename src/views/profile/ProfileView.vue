<template>
  <div class="d-flex justify-content-center align-items-center vw-100 vh-100">
    <b-container v-if="user">
      <b-row class="justify-content-center">
        <b-col md="6" class="text-center">
          <h3>{{ user.name }}</h3>
          <b-img rounded="circle" :src="user.avatar" fluid alt="Fluid image" />
          <b-form-group
            class="justify-content-center"
            label="Change profile picture"
            label-for="avatar-input"
          >
            <b-form-input
              class="center"
              id="avatar-input"
              @change="listenFile"
              type="file"
            ></b-form-input>
          </b-form-group>
          <b-row>
            <b-button
              v-if="showUploadButton"
              @click="editPicture"
              variant="primary"
              block
              >Upload</b-button
            >
            <b-button
              class="mt-2 mb-2"
              @click="editProfile(user.id)"
              variant="success"
              block
              >Edit user information</b-button
            >
            <b-button @click="goHome" variant="secondary" block
              >Back to home</b-button
            >
          </b-row>
        </b-col>
      </b-row>
    </b-container>
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
          alert("File added!");
          console.log("File upload response:", uploadResponse.data.location);
          let image = uploadResponse.data.location;
          let userPayload = {
            avatar: image,
          };
          console.log("User payload:", userPayload);
          return this.$axios.put("/users/" + this.user.id, userPayload);
        })
        .then((updateResponse) => {
          alert("Profile updated successfully!");
          let updatedUser = {
            ...this.user,
            avatar: updateResponse.data.avatar,
          };
          cookie.set("userdata", JSON.stringify(updatedUser));
          this.$router.push("/profile").then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          console.error(
            "Error updating profile:",
            error.response || error.message
          );
          alert("Failed to update profile. Please try again.");
        });
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
