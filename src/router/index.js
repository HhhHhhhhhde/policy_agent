import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '../views/ChatView.vue'
import AnalyticsView from '../views/AnalyticsView.vue'
import SimulationView from '../views/SimulationView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    redirect: '/chat',
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
    meta: {
      breadcrumb: ['首页', '智能对话'],
    },
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: AnalyticsView,
    meta: {
      breadcrumb: ['首页', '分歧度仪表盘'],
    },
  },
  {
    path: '/simulation',
    name: 'simulation',
    component: SimulationView,
    meta: {
      breadcrumb: ['首页', '仿真参数设置'],
    },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      breadcrumb: ['首页', '研究背景'],
    },
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
