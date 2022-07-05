/*
 * @Description: 设置路由
 * @Date: 2022-05-19 18:29:31
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-05 16:10:52
 */

import Vue from "vue"

import Router from "vue-router"
Vue.use(Router)
//自动引入模块路由，路由为模块下index.js文件
export let routes = []
const routerContext = require.context("./", true, /index\.js$/)
routerContext.keys().forEach(route => {
  if (route.startsWith("./index")) {
    return
  }
  const routerModule = routerContext(route)
  routes = [...(routerModule.default || routerModule), ...routes]
})
var router = new Router({
  linkActiveClass: "active",
  // base: process.env.NODE_ENV === "production" ? process.env.VUE_APP_BASE : "/", //history模式部署服务器匹配值
  mode: "hash",
  // 滚动条回到顶部
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.keepAlive) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes
})

export default router