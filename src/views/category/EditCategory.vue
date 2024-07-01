<template>
  <div>
    <h1>Edit Category {{ id }}</h1>
    <form @submit.prevent="editCategory">
      <label for="name">Name:</label>
      <input v-model="name" type="text" id="name" required />
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      id: this.$route.params.id
    };
  },
  mounted() {
    this.fetchCategory();
  },
  methods: {
    fetchCategory() {
      this.$axios.get(`categories/${this.$route.params.id}`)
        .then((res) => {
          this.name = res.data.name;
          console.log('Data_ID', res.data);
        })
        .catch(error => {
          console.error('Error fetching category:', error);
        });
    },
    editCategory() {
      this.$axios.put(`categories/${this.$route.params.id}`, { name: this.name })
        .then(() => {
          console.log('Category updated successfully');
          this.$router.push({ name: 'listCategory' });
        })
        .catch(error => {
          console.error('Error updating category:', error);
        });
    }
  }
};
</script>
