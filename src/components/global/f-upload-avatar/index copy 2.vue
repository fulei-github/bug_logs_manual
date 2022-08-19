<template>
  <el-upload class="avatar-uploader" action="#" :show-file-list="false" :before-upload="beforeAvatarUpload" :http-request="upload">
    <img v-if="staffPhoto" :src="staffPhoto" class="avatar" alt="" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    <el-progress v-show="showProgress" type="circle" :percentage="percent" class="progress" />
  </el-upload>
</template>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: $main_color;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.progress {
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}
</style>

<script>
// 导入cos的SDK调用
import COS from "cos-js-sdk-v5"
const cos = new COS({
  SecretId: "AKIDiEVVEgrlOjna5JGwLTKtBDySgcHelbAR", // 身份识别ID
  SecretKey: "1lDOIrACwQdZEcjZ8PQ9blfIeiX5LK1S" // 身份秘钥
})
export default {
  name: "UpLoadImg",
  props: {
    staffPhoto: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      imageUrl: "",
      percent: 0,
      showProgress: false
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg"
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!")
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!")
      }
      return isJPG && isLt2M
    },
    upload(params) {
      if (params.file) {
        // 显示
        this.showProgress = true
        // 执行上传操作
        cos.putObject({
          Bucket: "fulei-1308304229", /* 存储桶 */
          Region: "ap-beijing", /* 存储桶所在地域，必须字段 */
          Key: params.file.name, /* 文件名 */
          StorageClass: "STANDARD", // 上传模式, 标准模式
          Body: params.file, // 上传文件对象
          onProgress: (progressData) => {
            // console.log(progressData)
            this.percent = progressData.percent * 100
          }
        }, (err, data) => {
          // console.log(err || data)
          if (!err) {
            setTimeout(() => {
              this.showProgress = false
              this.percent = 0
              this.$emit("update:staffPhoto", `https://${data.Location}`)
              // this.imageUrl = `https://${data.Location}`
            }, 800)
          }
        })
      }
    }
  }
}
</script>
