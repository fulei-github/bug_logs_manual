/*
 * @Description: 共用组件配置
 * @Version: 0.1
 * @Autor: fulei
 * @Date: 2022-05-12 11:26:58
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-05 16:13:25
 */

import Vue from "vue"
// 自动加载 global 目录下的 .vue 结尾的文件
const componentsContext = require.context("./global", true, /index\.(vue|js)$/)
componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component)
  /*
    * 兼容 import export 和 require module.export 两种规范
    */
  const ctrl = componentConfig.default || componentConfig
  Vue.component(ctrl.name, ctrl)
})