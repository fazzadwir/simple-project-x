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

createApp(App)
  .use(store)
  .use(router)
  .use(createBootstrap({ components: true, directives: true }))
  .mount("#app");
