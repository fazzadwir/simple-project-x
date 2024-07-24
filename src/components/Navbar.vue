<template>
  <nav class="text-bg-dark">
    <ul>
      <li>
        <div class="left">
        </div>
        <div class="right">
          <!-- <button @click="logout">Logout</button> -->
           <!-- <img src="../assets/img/tokox_logo.png" alt=""> -->
           <b-dropdown :text="userName" class='dr_white' variant='none'>
                <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </b-dropdown>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import cookie from "js-cookie";
export default {
  name: "Navbar",
  data() {
    return {
      userName: "",
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout", this.$router);
    },
    fetchUserRole() {
        const userdata = cookie.getJSON("userdata");
            if (userdata && userdata.name) {
                this.userName = userdata.name;
            } else {
                console.error("User name is not available in the cookie");
            }
    },
  },
  created(){
        this.fetchUserRole();
    }
};
</script>
