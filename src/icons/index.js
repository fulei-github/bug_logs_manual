/*
 * @Description: SvgIcon
 * @Date: 2022-06-02 16:01:12
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-05 16:34:44
 */

// import Vue from "vue"
// import SvgIcon from "@/components/global/svg-Icon"// svg component

// Vue.component("svg-icon", SvgIcon)

const req = require.context("./svg", false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
