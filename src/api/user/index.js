/*
 * @Description: 
 * @Date: 2022-06-30 21:09:07
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-13 22:57:17
 */
import request from "../axios"
// const serveName = process.env.VUE_APP_SERVE_NAME
// console.log("环境变量", serveName)

// 注册接口
export function createUserApi(params) {
  return request({
    url: `/api/user/createUser`,
    method: "post",
    data: params
  })
}

// 登录接口
export function loginApi(params) {
  return request({
    url: `/api/user/login`,
    method: "post",
    data: params
  })
}