<!--
 * @Description: 文章管理
 * @Date: 2022-06-24 13:16:42
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-16 22:13:01
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
              <el-form-item label="文章标题">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="作者">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="创建时间">
                <el-date-picker v-model="form.createDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyyMMdd" style="width:100%" />
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

    <f-title content="文章列表">
      <template #right-area>
        <el-button plain size="small" @click="showFormArea = !showFormArea">{{showFormArea ? '隐藏搜索' : '显示搜索'}}</el-button>
        <el-button plain size="small" @click="getAllList">刷新</el-button>
      </template>
    </f-title>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column type="selection" align="center" width="55">
      </el-table-column>
      <el-table-column type="index" label="文章编号" align="center" width="100">
      </el-table-column>
      <el-table-column label="文章标题" prop="title" align="center"></el-table-column>
      <el-table-column prop="author" label="作者" align="center">
      </el-table-column>
      <el-table-column prop="catgory" label="所属目录" align="center">
      </el-table-column>
      <el-table-column prop="article_thumbs" label="点赞人数" align="center" width="100">
      </el-table-column>
      <el-table-column prop="article_views" label="阅读人数" align="center" width="100">
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="viewDetail(scope.row)">查 看</el-button>
          <el-button type="danger" size="mini" @click="handleDelte(scope.row)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <f-pagination :total="paginationForm.total" :pageSizes="[10,20, 30, 50]" @pagination="pagination" />
  </div>
</template>

<script>
import { getArticleApi, delArticleApi } from "@/api/article"
export default {

  data() {
    return {
      tableData: [],
      form: {
        createDate: []
      },
      paginationForm: {
        total: 10,
        page: "1",
        rows: "10"
      },
      loading: false,
      showFormArea: true,
      showDialog: false
    }
  },

  created() {
    this.getAllList()
    // this.getList()
  },

  methods: {
    //获取用户列表
    async getAllList() {
      this.loading = true
      try {
        const params = {
          rows: this.paginationForm.rows,
          page: this.paginationForm.page
        }
        const res = await getArticleApi(params)
        if (res.code === 200) {
          console.log(res)
          // this.paginationForm.total = res.data.total
          this.tableData = res.data.data
          // this.tableData.forEach(v => { v.state = v.state === "1" ? true : false })
        }
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    //删除文章
    delCatgory(id) {
      delArticleApi({ id })
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
    //搜索按钮
    queryInfo() {
      this.getAllList()
    },
    //分页组件
    pagination(val) {
      this.paginationForm.rows = String(val.limit)
      this.paginationForm.page = String(val.page)
      this.getAllList()
    },
    //设置角色
    viewDetail(row) {
      this.$router.push({
        path: "/article-detail",
        query: {
          info: row
        }
      })
    },
    //删除按钮
    handleDelte(row) {
      this.$confirm(`您确定删除 ${row.title} 文章吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delCatgory(row.id)

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