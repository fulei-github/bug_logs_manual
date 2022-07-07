<!--
 * @Description: 分页
 * @Autor: fulei
 * @Date: 2020-05-07 23:22:51
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-07 22:35:18
 -->
<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <!-- <div class="left-info"><span>总共 {{ total }} 条</span> <span>显示{{ start }}-{{ end }}条</span></div> -->
    <el-pagination class="flex-shrink" :background="background" :current-page.sync="currentPage" :page-size.sync="pageSize" :layout="layout" :page-sizes="pageSizes" :total="total" v-bind="$attrs" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { scrollTo } from "@/utils/scroll-to"
export default {
  name: "f-pagination",
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: "total, prev, pager, next, sizes ,jumper"
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: false
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit("update:page", val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit("update:limit", val)
      }
    },
    start() {
      return (this.currentPage - 1) * this.pageSize + 1
    },
    end() {
      return (this.pageSize * this.currentPage) > this.total ? this.total : (this.pageSize * this.currentPage)
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log("val", val)
      this.$emit("pagination", { page: 1, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  /* background: #ffffff; */
  padding: 32px 0;
}
.pagination-container.hidden {
  display: none;
}
</style>
