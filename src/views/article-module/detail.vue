<!--
 * @Description: 文章详情
 * @Date: 2022-07-07 21:44:36
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-08 11:31:12
-->
<template>
  <div class='container-box'>
    <div class="title">
      <el-button class="button-back" type="primary" @click="$router.go(-1)">返回</el-button>
      <span class="text">前端常用60种工具方法</span>
      <div class="viewer">
        <img class="avatar" :src="require('@/assets/imgs/bg4.jpg')" alt="">
        <span class="mr16">admin用户</span>
        <span class="mr16">
          <svg-icon icon-class="eye-open" />
          21
        </span>
        <span class="mr16">
          <svg-icon icon-class="thumbs" /> 23
        </span>
        <span>
          <svg-icon icon-class="time" />
          {{ dayFormat(Date.now(), 'YYYY年MM月DD日 HH:mm') }}
        </span>
      </div>
    </div>
    <div class="content">
      <mavon-editor class="bga-back-top" :toolbarsFlag="false" :editable="false" :subfield="false" defaultOpen="preview" v-model="content" />
      <!-- 点赞 -->
      <div :class="isLike?'button-like  button-haslike':'button-like'" @click="handleLike">
        <svg-icon :icon-class="isLike?'thumbs-fill':'thumbs'" />
        <div>{{isLike? '已鼓励' : '鼓励一下'}}</div>
      </div>
    </div>
    <f-scroll-top scrollClass="v-note-show" />

  </div>
</template>

<script>
import Vue from "vue"
import mavonEditor from "mavon-editor"
import "mavon-editor/dist/css/index.css"
Vue.use(mavonEditor)
export default {
  data() {
    return {
      content: "",
      isLike: false
    }
  },
  created() {
    this.content = JSON.parse(window.localStorage.getItem("LOCAL_ARTICLE")).articleContent
  },
  methods: {
    handleLike() {
      this.isLike = !this.isLike
    }
  }
}
</script>
<style lang='scss' scoped>
@keyframes likeAnimate {
  0% {
    transform: rotate(15deg);
  }
  50% {
    transform: rotate(-15deg);
  }
  70% {
    transform: rotate(5deg);
  }
  90% {
    transform: rotate(-5deg);
  }
}

.container-box {
  height: 100%;
  width: 100%;
  padding: 0 !important;
  .title {
    width: 100%;
    height: 80px;
    background: $main_bg_color;
    padding: 12px 24px 12px 0;
    box-shadow: 10px 0 10px #ddd;
    padding-left: 26px;
    z-index: 1500;
    animation: aniTopBottom 600ms ease-in-out;
    .text {
      font-weight: 600;
      font-size: 20px;
      margin-left: 20px;
    }
    .viewer {
      font-size: 13px;
      margin-top: 8px;
      color: $third_text_color;
      span {
        vertical-align: top;
      }
      .avatar {
        width: 22px;
        height: 22px;
        display: inline-block;
        border-radius: 50%;
        margin-right: 4px;
      }
    }
  }
  .content {
    margin-top: 20px;
    overflow-y: scroll !important;
    height: 82vh;
    border-radius: 30px;
    animation: aniBottomTop 600ms ease-in-out;
    &::-webkit-scrollbar {
      width: 0;
      height: 0 !important;
    }
    &::-webkit-scrollbar-thumb {
      background: $second_border_color;
    }
    &::-webkit-scrollbar-track {
      border: none 0;
    }

    .button-like {
      width: 80px;
      height: 56px;
      background: #dedede;
      position: absolute;
      left: 50%;
      bottom: 0px;
      transform: translate(-50%, 0);
      z-index: 1500;
      padding: 4px 8px;
      border-radius: 56px;
      font-size: 12px;
      color: #999;
      font-weight: bold;
      text-align: center;
      cursor: pointer;
    }
    .button-haslike {
      width: 80px;
      height: 56px;
      background: #dedede;
      position: absolute;
      left: 50%;
      bottom: 0px;
      transform: translate(-50%, 0);
      z-index: 1500;
      padding: 4px 8px;
      border-radius: 56px;
      font-weight: bold;
      text-align: center;
      cursor: pointer;
      font-size: 16px;
      animation: likeAnimate 600ms ease-in-out;
      color: $danger_color;
    }
  }
}
.markdown-body {
  border-radius: 10px;
  min-height: 850px;
}
.el-button--primary {
  background-color: $main_color;
  border-color: $main_color;
  &:hover {
    background-color: $gradient_blue_color_2;
    border-color: $fourth_border_color;
  }
}
</style>
