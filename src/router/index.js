import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout/Layout'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      component: Layout,
      children: [{
        path: '',
        name: 'home-index',
        component: () => import('@/views/Home/Index')
      }],
      meta: {
        requireAuth: true
      }
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
      }, {
        path: 'add',
        name: 'doc-add',
        component: () => import('@/views/DocManage/Add'),
        meta: { title: '添加文案管理项', icon: 'role', isCommon: false }
      }, {
        path: 'edit/:id',
        name: 'doc-edit',
        component: () => import('@/views/DocManage/Edit'),
        meta: { title: '编辑文案管理项', icon: 'role', isCommon: false }
      }
      ]
    }
  ]
})
