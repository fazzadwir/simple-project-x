<template>
  <div class="m-5">
    <h1>Edit profile</h1>
    <b-form @submit.prevent="putData">
      <b-form-group label="Email" label-for="email-input">
        <b-form-input
          id="email-input"
          type="email"
          v-model="email"
          placeholder="Insert new email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Name" label-for="name-input">
        <b-form-input
          id="name-input"
          type="text"
          v-model="name"
          placeholder="Insert new name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Password" label-for="password-input">
        <b-form-input
          id="password-input"
          type="password"
          v-model="password"
          placeholder="Insert new password"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Role" label-for="role-select">
        <b-form-select id="role-select" v-model="role" required>
          <option value="">Select role</option>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </b-form-select>
      </b-form-group>

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
      <b-row class="mt-3">
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button @click="goProfile" variant="secondary">Back</b-button>
      </b-row>
    </b-form>
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
            alert("File added!");
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
        .then((updateResponse) => {
          alert("Profile updated successfully!");
          let updatedUser = {
            ...this.user,
            ...userPayload,
          };
          cookie.set("userdata", JSON.stringify(updatedUser));
          this.$router.push("/profile");
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
  },
  mounted() {
    this.loadUserData();
  },
};
</script>
