import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)
function storeLocalStore(state) {
  window.localStorage.setItem('userMsg', JSON.stringify(state))
}
// 全局 state 对象，用于保存所有组件的公共数据
const state = {
  // 定义一个 user 对象
  // 在vue组件中是通过 this.$store.state.user 来获取
  user: {
    id: 0,
    userName: ''
  }
}
// 实时监听 state 值的最新状态，注意这里的 getters 可以理解为计算属性
// const getters = {
// 在组件中是通过 this.$store.getters.getUser 来获取
//   getUser(state) {
//     return state.user
//   }
// }

// 定义改变 state 初始值的方法，这里是唯一可以改变 state 的地方，缺点是只能同步执行
const mutations = {
  // 在组件中是通过 this.$store.commit('updateUser', user); 方法来调用 mutations
  updateUser(state, user) {
    state.user = user
  }
}
// 定义触发 mutations 里函数的方法，可以异步执行 mutations 里的函数
const actions = {
  // 在组件中是通过 this.$store.dispatch('asyncUpdateUser', user); 来调用 actions
  asyncUpdateUser(context, user) {
    context.commit('updateUser', user)
  }
}
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  state,
  getters,
  mutations,
  actions,
  storeLocalStore
})

export default store
