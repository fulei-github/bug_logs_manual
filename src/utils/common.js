/*
 * @Description: 公共函数
 * @Date: 2022-06-10 19:27:29
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-08 11:47:36
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

/**
 * @description: 拍平对象
 * @return {*}
 */
export function floatObj(obj) {
  var res = {} //定义一个对象，用来存储结果
  function isObj(obj) { //定义一个函数，用来对obj进行遍历
    for (var key in obj) {
      if (Object.prototype.toString.call(obj[key]) == "[object Object]") { //如果值为对象，则进行递归
        isObj(obj[key])
      } else { //不为对象则将值添加给res
        res[key] = obj[key]
      }
    }
  }
  isObj(obj) //调用函数
  return res //返回结果
}
