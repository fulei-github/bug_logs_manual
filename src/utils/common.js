/*
 * @Description: 公共函数
 * @Date: 2022-06-10 19:27:29
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-07 22:36:35
 */
export function setTitle(title) {
  document.title = title
  document.head.querySelector("title").innerText = title
}
//导出随机数
export function random(n, m) {
  var tmp = m - n + 1
  return Math.floor(Math.random() * tmp + n)
}
/**
 * @description: 节流函数
 * @return {*}
 */
let throttleFlag = true
export function throttle(fn, time = 30) {
  if (!throttleFlag) {
    return
  }
  throttleFlag = false
  setTimeout(() => {
    fn?.apply(this, arguments)
    throttleFlag = true
  }, time)
}
