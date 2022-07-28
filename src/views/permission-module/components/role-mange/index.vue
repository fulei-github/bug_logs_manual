<!--
 * @Description: 角色管理
 * @Date: 2022-06-24 13:16:42
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-27 22:40:21
-->
<template>
  <div class="box">
    <!-- 表单 -->
    <transition :duration="700" enter-active-class="animate__zoomInLeft" leave-active-class="animate__zoomOut">
      <div v-show="showFormArea" class="animate__animated form">
        <f-title content="搜索条件" border>
          <template #right-area>
            <el-button size="small" icon="el-icon-refresh" @click="reset">重 置</el-button>
            <el-button type="primary" icon="el-icon-search" size="small" @click="queryInfo">搜 索</el-button>
          </template>
        </f-title>
        <el-form ref="form" :model="form" label-width="70px" size="small">
          <el-row>
            <el-col :span="6">
              <el-form-item label="角色名称">
                <el-input v-model="form.roleName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="权限字符">
                <el-input v-model="form.string"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="创建时间">
                <el-date-picker v-model="form.createDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" />
              </el-form-item>

            </el-col> -->
            <el-col :span="6">
              <el-form-item label="状态">
                <f-select v-model="form.state" dictType="state" style="width:100%" />
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
    </transition>

    <f-title content="用户列表" border>
      <template #right-area>
        <el-button plain size="small" @click="showFormArea = !showFormArea">{{showFormArea ? '隐藏搜索' : '显示搜索'}}</el-button>
        <el-button plain size="small" @click="getList">刷新</el-button>

        <el-button type="primary" size="small" @click="addRole">添加角色</el-button>
      </template>
    </f-title>

    <el-table :data="tableData" border v-loading="loading">
      <el-table-column type="selection" align="center" width="55">
      </el-table-column>
      <el-table-column type="index" label="角色编号" align="center" width="200">
      </el-table-column>
      <el-table-column label="角色名称" prop="permission" align="center"></el-table-column>
      <el-table-column prop="permission" label="权限字符" align="center"></el-table-column>

      <el-table-column prop="desc" label="权限描述" align="center"></el-table-column>
      <el-table-column prop="created_at" label="创建时间" align="center">
        <template slot-scope="scope">
          {{dayFormat(scope.row.created_at,"datetime")}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编 辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelte(scope.row)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <f-pagination :total="100" @pagination="pagination" />
    <edit-dialog :showDialog="showDialog" :type="type" :formData="sonForm" @close="closeDialog" />
  </div>
</template>

<script>
import { getAllRoleListApi, delroleApi } from "@/api/user/index"
import EditDialog from "./edit.vue"
export default {
  components: {
    EditDialog
  },
  data() {
    return {
      tableData: [],
      form: {},
      loading: false,
      showFormArea: true,
      showDialog: false,
      sonForm: {},
      type: ""
    }
  },

  created() {
    this.getAllList()
  },

  methods: {
    //获取角色列表
    async getAllList() {
      this.loading = true
      try {
        const params = {
          rows: this.paginationForm.rows,
          page: this.paginationForm.page
        }
        const res = await getAllRoleListApi(params)
        if (res.code === 200) {
          this.paginationForm.total = res.data.total
          this.tableData = res.data.data
          // this.tableData.forEach(v => { v.state = v.state === "1" ? true : false })
        }
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    //删除角色
    delrole(id) {
      delroleApi({ id })
        .then(res => {
          if (res.code === 200) {
            this.$message.info(res.msg)
            this.getAllList()
          }
        })
    },
    //重置表单
    reset() {
      this.form = {}
    },
    //关闭弹窗
    closeDialog() {
      this.getAllList()
      this.showDialog = false
    },
    //搜索按钮
    queryInfo() {
      console.log(this.form)
      this.getList()
    },
    //分页组件
    pagination(val) {
      this.getList()
      console.log(val)
    },
    //模拟数据
    getList() {
      this.loading = true
      const timers = setTimeout(() => {
        this.tableData = [
          {
            roleName: "admin",
            string: "admin",
            state: "1",
            createDate: "20220606",
            roleDesc: "admin最高管理员，用于所有权限"
          },
          {
            roleName: "user-1",
            string: "mange",
            state: "1",
            createDate: "20220620",
            roleDesc: "网站管理员拥有除admin外的所有权限"
          },
          {
            roleName: "user-2",
            string: "user",
            state: "0",
            createDate: "20220620",
            roleDesc: "普通用户，仅可发布文章以及增删改查自己的文章"
          }
        ]
        this.loading = false
        clearTimeout(timers)
      }, 500)
    },
    //编辑操作
    handleEdit(row) {
      this.type = "edit"
      this.showDialog = true
      this.sonForm = row
    },
    //新增角色
    addRole() {
      this.type = "add"
      this.showDialog = true
    },
    //删除按钮
    handleDelte(row) {
      this.$confirm(`您确定删除 ${row.permission}? 角色吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delrole(row.id)

      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button.is-plain:focus,
.el-button.is-plain:hover {
  color: $main_color;
  border-color: $main_color;
}
.el-button--primary {
  background-color: $main_color;
  border-color: $main_color;
  &:hover {
    background-color: $gradient_blue_color_2;
    border-color: $fourth_border_color;
  }
}
.el-button--default {
  border-color: $second_border_color;
  &:hover {
    color: $main_color;
    border-color: $main_color;
  }
}
.el-button--danger {
  background-color: $danger_color;
  border-color: $fourth_text_color;
  &:hover {
    // background-color: $light_warn_color;
  }
}
.box {
  background-color: white;
  padding: 12px;
  height: 100vh;
  border-radius: 10px;
  animation: wobble-horizontal 600ms ease-in-out;
  .form {
  }
}
</style>