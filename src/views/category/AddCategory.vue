<template>
  <b-container>
    <h1 class="text-center">Add Category</h1>
    <b-form @submit.prevent="addCategory">
      <b-form-group label="Name:" label-for="name">
        <b-form-input v-model="name" id="name" required></b-form-input>
      </b-form-group>
      
      <b-form-group label="Image:" label-for="file">
        <b-form-file id="file" @change="listenFile" multiple></b-form-file>
      </b-form-group>
      
      <b-button-group class="mt-3">
        <b-button variant="secondary" @click="cancelAdd">Cancel</b-button>
        <b-button type="submit" variant="primary">Save</b-button>
      </b-button-group>
    </b-form>
  </b-container>
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
          this.$router.push({ name: "listCategory" });
        })
        .catch((error) => {
          console.error("Error adding category:", error);
        });
    }
  }
};
</script>
