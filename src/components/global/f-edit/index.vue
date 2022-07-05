<template>
  <div class="box">
    <!-- 组件介绍 -->
    <div class="info m-10">
      <f-title content="组件介绍" border></f-title>
      <div class="t-2em">
        <slot name="title"></slot>
      </div>
    </div>

    <!-- 使用样例 -->
    <div class="exmaple m-10">
      <f-title content="使用样例" border></f-title>
      <div class="t-2em">
        <slot name="exmaple-title"></slot>
      </div>
      <div class="m-20 ">
        <div class="item border m-10">
          <h4>基础用法：</h4>
          <slot name="exmaple"></slot>
        </div>
      </div>
    </div>

    <!-- 演示代码 -->
    <div class="code">
      <f-title content="演示代码" border></f-title>

      <p class="t-2em">需有要组件以及该项目源代码的私信v：fuyilei688</p>
      <div class="m-10">
        <div class="item border m-10">
          <slot name="code"></slot>
        </div>
      </div>
    </div>

    <!-- Api -->
    <div class="api">
      <f-title content="Api" border></f-title>
      <p class="t-2em">Props</p>
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#f5f7fa', color: '#eee' }">
        <el-table-column label="参数">
          <template slot-scope="scope">
            <span v-if="scope.row.cs"> {{scope.row.cs}}</span>
            <span v-else> ---</span>
          </template>
        </el-table-column>
        <el-table-column label="说明">
          <template slot-scope="scope">
            <span v-if="scope.row.sm"> {{scope.row.sm}}</span>
            <span v-else> ---</span>
          </template>
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <el-link type="success"> {{scope.row.lx}}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="默认值">
          <template slot-scope="scope">
            <span v-if="scope.row.mrz"> {{scope.row.mrz}}</span>
            <span v-else> ---</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "f-edit",
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
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
.box {
  ::v-deep .cell {
    color: $main_text_color;
  }
  .text {
    color: $main-color;
  }
  .border {
    border: 1px solid #ddd;
    border-radius: 10px;
  }
  .item {
    padding: 20px;
  }
  .title {
    font-size: 24px;
  }
  ::v-deep .el-collapse-item__header {
    font-size: 18px;
  }
  ::v-deep .el-collapse-item__wrap {
    min-height: 100px;
  }
}
</style>