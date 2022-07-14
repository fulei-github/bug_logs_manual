<!--
 * @Description: 
 * @Date: 2022-07-09 10:35:26
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-13 22:38:38
-->
<template>
  <div class="left-chart-1">
    <div class="lc1-header">文章分类</div>
    <dv-decoration-3 style="width:120px;height:10px;" />

    <!-- <div class="lc1-details">分类总数<span>31</span></div> -->
    <!-- <dv-capsule-chart class="lc1-chart" :config="config" /> -->
    <dv-conical-column-chart :config="config" style="width:100%;height:200px;margin-top:-20px" />
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>
export default {
  name: "LeftChart1",
  data() {
    return {
      config: {
        data: [
          {
            name: "Js",
            value: 55
          },
          {
            name: "vue",
            value: 120
          },
          {
            name: "react",
            value: 71
          },
          {
            name: "node",
            value: 66
          },
          {
            name: "node",
            value: 80
          },
          {
            name: "webpack",
            value: 35
          },
          {
            name: "css",
            value: 15
          }
        ],
        // img: [
        //   require("@/assets/imgs/bg4.jpg"),
        //   require("@/assets/imgs/bg4.jpg"),
        //   require("@/assets/imgs/bg4.jpg"),
        //   require("@/assets/imgs/bg4.jpg"),
        //   require("@/assets/imgs/bg4.jpg"),
        //   require("@/assets/imgs/bg4.jpg"),
        //   require("@/assets/imgs/bg4.jpg")
        // ],
        showValue: true
        // colors: ["#00baff", "#3de7c9", "#fff", "#ffc530", "#469f4b"],
        // unit: "件"
      }
    }
  }
}
</script>

<style lang="scss">
.left-chart-1 {
  width: 100%;
  height: 37%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  margin-top: 50px;
  .lc1-header {
    font-weight: 700;
    display: flex;
    font-size: 24px;
  }

  .lc1-details {
    height: 50px;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 20px;

    span {
      color: #096dd9;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }

  .lc1-chart {
    flex: 1;
  }
}
</style>
