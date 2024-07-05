import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "@/views/login/Login.vue";
import ListProduct from "@/views/product/ListProduct.vue";
import AddProduct from "@/views/product/AddProduct.vue";
import EditProduct from "@/views/product/EditProduct.vue";
import ListCategory from "@/views/category/ListCategory.vue";
import ListUser from "@/views/user/ListUser.vue";
import EditUser from "@/views/user/EditUser.vue";
import AddUser from "@/views/user/AddUser.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    meta: {
      guest: true,
    },
  },
  {
    path: "/product",
    name: "listProduct",
    component: ListProduct,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/addProduct",
    name: "addProduct",
    component: AddProduct,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/editProduct/",
    name: "editProduct",
    component: EditProduct,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/category",
    name: "listCategory",
    component: ListCategory,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/user",
    name: "listUser",
    component: ListUser,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/editUser/",
    name: "editUser",
    component: EditUser,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/addUser",
    name: "AddUser",
    component: AddUser,
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (store.state.userdata == null) {
      next("/");
    }
  }
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.state.userdata !== null) {
      next("/product");
    }
  }
  next();
});

export default router;
