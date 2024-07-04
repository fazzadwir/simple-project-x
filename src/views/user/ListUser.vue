<template>
  <div class="home">
    <h1>User Table</h1>
    <button @click="addUser" type="button">Add User</button>
    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Email</th>
          <th>Password</th>
          <th>Name</th>
          <th>Role</th>
          <th>Avatar</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th colspan="2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataUser" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.password }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.role }}</td>
          <td>
            <img :src="item.avatar" style="width: 50px" alt="profile picture" />
          </td>
          <td>{{ item.createAt }}</td>
          <td>{{ item.updatedAt }}</td>
          <td><button @click="editUser(item)">Edit</button></td>
          <td><button @click="deleteUser(item.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ListUser",
  data() {
    return {
      dataUser: [],
      limitUser: 40,
      offsetUser: 5,
    };
  },
  mounted() {
    this.getListUser();
    console.log(this.dataUser);
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
          console.log("ini data asli: ", data); //ini data asli
          data.forEach((item) => {
            this.dataUser.push({
              id: item.id,
              email: item.email,
              password: item.password,
              name: item.name,
              role: item.role,
              avatar: item.avatar,
              createAt: item.creationAt,
              updatedAt: item.updatedAt,
            });
          });
          console.log("ini data hasil manipulasi: ", this.dataUser);
        });
    },
    addUser() {
      this.$router.push("/addUser");
    },
    editUser(item) {
      this.$router.push("/editUser/?id=" + item.id + "");
    },
    deleteUser(id) {
      this.$axios.delete("users/" + id).then((res) => {
        if (res) {
          this.dataUser = [];
          this, this.getListUser();
          console.log("Delete success !", res);
          alert("Delete success");
        }
      });
    },
  },
};
</script>
