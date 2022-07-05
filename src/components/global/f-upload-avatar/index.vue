<!--
 * @Description: 图片上传组件
 * @Version: 0.1
 * @Autor: fulei
-->

<template>
  <div class="avatar-container">
    <el-upload class="avatar-box" v-on="$listeners" v-bind="$attrs" action="#" :on-remove="handleRemove" :file-list="fileList" :accept="accept" :show-file-list="false" :auto-upload="false" :on-change="handleChange" v-if="!fileList.length">
      <i slot="default" class="el-icon-plus"></i>
    </el-upload>
    <ul class="file-list">
      <li v-for="(item,index) in fileList" :key="index" :class="index === deleteIndex?'delete-animation':''">
        <el-image class="file-picture" :src="`data:image/jpeg;base64,${item.base64}`" fit="cover"></el-image>
        <div class="file-info">
          <el-popover placement="top-start" width="200" trigger="hover" :content="item.fileName">
            <p slot="reference">{{item.fileName}}</p>
          </el-popover>
          <el-button class="mt12" size="mini" type="primary" @click="handlePreview(item.url)">预览</el-button>
        </div>
        <i class="el-icon-close" @click="handleDelete(index)" v-if="!previewOnly"></i>
      </li>
    </ul>
    <f-image-viewer v-if="previewImg" :on-close="()=>{previewImg = false}" :url-list="imgList" />
  </div>
</template>
<script>

export default {
  name: "f-upload-avatar",
  props: {
    // 回填数据
    files: {
      type: Array,
      default() {
        return []
      }
    },
    // 上传按钮文字
    btnText: {
      type: String,
      default() {
        return ""
      }
    },
    // 文件类型
    attchType: {
      type: String,
      default() {
        return "03"
      }
    },
    // 是否只预览，详情页时隐藏上传组件
    previewOnly: {
      type: Boolean,
      default() {
        return false
      }
    },
    // 上传类型
    accept: {
      type: String,
      default: () => {
        return ".jpg"
      }
    },
    // 大小限制
    size: {
      type: Number,
      default: () => {
        return 500 // 单位kb
      }
    }
  },
  watch: {
    files: {
      handler(list) {
        const arr = []
        if (list?.length > 0) {
          for (let i = 0; i < list.length; i++) {
            arr.push({ base64: list[i] })
          }
          this.fileList = arr
        }
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      previewImg: false, // 是否图片预览
      deleteIndex: null,
      fileList: []
    }
  },
  computed: {
    imgList() {
      return this.fileList.map(item => { return `data:image/jpeg;base64,${item?.base64}` || item })
    }
  },
  methods: {
    handleChange(file, fileList) {
      console.log("file", file)
      console.log("fileList", fileList)

      // const fileNmae = file.name.substring(0, file.name.lastIndexOf("."))
      if (file.name.length > 32) {
        this.fileList = []
        this.$message.error("文件名长度需小于32个字符!")
        return
      }

      const fileExt = file.name.replace(/.+\./, "")
      console.log("fileExt", fileExt)
      const acceptArr = this.accept.replace(/\./g, "").split(",")
      console.log("acceptArr", acceptArr)

      if (acceptArr.indexOf(fileExt.toLowerCase()) === -1) {
        this.$message.error("文件格式有误，请重新上传!")
        this.fileList = []
        this.$forceUpdate()
        return
      }

      const isLessThanSzie = file.size / 1024 < this.size
      if (!isLessThanSzie) {
        this.$message.error(`上传文件大小不能超过${this.size}kb!`)
        this.fileList = []
        this.$forceUpdate()
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        const _base64 = reader.result.split("base64,")[1]
        console.log("_base64", _base64)
        const obj = {
          fileName: file.name,
          fileType: fileExt || "jpg", // 文件后缀
          attchType: this.attchType, // 01	身份证 02	营业执照 03	其他上传材料
          base64: _base64
          // url: URL.createObjectURL(file.raw)
        }
        console.log("obj", obj)
        this.fileList.push(obj)
        this.$emit("changeAttchList", this.fileList)
      }
      reader.readAsDataURL(file.raw)
    },
    // 删除
    handleDelete(index) {
      this.deleteIndex = index
      setTimeout(() => {
        console.log("")
        this.fileList.splice(index, 1)
        this.deleteIndex = null
        this.$emit("changeAttchList", this.fileList)
      }, 500)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 预览
    handlePreview() {
      console.log("this.fileList", this.fileList)
      this.previewImg = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";

.avatar-container {
  height: 100%;
  padding: 16px 0;
  .avatar-box {
    width: 100%;
    height: 100%;
    border: 1px dashed $border_color;
    border-radius: 4px;
    cursor: pointer;
    ::v-deep .el-upload {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
    }
  }
}
.file-list {
  li {
    display: flex;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 14px;
    color: #606266;
    line-height: 1.8;
    padding: 10px 10px 10px 90px;
    height: 192px;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    opacity: 1;
    overflow: hidden;
    // .file-picture {
    //   display: block;
    //   min-width: 70px;
    //   flex: 1;
    //   height: 70px;
    //   flex-shrink: 0;
    //   position: relative;
    //   z-index: 1;
    //   margin-left: -80px;
    //   background-color: #fff;
    // }
    .file-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      min-height: 70px;
      overflow: hidden;
      margin-left: 16px;
      p {
        font-size: 14px;
        display: -webkit-box;
        -webkit-box-orient: vertical; /* 表示盒子对象的子元素的排列方式 */
        -webkit-line-clamp: 2; /* 限制文本的行数，表示文本第多少行省略 */
        text-overflow: ellipsis; /*  打点展示 */
        overflow: hidden; /*超出部分进行隐藏*/
      }
      .el-button {
        width: 64px;
      }
    }
    .el-icon-close {
      position: absolute;
      display: block;
      top: 0;
      right: 0;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      cursor: pointer;
      opacity: 0.75;
      color: #606266;
      font-size: 16px;
      z-index: 999;
      &:hover {
        color: $main_color;
      }
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
