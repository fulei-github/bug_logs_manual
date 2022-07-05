/*
 * @Description: 注册组件--element
 * @Date: 2022-07-05 15:13:59
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-05 16:10:01
 */
import Vue from "vue"
import { message } from "@utils/reset-message"
import ElementUI from "element-ui"
Vue.use(ElementUI)
Vue.prototype.$message = message
