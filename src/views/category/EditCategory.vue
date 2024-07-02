<template>
  <div>
    <h1>Edit Category {{ id }}</h1>
    <form @submit.prevent="editCategory">
      <label for="name">Name:</label>
      <input v-model="name" type="text" id="name" required />
      <label for="image">Image URL:</label>
      <input v-model="image" type="text" id="image" required />
      <input type="file" id="file" @change="handleFileUpload" />

      <button type="button" @click="cancelEdit">Cancel</button>
      <button type="submit">Save</button>
    </form>
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
          this.image = res.data.image;
          console.log("Data_ID", res.data);
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
          this.image = response.data.location; // Adjust this based on your server response
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
          console.log("Category updated successfully");
          this.$router.push({ name: "listCategory" });
        })
        .catch((error) => {
          console.error("Error updating category:", error);
        });
    },
  },
};
</script>
