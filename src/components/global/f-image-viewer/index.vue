<!--
 * @Description: 兼容IE的图片查看器
 * @Version: 0.1
 * @Autor: fulei
-->

<template>
  <el-image-viewer v-on="$listeners" v-bind="$attrs" />
</template>
 
<script>
import { Image } from "element-ui"

export default {
  name: "f-image-viewer",
  components: {
    ElImageViewer: Image.components.ImageViewer
  }
}
</script>