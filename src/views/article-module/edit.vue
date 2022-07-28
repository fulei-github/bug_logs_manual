
<!--
 * @Description: 编辑
 * @Version: 0.1
 * @Autor: fulei
 * @Date: 2022-07-03 13:12:24
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-28 22:10:41
-->
<template>
  <div class="page-article-edit">
    <div class="article-title">
      <span class="input">
        <el-input v-model.trim="articleTitle" clearable placeholder="请输入文章标题..."></el-input>
      </span>
      <span class="publish">
        <el-button type="primary" @click="click">文章发布</el-button>
      </span>
    </div>
    <mavon-editor ref="md" v-model="articleContent" @save="saveEditor" @imgAdd="imgAdd" :ishljs="true" :tabSize="2" :toolbars="toolbars" :placeholder="placeholder">
      <!-- 左工具栏前加入自定义按钮 -->
      <template slot="left-toolbar-after">
        <button type="button" class="op-icon fa fa-clear-local" aria-hidden="true" title="清本地缓存" @click="handleDel">清</button>
      </template>
    </mavon-editor>
    <!-- dialog -->
    <el-dialog title="提示" :visible.sync="showDialog" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="文章类型：" prop="articleType">
          <el-select v-model="form.articleType" placeholder="请选择文章类型" clearable @change="changeSelect">
            <el-option v-for="item in catList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="列表缩略图：">
          <div class="">
            <f-upload-cropper class="avatar-box" :image="form.imageUrl" :cropWidth="280" :cropHeight="160" @cropperImg="cropperImg" />
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="submit" v-loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue"
import mavonEditor from "mavon-editor"
import "mavon-editor/dist/css/index.css"
import { addArticleApi, getCatgoryApi } from "@api/article/index"
import axios from "axios"
Vue.use(mavonEditor)
export default {
  name: "article-edit",
  data() {
    return {
      showDialog: false,
      form: {},
      catList: [],
      loading: false,
      rules: {
        articleType: [{ required: true, message: "请选择文章分类", trigger: "change" }]
      },
      tabsList: [], // 分类
      cat_name: "",
      articleContent: "", // 文章内容
      articleTitle: "", // 文章标题
      placeholder: `开始编辑...
图片设置宽度技巧：<img src='' width='400px' />    文本设置特殊颜色技巧：<font color='red' size='40px'>xxx</font> 
`,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        save: false, // 保存（触发events中的save事件）
        trash: false, // 清空
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      isPublish: false,
      // 是否显示弹窗
      isShowDialog: false,
      imgReplace: [], // 图片替换
      isEdit: false, // 是否编辑
      articleType: "", // 文章类型
      illustrationUrl: "" // 文章列表封面图片
    }
  },
  activated() {
    this.formatContent()
  },
  created() {
    this.formatContent()
    this.$message.info("您可以按下CTRL+S暂存内容哦~")
    this.getCatgory()
  },
  methods: {
    //编辑？
    formatContent() {
      const info = this.$route.query || {}
      if (info.type === "again") {
        const obj = this.$sessionUtil.getItem("info")
        this.articleTitle = obj.title
        this.articleContent = obj.content
      }
    },
    //新增文章
    addArticle(params) {
      this.loading = true
      addArticleApi(params)
        .then(res => {
          if (res.code === 200) {
            this.isPublish = true
            this.$message.success("太棒了，发布成功！")
            this.showDialog = false
            setTimeout(() => {
              this.$router.push("/")
            }, 1500)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    //获取文章分类
    getCatgory() {
      getCatgoryApi()
        .then(res => {
          if (res.code === 200) {
            this.catList = res.data.data
          }
        })
    },
    //下拉框的change‘事件
    changeSelect(val) {
      const obj = this.catList.find(v => v.id === val)
      this.cat_name = obj.name
    },
    //点击确定
    async submit() {
      try {
        await this.$refs["form"].validate()
        const obj = {
          title: this.articleTitle,
          content: this.articleContent,
          author: this.$sessionUtil.getItem("user").nickname ? this.$sessionUtil.getItem("user").nickname : this.$sessionUtil.getItem("user").username,
          user_id: this.$sessionUtil.getItem("user").id,
          catgory: this.cat_name,
          cat_id: this.form.articleType,
          article_views: "0",
          article_thumbs: "0"
        }
        this.addArticle(obj)
        console.log(obj)
      } catch (error) {
        console.log(error)
      }
    },
    //添加图片
    imgAdd(pos, file) {
      // 第一步.将图片上传到服务器.
      const formdata = new FormData()
      formdata.append("image", file)
      axios({
        url: "server url",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
               * $vm 指为mavonEditor实例，可以通过如下两种方式获取
               * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
               * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               */
        this.$refs.md.$img2Url(pos, url)
      })
    },
    //必须填写标题
    click() {
      if (!this.articleContent || !this.articleTitle) {
        this.$message.info("请您输入文章标题和文章内容呦~")
        return
      }
      this.showDialog = true
    },
    //
    handleClose() {

    },
    handleDel() {
      this.$confirm("您确定要清空 文章内容 吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.articleTitle = ""
        this.articleContent = ""
        window.localStorage.removeItem("LOCAL_ARTICLE")
      }).catch(() => {
        this.$message({
          type: "info",
          message: "保存内容了呦~"
        })
      })

    },
    cropperImg() { },
    // ctrl+s 保存输入的内容到本地
    saveEditor(value, render) {
      this.content = render
      // this.isPublish = !this.isPublish
      window.localStorage.setItem(
        "LOCAL_ARTICLE",
        JSON.stringify({
          articleContent: render,
          articleTitle: this.articleTitle
        })
      )
      this.$message.info("已为您暂存文章信息哦~")
    },
    //判断之前有没有缓存有的话给取出来
    backFill() {
      const res = JSON.parse(window.localStorage.getItem("LOCAL_ARTICLE"))
      if (res.articleContent && res.articleTitle) {
        this.articleContent = res.res.articleContent
        this.articleTitle = res.res.articleTitle
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    // if (!this.isPublish) {
    //   next()
    // } else {
    //   this.saveEditor()
    //   next()
    // }
    !this.isPublish && this.saveEditor()
    next()
  }
}
</script>

<style lang="scss" scoped>
.el-button--primary {
  background-color: $main_color;
  border-color: $main_color;
  &:hover {
    background-color: $gradient_blue_color_2;
    border-color: $fourth_border_color;
  }
}
.el-button--default {
  &:hover {
    color: $main_color;
    border-color: $main_color;
  }
}
::v-deep.page-article-edit {
  // padding: 20px 20px 0 20px;
  animation: aniBottomTop 300ms;
  padding-bottom: 0;
  .article-title {
    width: 100%;
    // padding: 17px 15px;
    background-color: rgb(255, 255, 255);
    .input {
      width: 75%;
      display: inline-block;
      height: 100%;
    }
    .publish {
      display: inline-block;
      height: 100%;
      width: 96%;
      text-align: right;
      padding-right: 15px;
      margin-bottom: 10px;
    }
    .el-input__inner {
      border: none;
      font-size: 20px;
      font-weight: 600;
    }
  }

  .v-note-wrapper.shadow {
    box-shadow: none !important;
    border-top: 1px solid $third_border_color;
    height: 89vh;
  }
  .v-note-wrapper.fullscreen {
    height: 100vh !important;
  }
}
.markdown-body {
  margin-top: 10px;
}
.avatar-box {
  width: 140px;
  height: 80px;
  line-height: 80px;
  display: block;
  border: 1px dashed $border_light;
  text-align: center;
}
</style>
