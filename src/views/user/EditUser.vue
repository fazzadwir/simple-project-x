<template>
  <div class="m-5">
    <h1>Edit User Data</h1>
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
          required
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
        <b-button @click="goBack" variant="secondary">Back</b-button>
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
            id: this.$route.query.id,
            email: this.email,
            name: this.name,
            password: this.password,
            role: this.role,
            avatar: image ? image : this.avatar,
          };
          console.log("User payload:", userPayload);
          return this.$axios.put("/users/" + this.$route.query.id, userPayload);
        })
        .then((updateResponse) => {
          alert("Profile updated successfully!");
          let updatedUser = {
            ...this.user,
            avatar: updateResponse.data.avatar,
          };
          cookie.set("userdata", JSON.stringify(updatedUser));
          this.$router.push("/user").then(() => {
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
    loadUserData() {
      this.$axios
        .get("users/" + this.$route.query.id)
        .then((res) => {
          const user = res.data;
          this.email = user.email;
          this.name = user.name;
          this.role = user.role;
          this.avatar = user.avatar;
        })
        .catch((error) => {
          console.error("Error loading user data:", error);
          alert("Failed to load user data. Please try again.");
        });
    },
    goBack() {
      this.$router.push("/user");
    },
  },
  mounted() {
    this.loadUserData();
  },
};
</script>
