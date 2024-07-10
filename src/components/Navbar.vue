<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/product">Products</RouterLink>
        <RouterLink to="/category">Categories</RouterLink>
        <RouterLink to="/user">User</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
        <button @click="logout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      this.$store.dispatch("logout", this.$router);
    },
  },
};
</script>
