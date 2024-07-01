import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/login/LoginView.vue";
import ListCategory from "@/views/category/ListCategory.vue"
import EditCategory from "@/views/category/EditCategory.vue"
import AddCategory from "@/views/category/AddCategory.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: LoginView,
  },
  {
    path: "/category/listData",
    name: "listCategory",
    component: ListCategory,
  },
  {
    path: "/category/editData/:id",
    name: "editCategory",
    component: EditCategory,
  },
  {
    path: "/category/addData",
    name: "addCategory",
    component: AddCategory,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
