<!--
 * @Description: 权限管理
 * @Date: 2022-06-19 17:32:28
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei🐰
 * @LastEditTime: 2022-10-29 18:54:02
-->
<template>
  <div class="permission-module">
    <el-tabs v-model="active">
      <el-tab-pane label="用户管理" name="user">
        <user-mange />
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="role">
        <role-mange />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UserMange from "./components/user-mange/index.vue"
import RoleMange from "./components/role-mange/index.vue"
export default {
  components: {
    UserMange,
    RoleMange
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