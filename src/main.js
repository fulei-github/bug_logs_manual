/*
 * @Description:
 * @Date: 2022-07-05 15:13:59
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-14 12:12:11
 */
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Mixin from "./mixins"
Vue.mixin(Mixin)
import "@/use" //注册组件
import "@/icons"
import "@/theme/element-variables.scss"
import "element-ui/lib/theme-chalk/index.css"
import "@/styles/index.scss" // 引入基础样式
import "@/components/index" // 自动注册全局的组件
import "animate.css"
import afterEachHandler from "@/router/after-each"
import dataV from "@jiaminghi/data-view"
import { beforeEachHandler } from "@/router/before-each"
import sessionUtil from "@/utils/session-storage"
Vue.prototype.$sessionUtil = sessionUtil
router.beforeEach(beforeEachHandler)
Vue.use(dataV)
Vue.config.productionTip = false
//标题设置
router.afterEach(afterEachHandler)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
