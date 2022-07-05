<!--
 * @Description: 回到顶部
 * @Date: 2022-06-12 15:37:57
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-06-12 16:57:23
-->
<template>
  <el-backtop target=".layout-box" :bottom="100" :visibility-height="400">
    <div class="div">
      UP
    </div>
  </el-backtop>
</template>

<script>
export default {
  name: "f-gotop",
  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.div {
  height: 100%;
  width: 100%;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  text-align: center;
  line-height: 40px;
  color: $main_color;
}
</style>