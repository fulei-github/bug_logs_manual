<!--
 * @Description: 本地字典组件
 * @Version: 0.1
 * @Autor: csc
-->
<template>
  <el-select v-bind="$attrs" v-on="$listeners">
    <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import dictDatas from "@/assets/data/dict"
export default {
  name: "f-select",
  data() {
    return {
      options: []
    }
  },
  props: {
    // 字典类型
    dictType: {
      type: String,
      default: "default"
    }
  },
  mounted() {
    this.options = dictDatas[this.dictType]
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
