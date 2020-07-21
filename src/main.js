// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../../vue-test/src/App'
import router from '../../vue-test/src/router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  // window.document.title=to.meta.title;
  if (to.meta.requireAuth === true) { // 需要登录权限进入的路由
    if (store.state.token) { // 取到登录信息
      next()
    } else if (sessionStorage.getItem('isLogin')) { // 得到登录信息，进行下一步
      next()
    } else {
      next({name: 'Login'})
    }
  } else { // 不需要登录权限
    next()
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
