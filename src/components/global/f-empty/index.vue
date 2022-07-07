<!--
 * @Description: 无数据展示
 * @Date: 2022-06-11 21:37:02
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-07 14:37:29
-->
<template>
  <div class="container-box" :style="{marginTop: marginTop+'px'}">
    <img src="@/assets/imgs/defend.png" alt="">
    <div class="text">暂无内容</div>
  </div>
</template>

<script>
export default {
  name: "f-empty",
  props: {
    marginTop: {
      type: Number,
      default: 40
    }
  }
}
</script>

<style scoped lang="scss">
.container-box {
  width: 100%;
  margin: auto;
  img {
    display: block;
    width: 180px;
    height: 124px;
    margin: auto;
  }
  .text {
    width: 100%;
    text-align: center;
    font-size: 14px;
    margin-top: 20px;
    color: $third_text_color;
  }
}
</style>