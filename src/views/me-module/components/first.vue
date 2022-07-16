<!--
 * @Description: first
 * @Date: 2022-07-10 12:33:24
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-14 15:49:46
-->
<template>
  <div class='box'>
    <div class="title animate__animated animate__headShake slower">
      <div>Resume</div>
    </div>
    <div class="main">
      <div>付 磊</div>
      <div>前端开发工程师</div>
      <div>fulei</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang='scss' scoped>
.box {
  .title {
    position: absolute;
    top: 3rem;
    left: 3rem;
    font-size: 5rem;
    color: white;
  }
  .main {
    position: absolute;
    top: 10rem;
    right: 30rem;
    color: white;
    font-size: 3rem;
  }
}
</style>
