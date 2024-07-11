<template>
    <div class="container">
      <div class="edit_container">
        <div class="left">
          <div class="img_container">
              <img :src="this.image" alt="Gambar Produk">
          </div>
        </div>
        <div class="right">
          <div class="title">
            <h1 class="text-center white">Edit Kategori</h1>
          </div>
          <div class="body">
            <form>
              <div class="input">
                <span>Nama Kategori</span>
                <b-form-input v-model="name" class="in"></b-form-input>
              </div>
              <div class="input">
                  <span>Ubah Gambar</span>
                  <b-form-file @change="handleFileUpload" class="in" accept="image/*"></b-form-file>
              </div>
              <div class="btn_group">
                  <button class="btn_primary btn-wide" @click="editCategory">Ubah Kategori</button>
                  <button class="btn_secondary btn-wide" @click="cancelEdit">Kembali</button>
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
      id: this.$route.params.id,
      name: '',
      image: '',  
      file: null,    
    };
  },
  mounted() {
    this.fetchCategory();
  },
  methods: {
    fetchCategory() {
      this.$axios
        .get(`categories/${this.$route.params.id}`)
        .then((res) => {
          this.name = res.data.name;
          this.image = res.data.image
        })
        .catch((error) => {
          console.error("Error fetching category:", error);
        });
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    cancelEdit() {
      this.$router.push({ name: "listCategory" });
    },
    editCategory() {
      if (this.file) {
        const formData = new FormData();
        formData.append('file', this.file);

        this.$axios.post('files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.image = response.data.location;
          this.saveCategory();
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
      } else {
        this.saveCategory();
      }
    },
    saveCategory() {
      this.$axios
        .put(`categories/${this.$route.params.id}`, { name: this.name, image: this.image })
        .then(() => {
          this.$Swal.fire({
              title: "Kategori Diubah!",
              icon: "success"
          });
          this.$router.push({ name: "listCategory" });
        })
        .catch((error) => {
          console.error("Error updating category:", error);
        });
    },
  },
};
</script>
