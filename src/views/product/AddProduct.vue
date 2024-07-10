<template>
  <div>
    <h1 class="text-center white">Add Product</h1>
  </div>

  <table class="table text-center">
    <tbody>
      <tr>
        <td>
          <form>
            Title: <br /><input type="text" v-model="title" /><br />
            Category: <br />
            <select v-model="category">
              <option
                v-for="(item, index) in categoryProductList"
                :key="index"
                :value="item.id"
              >
                {{ item.name }}
              </option></select
            ><br />
            Description: <br /><textarea v-model="description" /><br />
            Price: <br /><input type="number" v-model="price" /><br />
            <!-- Image URL: <br><input type="text" v-model="images"><br> -->
            <input type="file" @change="listenFile" multiple />
            <br /><button @click="routeToPageHome">Back</button
            ><button class="submit" @click="addData">Submit</button>
          </form>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      mainId: "",
      dataProduct: [],
      categoryProductList: [],

      title: "",
      price: "",
      description: "",
      category: "",
      images: "",

      file: null,
    };
  },
  methods: {
    listenFile(event) {
      this.file = event.target.files;
      console.log("file", this.file[0]);
    },
    routeToPageHome() {
      this.$router.push("/product");
    },
    addData() {
      console.log("tes", this.file[0]);
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
          alert("FIle ditambah!");
          console.log("response", response.data.location);
          image = response.data.location;
          this.$axios
            .post("products/" + this.mainId, {
              title: this.title,
              price: this.price,
              description: this.description,
              categoryId: this.category,
              images: [image],
            })
            .then(() => {
              alert("Data ditambah!");
              this.$router.push({ path: "/product" });
            });
        });
    },
    getListDataCategory() {
      this.$axios.get("categories").then((res) => {
        this.categoryProductList = res.data;
        console.log(this.categoryProductList);
      });
    },
  },
  mounted() {
    this.getListDataCategory();
  },
};
</script>
