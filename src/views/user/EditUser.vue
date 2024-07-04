<template>
  <div>
    <h1>Edit User Data</h1>
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
    <button type="button" @click.prevent="putData" class="">Submit</button>
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
          this.$router.push("/user");
        })
        .catch((error) => {
          console.error("Error editing user:", error);
          alert("Failed to edit user. Please try again.");
        });
    },
  },
  mounted() {
    this.loadUserData();
  },
  methods: {
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
          this.$router.push("/user");
        })
        .catch((error) => {
          console.error("Error editing user:", error);
          alert("Failed to edit user. Please try again.");
        });
    },
  },
};
</script>
