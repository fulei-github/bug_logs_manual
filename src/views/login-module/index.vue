<!--
 * @Description: 登录页面
 * @Date: 2022-06-13 10:52:07
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-08 23:30:33
-->
<template>
  <div class="login-box" ref="vantaRef">
    <h3>bug记录手册</h3>
    <div class="login-form">
      <div class="left">
        <img src="@/assets/imgs/login-left3.png" alt="">
      </div>
      <div class="right">
        <h4>欢迎{{isLogin ? "登录" : "注册"}}</h4>
        <el-form ref="form" :model="form" :rules="rules" class="login-form-box">
          <!-- 登录模块 -->
          <div v-if="isLogin">
            <el-form-item prop="username">
              <el-input v-model.trim="form.username" placeholder="请输入账号">
                <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model.trim="form.password" placeholder="请输入密码" show-password @keyup.enter.native="handleSubmit('0')">
                <i slot="prefix" class="el-input__icon el-icon-s-goods"></i>
              </el-input>
            </el-form-item>
          </div>
          <!-- 注册模块 -->
          <div v-if="!isLogin">
            <el-form-item prop="username1">
              <el-input v-model.trim="form.username1" placeholder="请输入账号">
                <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password1">
              <el-input v-model.trim="form.password1" placeholder="请输入密码" show-password>
                <i slot="prefix" class="el-input__icon el-icon-s-goods"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password2">
              <el-input v-model.trim="form.password2" placeholder="请再次输入密码" @keyup.enter.native="handleSubmit('1')" show-password>
                <i slot="prefix" class="el-input__icon el-icon-s-goods"></i>
              </el-input>
            </el-form-item>
          </div>
        </el-form>
        <el-button v-if="isLogin" type="primary" @click.native.prevent="handleSubmit('0')">登录</el-button>
        <el-button v-else v-loading="loading" type="primary" @click="handleSubmit('1')">注册</el-button>
        <div class="text-align-c" style="width:100%">
          <el-link v-if="isLogin" type="info" @click="handleClick">没有账号？点此去注册</el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { createUserApi } from "@/api/user/index"
// import { mapActions } from "vuex"
export default {
  data() {
    const validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.form.password1) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: "", //登录账号
        password: "", //登录密码
        username1: "", //注册账号
        password1: "", //注册密码
        password2: "" //注册确认密码
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }], //登录账号
        password: [{ required: true, message: "请输入密码", trigger: "blur" }], //登录密码
        username1: [{ required: true, validator: this.validateUserNameFn, trigger: "blur" }], //注册账号
        password1: [{ required: true, validator: this.validatePassWordFn, trigger: "blur" }], //注册密码
        password2: [{ required: true, validator: validatePassword2, trigger: "blur" }] //注册确认密码
      },
      title: "欢迎登录", //标题
      isLogin: true, //是否登录？
      loading: false, //注册和登录时给按钮loading 防止重复请求
      redirect: undefined //记录重定向地址
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        // 存储上次访问页面的访问地址 路由参数的监控
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // ...mapActions("user", ["getTokenAction"]),
    //点击注册或者登录按钮
    async handleSubmit(key) {
      this.loading = true
      await this.$refs.form.validate()
      try {
        switch (key) {
          case "0":
            this.handleLogin()
            break
          case "1":
            this.handleReg()
            break
        }
        this.loading = false
      } catch (error) {
        console.dir("捕获登录或者注册的异常", error)
      }
    },
    //登录的api
    async handleLogin() {
      this.$message.info("待开发...")
      // const params = {
      //   username: this.form.username,
      //   password: this.form.password
      // }
      // await this.getTokenAction(params)
      // this.$router.replace(this.redirect || "/")
    },
    //注册的api
    handleReg() {
      this.isLogin = !this.isLogin
      // const params = {
      //   username: this.form.username1,
      //   password: this.form.password1
      // }
      // createUserApi(params)
      //   .then(res => {
      //     if (res.code === 200) {
      //       this.isLogin = !this.isLogin
      //     }
      //   })
    },
    // 切换登录注册
    handleClick() {
      this.form = {}
      this.isLogin = !this.isLogin
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button {
  width: 100%;
  height: 50px;
  margin-bottom: 30px;
  font-size: 20px;
}
.login-box {
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/imgs/login-bg2.png");
  background-repeat: no-repeat;
  background-size: cover;
  h3 {
    margin-top: 20px;
    animation: aniTopBottom 600ms ease-in-out;
  }
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    margin-left: -500px;
    margin-top: -240px;
    width: 1200px;
    height: 480px;

    border-radius: 10px;
    .right {
      background-color: #fff;
      width: 600px;
      padding: 55px 120px 55px 70px;
      border-top-right-radius: 14px;
      border-bottom-right-radius: 14px;
      animation: anitRightLeft 600ms ease-in-out;
      .el-input__icon {
        font-size: 20px;
      }
      .el-button--primary {
        background-color: #1b65b9;
        margin-top: 10px;
      }
      .el-button--primary:focus,
      .el-button--primary:hover {
        background: #4984c7;
        border-color: #4984c7;
        color: #fff;
      }
      .login-form-box {
        margin-top: 38px;
      }

      ::v-deep .el-input__inner {
        width: 100%;
        height: 50px;
        font-size: 18px;
        padding-left: 50px;
        // border: none;
      }
      h4 {
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #3d3b3b;
        line-height: 37px;
      }
    }
    .left {
      background-color: #fff;
      border-radius: 14px;
      width: 600px;
      height: 100%;
      animation: aniLeftRight 600ms ease-in-out;
      img {
        width: 600px;
        height: 100%;
      }
    }
  }
  h3 {
    position: absolute;
    left: 190px;
    font-size: 36px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: white;
    line-height: 40px;
  }
}
</style>