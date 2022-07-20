/*
 * @Description:
 * @Date: 2022-06-30 21:09:07
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-16 22:53:35
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

// 获取所有用户接口
export function getAllUserApi(params) {
  return request({
    url: `/api/user/findAll`,
    method: "post",
    data: params
  })
}

// 获取所有角色列表
export function getAllRoleListApi(params) {
  return request({
    url: `/api/permission/getRoleList`,
    method: "post",
    data: params
  })
}

// 添加角色
export function addRoleApi(params) {
  return request({
    url: `/api/permission/addRole`,
    method: "post",
    data: params
  })
}

// 添加角色
export function delroleApi(params) {
  return request({
    url: `/api/permission/delrole`,
    method: "post",
    data: params
  })
}

// 修改角色
export function editRoleApi(params) {
  return request({
    url: `/api/permission/editRole`,
    method: "post",
    data: params
  })
}
