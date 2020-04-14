import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Brands from '../views/Brands.vue'
import AddBrand from '../views/AddBrand.vue'
import AddProduct from '../views/AddProduct.vue'
import EditBrand from '../views/EditBrand.vue'
import EditProduct from '../views/EditProduct.vue'
import Storage from '../views/Storage.vue'
import EditStorage from '../views/EditStorage.vue'
import Bills from '../views/Bills.vue'
import Users from '../views/Users.vue'
import EditUser from '../views/EditUser.vue'
import BillDetail from '../views/BillDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/brands',
    name: 'brands',
    component: Brands
  },
  {
    path: '/brand/add',
    name: 'brand/add',
    component: AddBrand
  },
  {
    path: '/product/add',
    name: 'product/add',
    component: AddProduct
  },
  {
    path: '/brand/edit',
    name: 'brand/edit',
    component: EditBrand
  },
  {
    path: '/product/edit',
    name: 'product/edit',
    component: EditProduct
  },
  {
    path: '/storage',
    name: 'storage',
    component: Storage
  },
  {
    path: '/storage/update',
    name: 'storage/update',
    component: EditStorage
  },
  {
    path: '/bills',
    name: 'bills',
    component: Bills
  },
  {
    path: '/bill/detail',
    name: 'bill/detail',
    component: BillDetail
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/user/edit',
    name: 'user/edit',
    component: EditUser
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
