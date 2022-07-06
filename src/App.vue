<!--
 * @Description: 
 * @Date: 2022-07-05 15:13:59
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-05 18:03:26
-->
<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  methods: {

  }
}
</script>
<style lang="scss">
#app {
  height: 100%;
  //非卡片区块容器
  .container-box {
    padding: 16px;
  }
  //卡片区块页面容器
  .page-container {
    // margin: 16px;
    background: #fff;
    padding: 16px 10px;
    border-radius: 2px;
  }
  .panel-box {
    background: #fff;
    margin-bottom: 12px;
    padding: 16px 10px;
  }
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
