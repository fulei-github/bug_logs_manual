<!--
 * @Description: 
 * @Date: 2022-05-02 12:23:26
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-05-13 19:55:11
-->

<template>
  <div>
    <el-upload v-on="$listeners" v-bind="$attrs" action="#" :file-list="fileList" :accept="accept" :show-file-list="false" :auto-upload="false" :on-change="handleChange" :limit="limit" :on-exceed="exceed">
      <el-button size="small" type="primary"><i class="el-icon-upload el-icon--right"></i>{{btnText}}</el-button>
      <div slot="tip" class="el-upload__tip" v-if="needTip">只能上传{{accept}}文件</div>
    </el-upload>
    <ul class="list">
      <li v-for="(item,index) in fileList" :key="index" :class="index === deleteIndex?'delete-animation':''">
        <div class="file-info">
          <p>{{item.fileName}}</p>
        </div>
        <i class="el-icon-close" @click="handleDelete(index)"></i>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: "f-upload",
  props: {
    // 上传按钮文字
    btnText: {
      type: String,
      default() {
        return "文件上传"
      }
    },
    // 上传文件类型（格式）
    accept: {
      type: String,
      default: () => {
        return ""
      }
    },
    // 大小文件限制  单位kb
    size: {
      type: Number,
      default: () => {
        return 500
      }
    },
    //最多可上传
    limit: {
      type: Number,
      default: () => {
        return 100
      }
    },
    //是否展示提示文字
    needTip: {
      type: Boolean,
      default() {
        return true
      }
    },
    //是否需要往文件流塞进去一个base64
    needBase64: {
      type: Boolean,
      default() {
        return false
      }
    }
  },

  data() {
    return {
      deleteIndex: null, //删除问价索引
      fileList: [] //文件列表
    }
  },
  computed: {
    //监听文件列表 
    //---上次我做的需要塞进去一个base64  --父组件传一个值(needBase64) 你需要就给true 不需要就不传
    imgList() {
      return this.fileList.map(item => { return `data:image/jpeg;base64,${item?.base64}` || item })
    }
  },
  methods: {
    //change事件控制 大小 格式 名字长度
    handleChange(file) {
      // //控制上传的文件名字长度-----begin
      //这里不做全局配置了--你需要该多少就改吧
      if (file.name.length > 32) {
        this.fileList = []
        this.$message.error("文件名长度需小于32个字符!")
        return
      }
      //控制上传的文件名字长度-----end

      //控制上传的文件格式------begin
      const fileExt = file.name.replace(/.+\./, "")
      const acceptArr = this.accept.replace(/\./g, "").split(",")
      if (acceptArr.indexOf(fileExt.toLowerCase()) === -1) {
        this.$message.error("文件格式有误，请重新上传!")
        this.fileList = []
        return
      }
      //控制上传的文件格式------end

      //控制上传的文件大小------begin
      const isLessThanSzie = file.size / 1024 < this.size
      if (!isLessThanSzie) {
        this.$message.error(`上传文件大小不能超过${this.size}kb!`)
        this.fileList = []
        return
      }
      //控制上传的文件大小------end

      this.getFileList(file, fileExt) //获取文件列表
    },
    //像父组件抛出上传文件列表
    getFileList(file, fileExt) {
      const reader = new FileReader()

      if (!this.needBase64) {
        //不需要塞进去base64
        const obj = {
          fileName: file.name,
          fileType: fileExt || "jpg" // 文件后缀
        }
        this.fileList.push(obj)
        this.$emit("getFileList", this.fileList)
      } else {
        //需要塞进去base64
        reader.onload = () => {
          const _base64 = reader.result.split("base64,")[1]
          const obj = {
            fileName: file.name,
            fileType: fileExt || "jpg", // 文件后缀
            base64: _base64
          }
          this.fileList.push(obj)
          this.$emit("getFileList", this.fileList)
        }
        reader.readAsDataURL(file.raw)
      }
    },
    // 删除某项文件
    handleDelete(index) {
      this.deleteIndex = index
      setTimeout(() => {
        console.log("")
        this.fileList.splice(index, 1)
        this.deleteIndex = null
        this.$emit("changeAttchList", this.fileList)
      }, 500)
    },
    //超出最大上传个数
    exceed() {
      this.$message.error(`最大只可上传${this.limit}个文件！`)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
.list {
  li {
    position: relative;
    font-size: 14px;
    color: #606266;
    line-height: 1.8;
    margin-top: 10px;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    opacity: 1;
    &:hover {
      color: $main_color;
    }
    .el-icon-close {
      position: absolute;
      top: 1px;
      right: 5px;
      cursor: pointer;
      opacity: 0.75;
      color: #606266;
      font-size: 16px;
    }
    &:hover {
      color: $main_color;
      border-color: $main_color;
      .el-icon-close {
        color: $main_color;
      }
    }
    &.delete-animation {
      opacity: 0;
    }
  }
}
</style>
