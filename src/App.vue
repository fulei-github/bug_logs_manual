<!--
 * @Description: 
 * @Date: 2022-07-05 15:13:59
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-05 16:32:25
-->
<template>
  <div id="app">
    <el-button @click="click">默认按钮</el-button>
    <SvgIcon icon-class="date" style="position:relative; top:4px;" />
    <li>22</li>
    <li>22</li>
    <li>22</li>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
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
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
