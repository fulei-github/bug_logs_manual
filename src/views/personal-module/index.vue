<!--
 * @Description: 
 * @Date: 2022-07-09 09:38:54
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-09 09:47:11
-->
<template>
  <div class='container-box'>
    <div class="content">

      <div class="info-form">
        <f-title content="个人资料" border>
          <template #right-area>
            <el-button type="primary" class="login-out" @click="loginOut">退出登录</el-button>
          </template>
        </f-title>

        <div class="form-wrap">
          <el-form label-position="right" label-width="80px" :model="userInfo" ref="formSearch" :rules="rules" size="small">
            <el-form-item label="头 像：">
              <f-upload-cropper :image="userInfo.avatarUrl" @cropperImg="cropperImg" />
            </el-form-item>
            <el-form-item label="名 称：" prop="name">
              <el-input v-model="userInfo.netName" clearable placeholder="请输入用户名" maxlength="16"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="phoneNumber">
              <el-input v-model="userInfo.phoneNumber" clearable maxlength="11" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <!-- <el-form-item label="密码：">
              <el-input v-model="userInfo.password" placeholder="请输入重制密码" v-show="!isReset" />
              <span class="reset" @click="isReset = !isReset">{{isReset?'重置':'取消重置密码'}}</span>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      rules: {}
    }
  },
  created() {
  },
  methods: {
    cropperImg() { },
    onSubmit() { }
  }
}
</script>
<style lang='scss' scoped>
.el-button--primary {
  background-color: $main_color;
  border-color: $main_color;
  &:hover {
    background-color: $gradient_blue_color_2;
    border-color: $fourth_border_color;
  }
}
.container-box {
  background-color: white;
  border-radius: 10px;
  height: 100vh;
  .info-form {
    width: 100%;
    height: calc(100% - 60px);
    background-color: white;
    border-radius: 24px;
    position: relative;
    animation: aniBottomTop 300ms;
  }
  .form-wrap {
    color: $third_text_color;
    width: 30%;
    margin-top: 50px;
    .el-form-item__label {
      color: $third_text_color;
    }
    .avatar-uploader .el-upload {
      width: 96px;
      height: 96px;
      line-height: 96px;
      border: 1px solid $border_color;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .reset {
      cursor: pointer;
      color: $main_color;
    }
  }
}
</style>
