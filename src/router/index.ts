import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { titleKey: 'home' },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
    meta: { titleKey: 'about' },
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/ProductsView.vue'),
    meta: { titleKey: 'products' },
  },
  {
    path: '/products/:category',
    name: 'ProductCategory',
    component: () => import('@/views/ProductCategoryView.vue'),
    meta: { titleKey: 'products' },
  },
  {
    path: '/products/:category/:slug',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetailView.vue'),
    meta: { titleKey: 'products' },
  },
  {
    path: '/resources',
    name: 'Resources',
    component: () => import('@/views/ResourcesView.vue'),
    meta: { titleKey: 'resources' },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { titleKey: 'contact' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

export default router
