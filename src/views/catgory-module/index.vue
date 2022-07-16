<!--
 * @Description: 权限管理
 * @Date: 2022-06-19 17:32:28
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-16 15:33:20
-->
<template>
  <div class="permission-module">
    <el-tabs v-model="active">
      <el-tab-pane label="分类管理" name="user">
        <catgory-mange />
      </el-tab-pane>
      <el-tab-pane label="文章管理" name="role">
        <article-mange />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import catgoryMange from "./components/catgory-mange/index.vue"
import articleMange from "./components/article-mange/index.vue"
export default {
  components: {
    catgoryMange,
    articleMange
  },
  data() {
    return {
      active: "user" //当前选中
    }
  },

  mounted() {

  },

  methods: {
    handlerClick(i) { //tab切换
      this.active = i
      ""
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__item {
  font-size: 18px;
}
.permission-module {
}
</style>