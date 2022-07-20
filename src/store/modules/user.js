/*
 * @Description: vuex登录设置
 * @Date: 2022-06-16 11:37:35
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-16 17:58:45
 */

import { getToken, getUser, setTokenInLocal } from "@/utils/auth"
import { loginApi } from "@/api/user/index"
import Vue from "vue"
const state = {
  token: getToken() || null,
  user: getUser()
}
const mutations = {
  // 设置token
  setToken(state, data) {
    state.token = data.token // 设置token
    setTokenInLocal(data.token)
    sessionStorage.setItem("user", JSON.stringify(data.user))
  }
}
const actions = {
  async getTokenAction(ctx, data) {
    const res = await loginApi(data)
    if (res.code === 200) {
      Vue.prototype.$message.success(res.msg)
      ctx.commit("setToken", res.data)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
