<!--
 * @Description: 分类管理 :smile
 * @Date: 2022-06-24 13:16:42
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-16 17:20:39
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
              <el-form-item label="分类名称">
                <el-input v-model="form.roleName"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="权限字符">
                <el-input v-model="form.string"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item label="创建时间">
                <el-date-picker v-model="form.createDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" style="width:100%" />
              </el-form-item>

            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="状态">
                <f-select v-model="form.state" dictType="state" style="width:100%" />
              </el-form-item>
            </el-col> -->
          </el-row>

        </el-form>
      </div>
    </transition>

    <f-title content="分类列表" border>
      <template #right-area>
        <el-button plain size="small" @click="showFormArea = !showFormArea">{{showFormArea ? '隐藏搜索' : '显示搜索'}}</el-button>
        <el-button plain size="small" @click="queryInfo">刷新</el-button>

        <el-button type="primary" size="small" @click="addRole">添加分类</el-button>
      </template>
    </f-title>

    <el-table :data="tableData" border v-loading="loading">
      <el-table-column type="selection" align="center" width="55">
      </el-table-column>
      <el-table-column type="index" label="分类编号" align="center" width="110">
      </el-table-column>
      <el-table-column label="分类名称" prop="name" align="center"></el-table-column>
      <!-- <el-table-column prop="creartor_id" label="创建用户" align="center">
        <template slot-scope="scope">
          {{scope.row.creartor_id}}
        </template>
      </el-table-column> -->
      <el-table-column prop="created_at" label="创建时间" align="center">
        <template slot-scope="scope">
          {{dayFormat(scope.row.created_at,"datetime")}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDelte(scope.row)">删 除</el-button>
          <!-- <el-button size="mini" @click="handleEdit(scope.row)">编 辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <f-pagination :total="paginationForm.total" :pageSizes="[10,20, 30, 50]" @pagination="pagination" />
    <edit-dialog :showDialog="showDialog" :type="type" :formData="sonForm" @close="colseDialog" />
  </div>
</template>

<script>
import { getCatgoryApi, delCatgoryApi } from "@api/article/index"
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
    this.getCatgory()
  },

  methods: {
    //获取文章分类
    getCatgory() {
      this.loading = true
      const params = {
        rows: this.paginationForm.rows,
        page: this.paginationForm.page
      }
      getCatgoryApi(params)
        .then(res => {
          if (res.code === 200) {
            this.tableData = res.data.data
            this.paginationForm.total = res.data.total
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    //删除分类
    delCatgoryApi(id) {
      delCatgoryApi({ id })
        .then(res => {
          if (res.code === 200) {
            this.$message.info(res.msg)
          }
        })
    },
    //关闭新增弹窗
    colseDialog() {
      this.showDialog = false
      this.getCatgory()
    },
    //搜索按钮
    queryInfo() {
      this.getCatgory()
    },
    //分页组件
    pagination(val) {
      this.paginationForm.rows = String(val.limit)
      this.paginationForm.page = String(val.page)
      this.getCatgory()
    },

    //编辑分类操作
    handleEdit(row) {
      this.type = "edit"
      this.showDialog = true
      this.sonForm = row
    },
    //新增分类
    addRole() {
      this.type = "add"
      this.showDialog = true
    },
    //删除按钮
    handleDelte(row) {
      this.$confirm(`您确定删除 ${row.name} 分类吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delCatgoryApi(row.id)
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        })
      })
    },
    //重置表单
    reset() {
      this.form = {}
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