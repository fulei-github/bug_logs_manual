/*
 * @Description: mixin全局混入
 * @Date: 2022-05-19 18:29:31
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-08 14:34:04
 */
import { formatLabelByLocalCode } from "@/utils/dictionary"
import { dayFormat } from "@/utils/dayjs"
import { random } from "@/utils/common"
import { validateUserNameFn, validatePassWordFn } from "@/utils/check"

export default {

  methods: {
    formatLabelByLocalCode,
    dayFormat,
    random,
    validateUserNameFn,
    validatePassWordFn
  }
}