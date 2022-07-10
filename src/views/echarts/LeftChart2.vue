<!--
 * @Description: 
 * @Date: 2022-07-09 10:35:26
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-09 13:04:25
-->
<template>
  <div class="left-chart-2">
    <div class="lc2-header">最新发布文章</div>
    <dv-decoration-3 style="width:150px;height:10px;" />
    <dv-scroll-ranking-board :config="config" style="width:100%;height:380px" />
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>
export default {
  name: "LeftChart2",
  data() {
    return {
      config: {
        data: [
          {
            name: "你不知道的JavaScript",
            value: 55
          },
          {
            name: "vue从入门到精通",
            value: 120
          },
          {
            name: "都2022年啦你还不会react吗",
            value: 78
          },
          {
            name: "该学习ts了",
            value: 66
          },
          {
            name: "webpack保姆级教学",
            value: 80
          },
          {
            name: "eggjs实战",
            value: 45
          },
          {
            name: "你真的了解css吗",
            value: 29
          },
          {
            name: "vue常用知识",
            value: 29
          },
          {
            name: "vscode配置项",
            value: 29
          },
          {
            name: "helloworld",
            value: 29
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
.left-chart-2 {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  .lc2-header {
    font-size: 24px;
    font-weight: 700;
  }

  .lc2-details {
    height: 40px;
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

  .lc2-chart {
    height: calc(100% - 80px);
  }
}
</style>
