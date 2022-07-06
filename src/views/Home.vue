<!--
 * @Description: home
 * @Date: 2022-07-05 15:13:59
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-05 22:49:58
-->
<template>
  <div class="home-box">
    <div class="left_box">
      <div class="content">left_box</div>
    </div>
    <div class="right_box">right_box</div>
  </div>
</template>

<script>

export default {
  name: "Home"

}
</script>
<style lang="scss" scoped>
.home-box {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .left_box {
    width: calc(100% - 340px);
    height: 100%;
    margin-right: $space_12;
    background-color: white;
    border-radius: 24px;
    .content {
      animation: aniBottomTop 600ms ease-in-out;
    }
  }
  .right_box {
    width: 340px;
    height: 100%;
    background-color: white;
    border-radius: 24px;
    animation: anitRightLeft 600ms ease-in-out;
  }
}
</style>
