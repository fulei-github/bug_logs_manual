/*
 * @Description: mixin全局混入
 * @Date: 2022-05-19 18:29:31
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-07 10:24:20
 */
import { formatLabelByLocalCode } from "@/utils/dictionary"
import { dayFormat } from "@/utils/dayjs"
import { random } from "@/utils/common"

export default {

  methods: {
    formatLabelByLocalCode,
    dayFormat,
    random
  }
}