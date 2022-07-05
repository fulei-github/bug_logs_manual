<!--
 * @Description: 轮播图
 * @Date: 2022-05-20 12:45:05
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-05-20 13:05:20
-->
<template>
  <el-carousel :interval="2800">
    <el-carousel-item v-for="item in imgList" :key="item.id">
      <img :src="item.src" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "f-carousel",
  data() {
    return {
      imgList: [
        {
          id: 1,
          src: require("@pic/carousel/lbt7.jpg")
        },
        {
          id: 2,
          src: require("@pic/carousel/lbt3.jpg")
        },
        {
          id: 3,
          src: require("@pic/carousel/lbt2.jpg")
        },
        {
          id: 4,
          src: require("@pic/carousel/lbt1.jpg")
        },
        {
          id: 5,
          src: require("@pic/carousel/bg4.jpg")
        }
      ]
    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.el-carousel {
  width: 600px;
  height: 320px;
  // margin: 0 auto;
  img {
    height: 100%;
    width: 100%;
  }
}
</style>