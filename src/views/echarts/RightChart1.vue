<!--
 * @Description: 
 * @Date: 2022-07-09 10:35:26
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-13 22:39:28
-->
<template>
  <div class="right-chart-1">
    <div class="rc1-header">文章分类概览</div>
    <dv-decoration-3 style="width:170px;height:10px;" />
    <div class="rc1-chart-container">
      <div class="left">
        <div class="number">262</div>
        <div>分类总数</div>
      </div>

      <dv-capsule-chart class="right" :config="config" />
    </div>
  </div>
</template>

<script>
export default {
  name: "RightChart1",
  data() {
    return {
      config: {
        data: [
          {
            name: "JavaScript",
            value: 122
          },
          {
            name: "vue",
            value: 31
          },
          {
            name: "react",
            value: 23
          },
          {
            name: "node",
            value: 12
          },
          {
            name: "其他",
            value: 89
          }
        ],
        unit: "件"
      }
    }
  }
}
</script>

<style lang="scss">
.right-chart-1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 0 0 10px;
  .rc1-header {
    font-size: 24px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
  }

  .rc1-chart-container {
    flex: 1;
    display: flex;
  }

  .left {
    width: 30%;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .number {
      font-size: 34px;
      color: #096dd9;
      font-weight: bold;
      margin-bottom: 30px;
    }
  }

  .right {
    flex: 1;
    padding-bottom: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
}
</style>
