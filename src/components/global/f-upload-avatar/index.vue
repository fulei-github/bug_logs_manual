<!--
 * @Description: 上传组件
 * @Date: 2022-07-05 15:13:59
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-07 21:25:09
-->
<template>
  <div class="">
    <el-upload class="avatar-uploader" accept=".jpg, .png, .jpeg" action="#" :http-request="httpRequest" :before-upload="beforeUpload" :show-file-list="false">
      <el-image v-if="imageUrl.length" fit="fill" :limit="1" :src="imageUrl[0]" class="avatar" />
      <span v-else class="upload">点击上传</span>
    </el-upload>

    <el-dialog title="头像裁剪" :visible.sync="open" width="800px" append-to-body @opened="modalOpened" @close="open=false">
      <el-row>
        <el-col :xs="24" :md="12" :style="{height: '350px'}">
          <vue-cropper ref="cropper" :img="options.img" :info="true" :autoCrop="options.autoCrop" :autoCropWidth="cropWidth" :autoCropHeight="cropHeight" :fixedBox="options.fixedBox" @realTime="realTime" v-if="visible" />
        </el-col>
        <el-col :xs="24" :md="12" :style="{height: '350px'}">
          <div class="avatar-upload-preview" :style="{width: cropWidth+'px', height: cropHeight+'px'}">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :lg="2" :md="2">
          <el-upload action="#" accept=".jpg, .png, .jpeg" :http-request="httpRequest" :show-file-list="false" :before-upload="beforeUpload">
            <el-button size="small">
              选择
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
        </el-col>
        <el-col :lg="{span: 1, offset: 2}" :md="2">
          <el-button icon="el-icon-plus" size="small" @click="changeScale(1)"></el-button>
        </el-col>
        <el-col :lg="{span: 1, offset: 1}" :md="2">
          <el-button icon="el-icon-minus" size="small" @click="changeScale(-1)"></el-button>
        </el-col>
        <el-col :lg="{span: 1, offset: 1}" :md="2">
          <el-button icon="el-icon-refresh-left" size="small" @click="rotateLeft()"></el-button>
        </el-col>
        <el-col :lg="{span: 1, offset: 1}" :md="2">
          <el-button icon="el-icon-refresh-right" size="small" @click="rotateRight()"></el-button>
        </el-col>
        <el-col :lg="{span: 2, offset: 10}" :md="2">
          <el-button type="primary" size="small" @click="uploadImg()">提 交</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper"

export default {
  name: "f-upload-cropper",
  components: {
    VueCropper
  },
  props: {
    image: {
      type: String,
      default: ""
    },
    // 默认生成截图框宽度
    cropWidth: {
      type: Number,
      default: 200
    },
    cropHeight: {
      type: Number,
      default: 200
    }
  },
  filters: {},
  computed: {
    imageUrl() {
      return this.image ? [this.image] : []
    }
  },
  watch: {
    // image: {
    //   immediate: true,
    //   handler(val) {
    //     console.log("🤪 ~ handler ~ val", val)
    //     this.imageUrl = val ? [val] : []
    //   }
    // }
  },
  data() {
    return {
      previews: {},
      options: {
        img: "", //裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        fixedBox: true // 固定截图框大小 不允许改变
      },
      open: false,
      visible: false // 是否显示cropper
    }
  },
  created() { },
  mounted() { },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!")
      }
      return isLt1M
    },
    httpRequest(data) {
      const that = this
      const rd = new FileReader() // 创建文件读取对象
      const file = data.file
      rd.readAsDataURL(file) // 文件读取装换为base64类型
      rd.onloadend = function(e) {
        that.open = true
        that.options.img = this.result
      }
    },
    // 打开弹出层结束时的回调
    modalOpened() {
      this.visible = true
    },
    // 实时预览
    realTime(data) {
      this.previews = data
    },
    // 向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    // 向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    // 图片缩放
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 上传图片
    uploadImg() {
      this.$refs.cropper.getCropData((data) => {
        this.$emit("cropperImg", data)
        this.open = false
      })
    }
  },

  destroyed() { }
}
</script>

<style scoped lang="scss">
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}
.avatar {
  position: relative;
  &:hover {
    &::after {
      content: "编辑";
      width: 100%;
      text-align: center;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      transition: all ease 300ms;
      color: #fff;
    }
  }
}
::v-deep .el-button--primary {
  background-color: $main_color;
  border-color: $main_color;
  &:hover {
    background-color: $gradient_blue_color_2;
    border-color: $fourth_border_color;
  }
}
</style>