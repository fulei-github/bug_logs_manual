<!--
 * @Description: 
 * @Date: 2022-04-13 14:59:08
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-05-13 20:05:17
-->

<template>
  <el-cascader v-bind="$attrs" v-on="$listeners" ref="cascaderAddr" :options="options" :props="_computedProps" @change="handleChange" filterable></el-cascader>
</template>
<script>
const data = require("./xzqhAll.json")
import { travelTrees } from "./travel-trees"

export default {
  name: "f-cascader-city",
  data() {
    return {
      options: [],
      defaultPros: {
        value: "id",
        label: "name",
        children: "children",
        placeholder: "请选择",
        expandTrigger: "hover",
        checkStrictly: false,
        emitPath: false,
        currArr: []
      }
    }
  },
  props: {
  },
  computed: {
    _computedProps() {
      return Object.assign(this.defaultPros, this.$attrs.props)
    },
    selectValue: {
      set(newValue) {
        this.$emit("change", newValue)
      },
      get() {
        return this.value
      }
    }
  },
  watch: {
  },
  created() {
    travelTrees(data, node => {
      if (!node.children || !node.children.length) {
        // console.log("node", node)
        node.leaf = true
        delete node.children
      }
    })
    this.options = data
  },
  methods: {
    handleChange(val) {
      if (val) {
        const obj = {}
        obj.value = this.$refs.cascaderAddr.getCheckedNodes()[0].value
        obj.list = this.$refs.cascaderAddr.getCheckedNodes()[0].pathLabels
        this.$emit("changeCurr", obj)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-cascader {
  width: 100%;
}
</style>
