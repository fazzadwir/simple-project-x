<template>
  <nav class="text-bg-dark">
    <ul>
      <li>
        <div class="left">
        </div>
        <div class="right">
          <!-- <button @click="logout">Logout</button> -->
           <img src="../assets/img/tokox_logo.png" alt="">
        </div>
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
