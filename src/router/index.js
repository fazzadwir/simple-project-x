import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from "@/views/login/Login.vue";
import ListCategory from "@/views/category/ListCategory.vue"
import EditCategory from "@/views/category/EditCategory.vue"
import AddCategory from "@/views/category/AddCategory.vue"
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta:{
      guest: true
    }
  },
  {
    path: "/category",
    name: "listCategory",
    component: ListCategory,
    meta:{
      requireAuth: true
    }
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
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next)=>{
  if(to.matched.some(record => record.meta.requireAuth)){
    if(store.state.userdata == null){
      next('/')
    }
  }
  if(to.matched.some(record => record.meta.guest)){
    if(store.state.userdata !== null){
      next('/category')
    }
  }
  next();
})


export default router
