<!-- AddCategory.vue -->
<template>
  <div>
    <h1>Add Category</h1>
    <form @submit.prevent="addCategory">
      <label for="name">Name:</label>
      <input v-model="name" type="text" id="name" required />
      <label for="image">Image:</label>
      <input v-model="image" type="text" id="image" required />
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      image: ''
    };
  },
  methods: {
    addCategory() {
      this.$axios.post("categories", { name: this.name , image: this.image })
        .then(() => {
          this.$router.push({ name: 'listCategory' });
        })
        .catch((error) => {
          console.error("Error adding category:", error);
        });
    },
  },
};
</script>
