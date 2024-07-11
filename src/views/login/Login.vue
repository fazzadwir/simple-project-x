<template>
  <div class="login_box">
    <div class="two_view">
      <div class="left"></div>
      <div class="right">
        <div class="form_container">
          <span class="logo">
            <img src="../../assets/img/tokox_logo.png" alt="tokox_logo">
          </span>
          <form @submit.prevent="validateForm">
            <div class="btn_group">
              <input type="text" v-model="email" placeholder="Enter your username" @input="validateEmail" required>
              <span v-if="emailError" class="error_message">{{ emailError }}</span>
            </div>
            <div class="btn_group">
              <input type="password" v-model="password" placeholder="Enter your password" @input="validatePassword" required>
              <span v-if="passwordError" class="error_message">{{ passwordError }}</span>
            </div>
            <div class="btn_group">
              <button class="btn_primary" :disabled="!isFormValid">Masuk</button>
              <button type="button" class="btn_secondary" @click="routeToRegisterPage">Daftar</button>
            </div>
            <div v-if="errorMessage" class="error_message">
              {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from "js-cookie";
export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      errorMessage: '',
    };
  },
  computed: {
    isFormValid() {
      return !this.emailError && !this.passwordError && this.email && this.password;
    }
  },
  methods: {
    validateEmail() {
      this.emailError = "";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailError = "This field is required.";
      } else if (this.email.length < 8 || this.email.length > 30) {
        this.emailError = "Email must be between 8 and 30 characters.";
      } else if (!this.email.includes("@")) {
        this.emailError = "Email must contain '@'.";
      } else if (!emailPattern.test(this.email)) {
        this.emailError = "Please enter a valid email address.";
      }
    },
    validatePassword() {
      this.passwordError = "";
      if (!this.password) {
        this.passwordError = "This field is required.";
      }
    },
    reset() {
      this.email = "";
      this.password = "";
    },
    validateForm() {
      this.validateEmail();
      this.validatePassword();

      if (!this.emailError && !this.passwordError) {
        this.submit();
      }
    },
    submit() {
      this.errorMessage = "";
      this.$axios
        .post("auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.getDataUser(response.data);
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            this.errorMessage =
              alert("Login Failed: " +
              error.response.data.message +
              ", Please ensure that your email and password are already registered");
          } else {
            this.errorMessage =
              alert("Login failed: Invalid E-mail credential, Please ensure that your email and password are already registered");
          }
        });
    },
    getDataUser(data) {
      this.$axios
        .get("auth/profile", {
          headers: {
            Authorization: "Bearer " + data.access_token,
          },
        })
        .then((response) => {
          let userdata = Object.assign(response.data, data);
          let forcookie = JSON.stringify(userdata);
          cookie.set("userdata", forcookie, { expires: 1 });
          this.$store.commit("SET_LOGIN", forcookie);
          alert("Anda telah berhasil Login!");
          this.$router.push({ path: "/product" });
        });
    },
    routeToRegisterPage() {
      this.$router.push({ name: "register" });
    },
  },
};
</script>