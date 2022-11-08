/*
 * @Description: mixin全局混入
 * @Date: 2022-05-19 18:29:31
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei🐰
 * @LastEditTime: 2022-11-08 20:10:00
 */
import { formatLabelByLocalCode } from "@/utils/dictionary"
import { dayFormat } from "@/utils/dayjs"
import { random } from "@/utils/common"
import { validateUserNameFn, validatePassWordFn } from "@/utils/check"

export default {
  data() {
    return {
      user: [],
      paginationForm: {
        total: 10,
        page: "1",
        rows: "10"
      }
    }
  },
  created() {
    this.user = JSON.parse(window.sessionStorage.getItem("user"))
  },
  methods: {
    //限制权限
    canClick(){
      const permission = this.user.permission ? this.user.permission.split(",") : []
      if (permission.includes("admin") || permission.includes("super")){
        return true
      }
      return false
    },
    formatLabelByLocalCode,
    dayFormat,
    random,
    validateUserNameFn,
    validatePassWordFn
  }
}
