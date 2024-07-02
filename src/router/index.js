<<<<<<< HEAD
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/login/LoginView.vue";
import ListCategory from "@/views/category/ListCategory.vue"
import EditCategory from "@/views/category/EditCategory.vue"
import AddCategory from "@/views/category/AddCategory.vue"
=======
import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/login/Login.vue'
import ListProduct from '@/views/product/ListProduct.vue'
import AddProduct from '@/views/product/AddProduct.vue'
import EditProduct from '@/views/product/EditProduct.vue'
import ListCategory from '@/views/category/ListCategory.vue'
import store from '@/store'
>>>>>>> 719528a1a7c5c546c132cdbcf4ba029f7bfc3cdc

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
<<<<<<< HEAD
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
=======
    path: '/product',
    name: 'listProduct',
    component: ListProduct,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/addProduct',
    name: 'addProduct',
    component: AddProduct,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/editProduct/',
    name: 'editProduct',
    component: EditProduct,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/category',
    name: 'listCategory',
    component: ListCategory,
    meta:{
      requireAuth: true
    }
  },
]
>>>>>>> 719528a1a7c5c546c132cdbcf4ba029f7bfc3cdc

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
      next('/product')
    }
  }
  next();
})


export default router
