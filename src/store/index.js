import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 创建一个store仓库
const store = new Vuex.Store({
// state用来存放数据的对象
  state: {
  // 初始值、存放的东西
    userName: '',
    token: ''
  },
  // 定义取数据
  getters: {
    userName: state => state.userName,
    token: state => state.token
  },
  mutations: {
    setName (state, n) {
      state.token = n.token
      state.userName = n.userName
    }
  }
})

export default store
