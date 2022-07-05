/*
 * @Description: 日期处理函数
 * @Version: 0.1
 * @Autor: fulei
 */
import dayjs from "dayjs"

/**
 * 日期格式转换
 * @param {String} day 日期
 * @param {String} format 日期格式 常用格式参数如下：
 * date: "YYYY-MM-DD",
 * month: "YYYY-MM",
 * datetime: "YYYY-MM-DD HH:mm:ss",
 * time: "HH:mm:ss",
 * year: "YYYY"
 */
const DEFAULT_FORMATS = {
  date: "YYYY-MM-DD",
  month: "YYYY-MM",
  datetime: "YYYY-MM-DD HH:mm:ss",
  time: "HH:mm:ss",
  year: "YYYY"
}

export function dayFormat(day, format) {
  format = DEFAULT_FORMATS[format] || format
  return dayjs(day).format(format)
}
