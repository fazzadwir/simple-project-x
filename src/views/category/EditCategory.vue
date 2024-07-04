<template>
  <b-container>
    <h1 class="text-center">Edit Category {{ id }}</h1>
    <b-form @submit.prevent="editCategory">
      <b-form-group label="Name:" label-for="name">
        <b-form-input v-model="name" id="name" required></b-form-input>
      </b-form-group>
      
      <b-form-group label="Image URL:" label-for="image">
        <b-form-input v-model="image" id="image" required></b-form-input>
      </b-form-group>
      
      <b-form-group label="Upload Image:" label-for="file">
        <b-form-file id="file" @change="handleFileUpload"></b-form-file>
      </b-form-group>
      
      <b-button-group class="mt-3">
        <b-button variant="secondary" @click="cancelEdit">Cancel</b-button>
        <b-button type="submit" variant="primary">Save</b-button>
      </b-button-group>
    </b-form>
  </b-container>
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
          this.image = res.data.image;
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
          this.$router.push({ name: "listCategory" });
        })
        .catch((error) => {
          console.error("Error updating category:", error);
        });
    },
  },
};
</script>
