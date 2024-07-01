<template>
  <div>
    <h1>Categories</h1>
    <button @click="addCategory()">Add</button>
    <button @click="getListCategories">List Category</button>
    <ol>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }}
        <button @click="editCategory(category.id)">Edit</button>
        <button @click="deleteCategory(category.id)">Delete</button>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    this.getListCategories();
  },
  methods: {
    getListCategories() {
      this.$axios.get("categories?limit=10").then((res) => {
        let categoriesData = res.data;
        console.log("Data_ori", categoriesData);
        this.categories = [];
        categoriesData
          .forEach((item) => {
            this.categories.push({
              id: item.id,
              name: item.name,
            });
            console.log("New_Data", this.categories);
          })
      });
    },
    addCategory() {
      this.$router.push({
        name: 'addCategory',
      });
    },
    editCategory(id) {
      this.$router.push({
        name: 'editCategory',
        params: {
          id: id
        }
      });
    },
    deleteCategory(id) {
      this.$router.push({
        name: 'deleteCategory',
        params: {
          id: id
        }
      });
    },
  },
};
</script>