import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductsBest from '../components/ProductsBest.vue'
import ProductsByCategory from '../components/ProductsByCategory.vue'
import ProductsByRetailer from '../components/ProductsByRetailer.vue'
import Scrapes from '../components/Scrapes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ProductsBest',
    component: ProductsBest
  },
  {
    path: '/admin',
    name: 'Scrapes',
    component: Scrapes
  },
  {
    path: '/category/:id',
    name: 'ProductsByCategory',
    component: ProductsByCategory
  },
  {
    path: '/retailer/:id',
    name: 'ProductsByRetailer',
    component: ProductsByRetailer
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
