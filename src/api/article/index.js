/*
 * @Description:
 * @Date: 2022-06-30 21:09:07
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-16 22:12:37
 */
import request from "../axios"
// const serveName = process.env.VUE_APP_SERVE_NAME
// console.log("环境变量", serveName)

// 获取分类列表
export function getCatgoryApi(data) {
  return request({
    url: `/api/category/findAll`,
    method: "post",
    data
  })
}

// 新增分类
export function addCatgoryApi(data) {
  return request({
    url: `/api/category/addCatgory`,
    method: "post",
    data
  })
}

// 删除分类
export function delCatgoryApi(data) {
  return request({
    url: `/api/category/delCatgory`,
    method: "post",
    data
  })
}

// 修改分类
export function editCatgoryApi(data) {
  return request({
    url: `/api/category/editCatgory`,
    method: "post",
    data
  })
}

// 获取文章列表
export function getArticleApi(data) {
  return request({
    url: `/api/article/getArticle`,
    method: "post",
    data
  })
}

// 新增文章
export function addArticleApi(data) {
  return request({
    url: `/api/article/addArticle`,
    method: "post",
    data
  })
}

// 删除文章
export function delArticleApi(data) {
  return request({
    url: `/api/article/delArtById`,
    method: "post",
    data
  })
}
