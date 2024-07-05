<template>
  <div>
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
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Role" label-for="role-select">
        <b-form-select id="role-select" v-model="role" required>
          <option value="">Select role</option>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </b-form-select>
      </b-form-group>

      <b-form-group label="Avatar" label-for="avatar-input">
        <b-form-input
          id="avatar-input"
          type="text"
          v-model="avatar"
          placeholder="Insert new avatar link"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      name: "",
      password: "",
      role: "",
      avatar: "",
    };
  },
  methods: {
    putData() {
      this.$axios
        .put("users/" + this.$route.query.id, {
          id: this.$route.query.id,
          email: this.email,
          name: this.name,
          password: this.password,
          role: this.role,
          avatar:
            this.avatar ||
            "https://akornas.ac.id/wp-content/uploads/2021/12/placeholder.jpg",
        })
        .then((res) => {
          console.log("Successfully edited", res);
          alert("Successfully edited");
          this.$router.push("/user");
        })
        .catch((error) => {
          console.error("Error editing user:", error);
          alert("Failed to edit user. Please try again.");
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
  },
  mounted() {
    this.loadUserData();
  },
};
</script>
