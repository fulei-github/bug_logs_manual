/*
 * @Description: 设置sessionStorage
 * @Date: 2022-06-16 11:44:09
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-06-16 11:44:15
 */

const ls = window.sessionStorage
export default {
  getItem(key) {
    try {
      return JSON.parse(ls.getItem(key))
    } catch (err) {
      return err
    }
  },
  setItem(key, val) {
    try {
      ls.setItem(key, JSON.stringify(val))
    } catch (err) {
      return err
    }
  },
  clear() {
    ls.clear()
  },
  keys() {
    return ls.keys()
  },
  removeItem(key) {
    ls.removeItem(key)
  }
}
