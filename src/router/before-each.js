/*
 * @Description:
 * @Date: 2022-06-13 11:14:05
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei🐰
 * @LastEditTime: 2022-11-08 20:00:39
 */
// import router from "@/router" // 引入路由实例
import { getToken } from "@/utils/auth"
const whiteList = ["/login", "/404", "/index", "/article-detail", "/echarts"] // 定义白名单  所有不受权限控制的页面
// const userList = ["/login", "/", "/article", "/article-detail", "/personal", "/echarts", "/me"] //普通用户
const res = JSON.parse(window.sessionStorage.getItem("user"))?.permission || ""
const permission = res ? res.split(",") : []

function beforeEachHandler(to, from, next) {
  if (
    whiteList
      .toString()
      .toLowerCase()
      .indexOf(to.path.toString().toLowerCase()) > -1
  ) {
    //在白名单--放行
    next()
  } else {
    //不在白名单--判断有无token
    const token = getToken()
    if (token !== null) {
      //有token
      if (permission.includes("admin") || permission.includes("super")) {
        next()
      } else {
        next("/")
      }
      // next()
    } else {
      //无token
      next("/login")
    }
  }
}
export { beforeEachHandler }
