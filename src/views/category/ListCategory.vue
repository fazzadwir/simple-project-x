<template>
  <div>
    <h1 class="text-center white">Categories</h1>
    <button @click="addCategory">Add</button>
    <button @click="getListCategories">List Category</button>
    <table class="table text-center">
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Image</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="4"></td>
        </tr>
        <tr v-for="(category, index) in categories" :key="category.id">
          <td>{{ index + 1 }}</td>
          <td>{{ category.name }}</td>
          <td>
            <img
              :src="category.image || 'https://via.placeholder.com/100'"
              alt="category"
              style="width: 100px"
            />
          </td>
          <td>
            <b-dropdown id="dropdown-1" text="Action Menu" variant="secondary">
              <b-dropdown-item @click="editCategory(category.id)">Edit</b-dropdown-item>
              <b-dropdown-item @click="deleteCategory(category.id)">Delete</b-dropdown-item>
            </b-dropdown>
          </td>
        </tr>
      </tbody>
    </table>
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
      this.$axios.get("categories").then((res) => {
        let categoriesData = res.data;
        console.log("Data_ori", categoriesData);
        this.categories = [];
        categoriesData.forEach((item) => {
          this.categories.push({
            id: item.id,
            name: item.name,
            image: item.image || "https://via.placeholder.com/100",
          });
        });
      });
    },
    addCategory() {
      this.$router.push({
        name: "addCategory",
      });
    },
    editCategory(id) {
      this.$router.push({
        name: "editCategory",
        params: {
          id: id,
        },
      });
    },
    deleteCategory(id) {
      if (confirm("Are you sure you want to delete this category?")) {
        this.$axios
          .delete(`categories/${id}`)
          .then(() => {
            console.log("Category deleted successfully");
            this.getListCategories(); // Refresh the list after deletion
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
          });
      }
    },
  },
};
</script>
