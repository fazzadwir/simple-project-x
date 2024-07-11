<template>
    <layout-div>
      <div class="register-vue">
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title mb-4">Daftar</h5>
              <form>
                <div class="mb-3">
                  <label htmlFor="name" class="form-label">Name </label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                    v-model="name"
                  />
                  <div v-if="validationErrors.name" class="flex flex-col">
                    <small class="text-danger">
                      {{ validationErrors?.name[0] }}
                    </small>
                  </div>
                </div>
                <div class="mb-3">
                  <label htmlFor="email" class="form-label">Email address </label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                    v-model="email"
                  />
                  <div v-if="validationErrors.email" class="flex flex-col">
                    <small class="text-danger">
                      {{ validationErrors?.email[0] }}
                    </small>
                  </div>
                </div>
                <div class="mb-3">
                  <label htmlFor="password" class="form-label">Password </label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    name="password"
                    v-model="password"
                  />
                  <div v-if="validationErrors.password" class="flex flex-col">
                    <small class="text-danger">
                      {{ validationErrors?.password[0] }}
                    </small>
                  </div>
                </div>
                <div class="mb-3">
                  <label htmlFor="confirm_password" class="form-label"
                    >Confirm Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="confirm_password"
                    name="confirm_password"
                    v-model="confirmPassword"
                  />
                </div>
                <div class="d-grid gap-2">
                  <button
                    :disabled="isSubmitting"
                    @click="registerAction()"
                    type="button"
                    class="btn btn-primary btn-block"
                  >
                    Daftar Sekarang
                  </button>
                  <p class="text-center">
                    Sudah Melakukan Pendaftaran
                    <router-link to="/#">Login Disini</router-link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </layout-div>
  </template>
  
  <script>
  
  export default {
    name: "RegisterPage",
    components: {
    },
    data() {
      return {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        validationErrors: {},
        isSubmitting: false,
      };
    },
    methods: {
      registerAction() {
        this.isSubmitting = true;
        let adduser = {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword,
          role: "customer",
          avatar: "https://i.imgur.com/DTfowdu.jpg"
        };
        this.$axios.post("/users/", {
          adduser
      })
          .then((response) => {
            alert('User Registered')
            let userdata = Object.assign(adduser.data)
            let forcookie = JSON.stringify(userdata)
            this.$cookie.set("userdata", forcookie)
            this.$router.push({path:'/#'});
            return response;
          })
          .catch((error) => {
            this.isSubmitting = false;
            if (error.response.data.errors != undefined) {
              this.validationErrors = error.response.data.errors;
              alert("Data Yang Anda Masukan Salah,Silakan Coba Lagi.")
            }
            return error;
          });
      },
    },
  };
  </script>
  