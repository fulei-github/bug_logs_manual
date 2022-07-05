/*
 * @Description: 设置浏览器title
 * @Autor: fulei
 * @Date: 2020-05-12 17:02:15
 * @LastEditors: fulei
 * @LastEditTime: 2022-05-12 17:26:45
 */
export default function setTitle(title) {
  document.title = title
  document.head.querySelector("title").innerText = title
}
