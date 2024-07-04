<template>
  <div>
    <h1>Add User Data</h1>
    <div>
      <label>Email</label>
      <input type="text" v-model="email" placeholder="Insert new email" />
      <label>Name</label>
      <input type="text" v-model="name" placeholder="Insert new name" />
      <label>Password</label>
      <input
        type="password"
        v-model="password"
        placeholder="Insert new password"
      />
      <label>Role</label>
      <select v-model="role" name="role">
        <option value="">Select role</option>
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <label>Avatar</label>
      <input
        type="text"
        v-model="avatar"
        placeholder="Insert new avatar link"
      />
    </div>
    <button type="button" @click.prevent="addData" class="">Add user</button>
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
          alert("Failed to edit user. Please try again.");
        });
    },
  },
};
</script>
