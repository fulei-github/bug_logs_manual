/*
 * @Description:
 * @Date: 2022-06-13 11:14:05
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-13 22:56:18
 */
// import router from "@/router" // 引入路由实例
import { getToken } from "@/utils/auth"
const whiteList = ["/login", "/404", "/index", "/article-detail", "/echarts"] // 定义白名单  所有不受权限控制的页面

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
      next()
    } else {
      //无token
      next("/login")
    }
  }
}
export { beforeEachHandler }