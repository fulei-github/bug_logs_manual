/*
 * @Description: 配置文件
 * @Date: 2022-07-05 15:16:26
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-05 16:00:34
 */
const path = require("path")
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: "/", //配置根路径
  outputDir: "dist", //构建输出目录
  assetsDir: "assets", //静态资源目录(js\css\img)
  lintOnSave: true, //是否开启eslint
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  devServer: {
    open: true, //是否自动在浏览器打开
    host: "0.0.0.0", //真机测试 0.0.0.0
    port: 9083, //配置端口号
    https: false, //是否配置https
    hot: true,
    hotOnly: true, //是否热更新
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://192.168.1.232:20000",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    //如果需要css热更新就设置为false,打包时候要改为true
    extract: false,
    // 开启 CSS source maps?
    sourceMap: true,
    // css预设器配置项
    loaderOptions: {
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        prependData: `@import "@/styles/variables.scss";`
      }
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "首页标题",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
  },
  chainWebpack: (config) => {
    // 别名配置
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@utils", resolve("src/utils"))
      .set("@api", resolve("src/api"))
      .set("@components", resolve("src/components"))
      .set("@pic", resolve("src/assets/imgs"))
    config.resolve.extensions.clear().merge([".js", ".vue", ".json"])
  }
}