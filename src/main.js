import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let isLogin0 = sessionStorage.getItem('isLogin')
  console.log('main.js中的isLogin===='+isLogin0)
  // eslint-disable-next-line eqeqeq
  if (to.path == '/dashboard'||to.path == '/') {
    // eslint-disable-next-line eqeqeq
    if (JSON.parse(sessionStorage.getItem("isLogin")) == null) {
      console.log('进入isLogin == null')
      next({ path: '/login' })
    }else if(JSON.parse(sessionStorage.getItem("isLogin"))==true){
      console.log('进入isLogin == true')
      next()
    }
  }else if(to.path =='/logout'){
    localStorage.clear();
    sessionStorage.clear();
    next({path:'/login'})
  }
  // 下一个路由
  next()
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
