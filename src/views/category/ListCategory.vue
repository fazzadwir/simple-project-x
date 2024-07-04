<template>
  <div>
    <h1 class="text-center white">Categories</h1>
    <b-row class="mb-3 align-items-center">
      <b-col cols="12" md="4" class="mb-md-0">
        <b-button variant="primary" @click="addCategory">Add Category</b-button>
      </b-col>
      <b-col cols="12" md="8" class="mb-md-0 d-flex align-items-center justify-content-end">
        <b-form-input v-model="tempSearchQuery" placeholder="Search categories..." class="mr-2"></b-form-input>
        <b-button variant="secondary" @click="performSearch" class="ml-2">OK</b-button>
        <b-form-select v-model="selectedName" class="ml-2">
          <option value="">All</option>
          <option v-for="name in uniqueNames" :key="name" :value="name">{{ name }}</option>
        </b-form-select>
      </b-col>
    </b-row>

    <b-card>
      <b-table
        :items="paginatedCategories"
        :fields="tableFields"
        striped
        hover
        responsive
      >
        <template #cell(image)="data">
          <img
            :src="data.value || 'https://via.placeholder.com/100'"
            alt="category"
            class="category-image"
          />
        </template>
        <template #cell(actions)="data">
          <b-dropdown id="dropdown-1" text="Action Menu" variant="secondary">
            <b-dropdown-item @click="editCategory(data.item.id)">Edit</b-dropdown-item>
            <b-dropdown-item @click="deleteCategory(data.item.id)">Delete</b-dropdown-item>
          </b-dropdown>
        </template>
        <template #empty>
          <tr>
            <td colspan="4">No categories available.</td>
          </tr>
        </template>
      </b-table>
    </b-card>

    <div class="pagination mt-4">
      <b-pagination
        v-model="currentPage"
        :total-rows="filteredCategories.length"
        :per-page="itemsPerPage"
        aria-controls="my-table"
        class="my-0"
      ></b-pagination>
      <div class="pagination-info ml-3">
        Page {{ currentPage }} of {{ totalPages }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      categories: [],
      tempSearchQuery: '', // Temporary search query
      searchQuery: '', // Actual search query used for filtering
      selectedName: '',
      currentPage: 1,
      itemsPerPage: 10,
      tableFields: [
        { key: 'id', label: 'No.' },
        { key: 'name', label: 'Name' },
        { key: 'image', label: 'Image', sortable: false },
        { key: 'actions', label: 'Actions', sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    uniqueNames() {
      const names = this.categories.map(category => category.name);
      return [...new Set(names)];
    },
    filteredCategories() {
      return this.categories.filter(category => {
        const matchesName = this.selectedName ? category.name === this.selectedName : true;
        const matchesQuery = category.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesName && matchesQuery;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredCategories.length / this.itemsPerPage);
    },
    paginatedCategories() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.filteredCategories.slice(start, end);
    }
  },
  methods: {
    getListCategories() {
      this.$axios.get('categories').then((res) => {
        let categoriesData = res.data;
        this.categories = categoriesData.map(item => ({
          id: item.id,
          name: item.name,
          image: item.image || 'https://via.placeholder.com/100',
        }));
        this.performSearch(); // Ensure search is performed initially
      });
    },
    performSearch() {
      this.searchQuery = this.tempSearchQuery; // Apply the temporary search query
      this.currentPage = 1; // Reset to first page after search
    },
    addCategory() {
      this.$router.push({ name: 'addCategory' });
    },
    editCategory(id) {
      this.$router.push({ name: 'editCategory', params: { id } });
    },
    deleteCategory(id) {
      if (confirm('Are you sure you want to delete this category?')) {
        this.$axios.delete(`categories/${id}`).then(() => {
          this.getListCategories(); // Refresh the list after deletion
        }).catch((error) => {
          console.error('Error deleting category:', error);
        });
      }
    }
  },
  mounted() {
    this.getListCategories();
  },
  watch: {
    currentPage() {
      this.paginatedCategories; // Ensure paginated categories are updated
    }
  }
};
</script>
