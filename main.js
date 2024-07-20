import store from '@/store/store.js'

// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'

export function createApp() {
  const app = createSSRApp(App)
  
  const pinia = createPinia()
  app.use(pinia)
  
  //在vue3中，无法使用全局api的use()来挂载插件
  //而应该在应用实例上使用use来挂载插件
  app.use(store)
  return {
    app,
    pinia
  }
}
// #endif

import {$http} from '@escook/request-miniprogram'

uni.$http = $http

//请求的根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

//请求拦截器
$http.beforeRequest = function(options){
  uni.showLoading({
    title:'数据加载中...'
  })
  
  if(options.url.indexOf('/my')!==-1){
    options.header ={
      Authorization: store.state.m_user.token
    }
  }
}
//响应拦截器
$http.afterRequest = function(){
  uni.hideLoading()
}

//封装弹框的方法
uni.$showMsg = function(title='数据请求失败！',duration = 1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}