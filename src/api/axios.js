/*
 * @Description: 接口请求统一配置
 * @Date: 2022-06-29 19:00:02
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-14 12:21:03
 */
import qs from "qs"
import axios from "axios"
import { getToken } from "@/utils/auth"
import Vue from "vue"
function commonJoinQuery(config) {
  let url = config.url
  const data = config.data
  for (const key in data) {
    if (key !== "file") {
      url +=
        url.indexOf("?") < 0 ? `?${key}=${data[key]}` : `&${key}=${data[key]}`
    }
  }
  console.log("url", url)
  return url
}

// 环境变量
const API_BASEURL = process.env.BASE_URL //api基础路径
const CLIENT_TIMEOUT = process.env.VUE_APP_TIMEOUT || 8000

const service = axios.create({
  baseURL: API_BASEURL,
  timeout: CLIENT_TIMEOUT,
  headers: {
    "Content-Type": "application/json"
  }
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    const token = getToken()
    //本地有token拼接到请求头
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    // 对formData请求体处理
    if (config.formData) {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded"

      // 流
      if (config.blob) {
        config.responseType = "blob"
      }

      // 除了formdata参数，部分参数以?a=xx&b=yy形式拼接到url上
      if (config.postFormDataQuery) {
        config.url = commonJoinQuery(config)
      }

      // 图片上传时用append
      if (config.data?.file) {
        const formData = new FormData()
        for (const key in config.data) {
          formData.append(key, config.data[key])
        }
        config.data = formData
      } else {
        config.data = qs.stringify(config.data) // qs序列化
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (response.config.responseType === "blob") {
      return response
    }
    if (res.code !== 200) {
      const error = res.msg || "Error"
      Vue.prototype.$message.error(error)
      return res
    } else {
      return res
    }
  },
  (error) => {
    if (error.response.status === 401) {
      Vue.prototype.$message.error("登录过期,请重新登录")
    }
  }
)

export default service
