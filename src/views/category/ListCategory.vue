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
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id + 1 }}</td>
          <td>{{ category.name }}</td>
          <td>
            <img
              :src="
                category.image || 'https://via.placeholder.com/100'
                  ? category.image
                  : 'no-image'
              "
              alt=""
              style="width: 100px"
            />
          </td>
          <td>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                Action Menu
              </button>
              <div class="dropdown-menu">
                <button class="dropdown-item" type="button" @click="editCategory(category.id)">Edit</button>
                <button class="dropdown-item" type="button" @click="deleteCategory(category.id)">Delete</button>
              </div>
            </div>
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
          console.log("New_Data", this.categories);
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
