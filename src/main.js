import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import cookie from "js-cookie";
//bootstrap
import { createBootstrap } from "bootstrap-vue-next";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
//custom style
import "./assets/scss/style.scss";

const axiosInstance = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/",
  timeout: 180000, // 3 menit
  headers: {
    Authorization: "Bearer",
    "Content-Type": "application/json",
  },
});

const app = createApp(App);
app.config.globalProperties.$axios = axiosInstance;
app.use(store)
app.use(router)
app.use(createBootstrap({ components: true, directives: true }))
app.mount("#app");
