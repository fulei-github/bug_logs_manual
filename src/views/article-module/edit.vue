
<!--
 * @Description: 编辑
 * @Version: 0.1
 * @Autor: fulei
 * @Date: 2022-07-03 13:12:24
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-07 22:33:13
-->
<template>
  <div class="page-article-edit">
    <div class="article-title">
      <span class="input">
        <el-input v-model="articleTitle" clearable placeholder="请输入文章标题..."></el-input>
      </span>
      <span class="publish">
        <el-button type="primary" @click="click">文章发布</el-button>
      </span>
    </div>
    <mavon-editor ref="md" v-model="articleContent" @save="saveEditor" :ishljs="true" :tabSize="2" :toolbars="toolbars" :placeholder="placeholder">
      <!-- 左工具栏前加入自定义按钮 -->
      <template slot="left-toolbar-after">
        <button type="button" class="op-icon fa fa-clear-local" aria-hidden="true" title="清本地缓存">清</button>
      </template>
    </mavon-editor>
    <!-- dialog -->
    <el-dialog title="提示" :visible.sync="showDialog" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="文章类型：" prop="articleType">
          <el-select v-model="form.articleType" placeholder="请选择文章类型" clearable>
            <el-option label="1" value="1">
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
        <el-button type="primary" @click="showDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue"
import mavonEditor from "mavon-editor"
import "mavon-editor/dist/css/index.css"
Vue.use(mavonEditor)
export default {
  name: "article-edit",

  data() {
    return {
      showDialog: false,
      form: {},
      rules: {
        articleType: [{ required: true, message: "请选择文章分类", trigger: "change" }]
      },
      tabsList: [], // 分类
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
  created() {

  },
  mounted() {

  },
  methods: {
    click() {
      // this.saveEditor()
      this.showDialog = true
    },
    handleClose() {

    },
    cropperImg() { },
    saveEditor(value, render) {
      console.log("md内容", render)
      window.localStorage.setItem(
        "LOCAL_ARTICLE",
        JSON.stringify({
          articleContent: render,
          articleTitle: this.articleTitle
        })
      )
    }
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
