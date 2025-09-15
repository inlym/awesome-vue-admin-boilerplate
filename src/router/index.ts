import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: '关于'
      }
    },
    {
      path: '/user',
      name: 'user',
      meta: {
        title: '用户管理'
      },
      children: [
        {
          path: 'list',
          name: 'userList',
          component: () => import('../views/UserListPage.vue'),
          meta: {
            title: '用户列表'
          }
        }
      ]
    },
    {
      path: '/user/list',
      name: 'userListDirect',
      component: () => import('../views/UserListPage.vue'),
      meta: {
        title: '用户列表'
      }
    }
  ],
})

export default router
