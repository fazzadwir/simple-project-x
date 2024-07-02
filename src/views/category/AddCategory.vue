<template>
  <div>
    <h1>Add Category</h1>
    <form @submit.prevent="addCategory">
      <label for="name">Name:</label>
      <input v-model="name" type="text" id="name" required />
      <label for="image">Image:</label>
      <input type="file" @change="listenFile" multiple />
      <button type="button" @click="cancelAdd">Cancel</button>
      <button type="submit" @click="addcategory">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainId: "",
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
      console.log("file", this.file[0]);
    },
    addCategory() {
      console.log("resultFile", this.file[0]);

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
          alert("File ditambah!");
          console.log("response", response.data.location);
          image = response.data.location;
        
          this.$axios
            .post("categories", { 
              name: this.name, 
              image: image
            })
            .then(() => {
              alert('Data ditambah!');
              this.$router.push({ name: "listCategory" });
            })
            .catch((error) => {
              console.error("Error adding category:", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  }
};
</script>
