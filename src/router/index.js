import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductsBest from '../components/ProductsBest.vue'
import ProductsByCategory from '../components/ProductsByCategory.vue'
import ProductsByRetailer from '../components/ProductsByRetailer.vue'
import ScrapeHistory from '../components/admin/ScrapeHistory.vue'
import ScrapeSettings from '../components/admin/ScrapeSettings.vue'
import CategoryMapping from '../components/admin/CategoryMapping.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ProductsBest',
    component: ProductsBest
  },
  {
    path: '/scraping/history',
    name: 'ScrapeHistory',
    component: ScrapeHistory
  },
  {
    path: '/scraping/settings',
    name: 'ScrapeSettings',
    component: ScrapeSettings
  },
  {
    path: '/admin/categorymap',
    name: 'CategoryMapping',
    component: CategoryMapping
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
