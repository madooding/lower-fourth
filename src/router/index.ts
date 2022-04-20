import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/control-panel',
          name: 'control-panel',
          component: () => import('@/views/ControlPanelView.vue'),
        },
        {
          path: '/monitor',
          name: 'monitor',
          component: () => import('@/views/HomeView.vue'),
        },
      ],
    },
  ],
})

export default router
