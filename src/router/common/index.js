/*
 * @Description: 单位路由
 * @Date: 2022-04-30 12:44:45
 * @Version: 0.1
 * @Autor: cjz
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-08 14:24:28
 */

import Layout from "@/layout/index.vue"

export default [
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "publicModule" */ "@/views/login-module/index.vue")
  },
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        meta: {
          title: "首页"
        },
        component: () =>
          import(/* webpackChunkName: "publicModule" */ "@/views/home/index.vue")
      }
    ]
  },
  {
    path: "/article",
    component: Layout,
    redirect: "/article",
    children: [
      {
        path: "/article-edit",
        meta: {
          title: "编辑文章"
        },
        component: () =>
          import(/* webpackChunkName: "publicModule" */ "@/views/article-module/edit.vue")
      }
    ]
  },
  {
    path: "/article-detail",
    component: Layout,
    redirect: "/article-detail",
    children: [
      {
        path: "/article-detail",
        meta: {
          title: "文章详情"
        },
        component: () =>
          import(/* webpackChunkName: "publicModule" */ "@/views/article-module/detail.vue")
      }
    ]
  }
  // {
  //   path: "*",
  //   name: "not-found",
  //   component: () =>
  //     import(/* webpackChunkName: "notFoundModule" */ "@/views/default.vue")
  // }
]
