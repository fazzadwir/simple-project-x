import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/login/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
