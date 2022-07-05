/*
 * @Description: 
 * @Date: 2022-07-05 15:13:59
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-05 16:12:36
 */
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "@/use" //注册组件
import "@/theme/element-variables.scss"
import "element-ui/lib/theme-chalk/index.css"
import afterEachHandler from "@/router/after-each"

// import "@/styles/index.scss" // 引入基础样式
Vue.config.productionTip = false
//标题设置
router.afterEach(afterEachHandler)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
