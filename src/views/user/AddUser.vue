<template>
  <div>
    <h1>Add User Data</h1>
    <b-form @submit.prevent="addData">
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

      <b-form-group label="Avatar" label-for="avatar-input">
        <b-form-input
          id="avatar-input"
          type="text"
          v-model="avatar"
          placeholder="Insert new avatar link"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Add user</b-button>
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
    addData() {
      this.$axios
        .post("users", {
          email: this.email,
          name: this.name,
          password: this.password,
          role: this.role,
          avatar:
            this.avatar ||
            "https://akornas.ac.id/wp-content/uploads/2021/12/placeholder.jpg",
        })
        .then((res) => {
          console.log("Add user success", res);
          alert("Add user success.");
          this.$router.push("/user");
        })
        .catch((error) => {
          console.error("Error add user:", error);
          alert("Failed to add user. Please try again.");
        });
    },
  },
};
</script>
