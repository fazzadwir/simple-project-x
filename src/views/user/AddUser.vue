<template>
  <div>
    <div class="container">
      <div class="single_add_container">
        <div class="title">
          <h1 class="text-center white">Tambah User</h1>
        </div>
        <div class="body">
          <form>
            <div class="input">
              <span>Email</span>
              <b-form-input v-model="email" class="in"></b-form-input>
            </div>
            <div class="input">
              <span>Nama</span>
              <b-form-input v-model="name" class="in"></b-form-input>
            </div>
            <div class="input">
              <span>Password</span>
              <b-form-input v-model="password" type="password" class="in"></b-form-input>
            </div>
            <div class="input">
              <span>Role</span>
              <b-form-select v-model="role" class="in mb-3">
                  <b-form-select-option value="customer">Customer</b-form-select-option>
                  <b-form-select-option value="admin">Admin</b-form-select-option>
              </b-form-select>
            </div>
            <div class="input">
              <span>Avatar</span>
              <b-form-input  @change="listenFile" type="file" class="in"></b-form-input>
            </div>
            <div class="btn_group">
                <button class="btn_primary btn-wide" @click="addData">Tambah User</button>
                <button class="btn_secondary btn-wide" @click="routeToPageHome">Kembali</button>
            </div>
          </form>
        </div>
      </div>
    </div>
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
      file: null,
    };
  },
  methods: {
    listenFile(event) {
      this.file = event.target.files;
      console.log("Selected file:", this.file[0]);
    },
    addData() {

      if(this.password.length < 4){
        this.$Swal.fire({
            title: "Password minimal 4 karakter!",
        });
        return;
      }

      if(!this.email.includes("@") || !this.email.includes(".")){
        this.$Swal.fire({
            title: "Email salah!",
        });
        return;
      }

      let formData = new FormData();
      formData.append("file", this.file[0]);
      console.log("FormData for file upload:", formData);

      this.$axios
        .post("files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("File upload response:", res.data.location);
          let image = res.data.location;
          let userPayload = {
            email: this.email,
            name: this.name,
            password: this.password,
            role: this.role,
            avatar: image,
          };
          console.log("User payload:", userPayload);

          return this.$axios.post("users", userPayload);
        })
        .then((res) => {
          this.$Swal.fire({
              title: "User Ditambah!",
              icon: "success"
          });
          this.$router.push("/user");
        })
        .catch(error=>{
          if(error.response.data.message){
              this.$Swal.fire({
              icon: "error",
              title: error.response.data.message,
              });
          }else{
              this.$Swal.fire({
              icon: "error",
              title: "Terjadi kesalahan!",
              });
          }
      })
    },
    routeToPageHome(){
      this.$router.push('/user');
    },
  },
};
</script>
