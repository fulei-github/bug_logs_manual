<!--
 * @Description: 字段显示顺序
 * @Date: 2022-03-29 11:14:59
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-05-14 13:53:07
-->
<template>
  <el-dialog title="字段显示顺序(拖拽调整)" :visible="showDialog" width="25%" custom-class="f-drag-table-wrapper" @close="closeHandler">
    <el-tree ref="tree" :data="tableHeaderList" empty-text="暂无数据" default-expand-all draggable show-checkbox :allow-drop="allowDrop" @node-drop="handleDrop" />
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSave">保 存</el-button>
      <el-button @click="closeHandler">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import _ from "lodash"
export default {
  name: "f-drag-table",
  props: {
    showDialog: { //显示弹窗
      type: Boolean,
      default: false
    },
    list: { //显示弹窗
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableHeaderList: [], //传递给父组件的table表头
      visible: false
    }
  },
  watch: {
    showDialog: {
      handler(val) {
        this.visible = val
      },
      immediate: true
    },
    list: {
      handler(val) {
        this.tableHeaderList = _.cloneDeep(val)
      },
      immediate: true
    }
  },
  methods: {
    //弹窗关闭
    closeHandler() {
      this.$emit("closeDialog", false)
      this.$emit("update:showDialog", false)
    },
    //拖拽事件
    handleDrop(before, after, inner) { },
    //点击保存
    onSave() {
      // console.log(this.$refs.tree.getCheckedNodes())
      this.$emit("changeIndex", _.cloneDeep(this.tableHeaderList))
      this.$emit("update:showDialog", false)
      // console.log("筛选后的数组", this.$refs.tree.getCheckedNodes(), this.list)
    },
    //不可插入节点内部
    allowDrop(draggingNode, dropNode, type) {
      return type !== "inner"
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.y-drag-table-wrapper {
  .el-dialog__body {
    .el-tree {
      width: 100%;
    }
  }
}
</style>
