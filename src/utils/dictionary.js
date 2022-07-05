/*
 * @Description: 字典处理函数
 * @Version: 0.1
 * @Autor: fulei
 */
import localDict from "@/assets/data/dict"

/**
 * 根据value得到label
 * @param {*} val value值
 * @param {*} type 字典名称
 * @param {*} nullMsg 占位默认字符---防止为空
 * @returns 
 */
export function formatLabelByLocalCode(val, type, nullMsg) {
  // console.log("全局字典", localDict)
  if (val && type) {
    const obj = localDict[type].find((item) => {
      return item.value === val
    })
    return obj?.label || val
  } else {
    return val || nullMsg || "暂无数据"
  }
}