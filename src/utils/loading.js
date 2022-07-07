/*
 * @Description: loading效果
 * @Date: 2022-07-07 10:55:03
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-07 10:55:07
 */
import { Loading } from "element-ui"

//开始 加载loading
let loading = null
let needLoadingRequestCount = 0 //声明一个变量
const startLoading = () => {
  loading = Loading.service({
    text: "快好了，请稍等...", //加载动画的文字
    background: "rgba(255, 255, 255, 0.4)"//加载动画的背景
  })
}

//showFullScreenLoading() 与 tryHideFullScreenLoading() 目的是合并同一页面多个请求触发loading
export const showFullScreenLoading = () => {
  if (!needLoadingRequestCount) {
    startLoading()
  }
  needLoadingRequestCount++ //全局变量值++
}

export const tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) { return }
  needLoadingRequestCount-- //正常响应后 全局变量 --
  if (!needLoadingRequestCount) { //等于0 时证明全部加载完毕 此时结束loading 加载
    endLoading()
  }
}

//结束 取消loading加载
export const endLoading = () => {
  loading.close()
}