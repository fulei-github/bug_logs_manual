<!--
 * @Description: 无数据展示
 * @Date: 2022-06-11 21:37:02
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-06-11 21:38:17
-->
<template>
  <el-empty description="暂无发布记录，请您前往后台管理系统发表文章哦！">
    <el-button type="primary" size="small" @click="goAdminAddress">点击前往</el-button>
  </el-empty>
</template>

<script>
export default {
  name: "f-empty",
  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {
    goAdminAddress() {
      this.$message({
        type: "warning",
        message: "待开发..."
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
::v-deep .el-button--primary {
  background-color: $main_color;
  border-color: $main_color;
}
</style>