<!--
 * @Description: layout
 * @Date: 2022-07-05 17:53:43
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-07 20:57:09
-->
<template>
  <div class='container'>
    <div class="menu-box">
      <f-menu />
    </div>
    <div class="layout-box">
      <!-- <transition name="fade">  -->
      <keep-alive>
        <router-view />
      </keep-alive>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import fMenu from "./components/menu.vue"
export default {
  components: {
    fMenu
  },
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
    click() {
      this.$message({
        message: "恭喜你，这是一条成功消息",
        type: "success"
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.container {
  height: 100vh;
  width: 100%;
  background-color: $main_bg_color;
  display: flex;

  .menu-box {
    height: 100vh;
    width: 60px;
    background-color: $main_color;
    animation: aniLeftRight 600ms ease-in-out;
  }

  .layout-box {
    padding: $page_padding;
    animation: wobble-horizontal 600ms ease-in-out;
    width: 100%;
    height: 100vh;
  }
}
</style>
