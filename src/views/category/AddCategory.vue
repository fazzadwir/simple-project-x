<template>
  <div class="container">
    <div class="single_add_container">
      <div class="title">
        <h1 class="text-center white">Tambah Produk</h1>
      </div>
      <div class="body">
        <form>
          <div class="input">
            <span>Nama Kategori</span>
            <b-form-input v-model="name" required class="in"></b-form-input>
          </div>
          <div class="input">
            <span>Gambar</span>
            <b-form-file @change="listenFile" class="in" accept="image/*"></b-form-file>
          </div>

          <div class="btn_group">
            <button class="btn_primary btn-wide" @click="addCategory">Tambah Kategori</button>
            <button class="btn_secondary btn-wide" @click="cancelAdd">Kembali</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      file: null,
    };
  },
  methods: {
    cancelAdd() {
      this.$router.push({ name: "listCategory" });
    },
    listenFile(event) {
      this.file = event.target.files;
    },
    addCategory() {
      let formData = new FormData();
      formData.append("file", this.file[0]);

      let image = null;

      this.$axios
        .post("files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          image = response.data.location;
          return this.$axios.post("categories", { name: this.name, image: image });
        })
        .then(() => {
          this.$Swal.fire({
              title: "Kategori Ditambah!",
              icon: "success"
          });
          this.$router.push({ name: "listCategory" });
        })
        .catch((error) => {
          console.error("Error adding category:", error);
        });
    }
  }
};
</script>
