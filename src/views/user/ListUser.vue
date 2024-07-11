<template>
  <div class="container">
    <button class="btn_primary btn-wide" @click="addUser">Tambah User</button>
    <div class="bar_container">
      <div class="search">
        <input type="text" v-model="tempSearchQuery">
        <button class="btn_search" @click="performSearch">Cari</button>
      </div>
      <div class="filter">
        <b-form-select v-model="selectedName" class="ml-2">
          <option value="">All</option>
          <option v-for="name in uniqueNames" :key="name" :value="name">
            {{ name }}
          </option>
        </b-form-select>
      </div>
    </div>

    <b-card class="mt-2">
      <b-table
        :items="paginatedUser"
        :fields="tableFields"
        striped
        hover
        responsive
      >
        <template #cell(avatar)="data">
          <img
            :src="data.item.avatar || 'https://via.placeholder.com/100'"
            alt="user"
            class="category-image"
          />
        </template>
        <template #cell(actions)="data">
          <b-dropdown id="dropdown-1" text="Action Menu" variant="secondary">
            <b-dropdown-item @click="editUser(data.item)">Edit</b-dropdown-item>
            <b-dropdown-item @click="deleteUser(data.item.id)"
              >Delete</b-dropdown-item
            >
          </b-dropdown>
        </template>
        <template #empty>
          <tr>
            <td colspan="10">No users available.</td>
          </tr>
        </template>
      </b-table>
    </b-card>
    <div class="pagination mt-4">
      <b-pagination
        v-model="currentPage"
        :total-rows="filteredUser.length"
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
import moment from "moment";
export default {
  name: "ListUser",
  data() {
    return {
      dataUser: [],
      searchQuery: "",
      tempSearchQuery: "",
      selectedName: "",
      itemsPerPage: 10,
      currentPage: 1,
      limitUser: 1000,
      offsetUser: 5,
      tableFields: [
        { key: "id", label: "User ID" },
        { key: "email", label: "Email" },
        { key: "password", label: "Password" },
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "avatar", label: "Avatar" },
        { key: "createAt", label: "Created At" },
        { key: "updatedAt", label: "Updated At" },
        { key: "actions", label: "Actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.getListUser();
  },
  methods: {
    getListUser() {
      this.$axios
        .get("users", {
          params: {
            limit: this.limitUser,
            offset: this.offsetUser,
          },
        })
        .then((res) => {
          let data = res.data;
          data.forEach((item) => {
            this.dataUser.push({
              id: item.id,
              email: item.email,
              password: item.password,
              name: item.name,
              role: item.role,
              avatar: item.avatar,
              createAt: this.formatDate(item.creationAt),
              updatedAt: this.formatDate(item.updatedAt),
            });
          });
        });
    },
    performSearch() {
      this.searchQuery = this.tempSearchQuery; // Apply the temporary search query
      this.currentPage = 1; // Reset to first page after search
    },
    addUser() {
      this.$router.push("/addUser");
    },
    editUser(item) {
      this.$router.push("/editUser/?id=" + item.id);
    },
    deleteUser(id) {
      this.$axios.delete("users/" + id).then((res) => {
        if (res) {
          this.getListUser();
          alert("Delete success");
        }
      });
    },
    formatDate(timestamp) {
      return moment(timestamp).format("DD-MM-YYYY");
    },
  },
  computed: {
    uniqueNames() {
      const roles = this.dataUser.map((user) => user.role);
      return [...new Set(roles)];
    },
    filteredUser() {
      return this.dataUser.filter((user) => {
        const matchesName = this.selectedName
          ? user.role === this.selectedName
          : true;
        const matchesQuery = user.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        return matchesName && matchesQuery;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredUser.length / this.itemsPerPage);
    },
    paginatedUser() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.filteredUser.slice(start, end);
    },
  },
  watch: {
    currentPage() {
      this.paginatedUser;
    },
  },
};
</script>
