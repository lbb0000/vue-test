import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout/Layout'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [{
        path: '',
        name: 'home-index',
        component: () => import('@/views/Home/Index')
      }]
    },
    {
      path: '/doc',
      component: Layout,
      meta: { title: '文案管理', icon: 'role', isCommon: false },
      children: [{
        path: 'list',
        name: 'doc-list',
        component: () => import('@/views/DocManage/List'),
        meta: { title: '文案列表', icon: 'role', isCommon: false }
      }]
    }
  ]
})
