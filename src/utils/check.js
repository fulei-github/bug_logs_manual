/*
 * @Description: 常用这则校验
 * @Date: 2022-06-16 11:00:16
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-08 15:51:51
 */

const userNameReg = /^[a-zA-Z0-9_-]{4,16}$/ //校验账号正则
const passwordReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/ //校验密码正则
/**
 * 校验账号格式
 * @param {*} str
 */

export function checkUserName(str) {
  return userNameReg.test(str)
}
/**
 * 校验账号格式
 * @param {*} str
 */
export function checkPassword(str) {
  return passwordReg.test(str)
}
/**
 * 校验账号正误
 * @param {*} userName
 * @param {*}
 */
export const validateUserNameFn = (rule, value, callback) => {
  if (!checkUserName(value)) {
    callback(new Error("请输入4到16位（字母，数字，下划线，减号）"))
  } else {
    callback()
  }
}
/**
 * 校验账号正误
 * @param {*} userName
 * @param {*}
 */
export const validatePassWordFn = (rule, value, callback) => {
  if (!checkUserName(value)) {
    callback(new Error("密码最少6位，至少包括1个大写字母，1个小写字母，1个数字，1个特殊字符"))
  } else {
    callback()
  }
}