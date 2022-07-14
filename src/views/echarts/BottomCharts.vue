<!--
 * @Description: 
 * @Date: 2022-07-09 10:35:26
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-13 22:38:59
-->
<template>
  <div class="bottom-charts">
    <div class="bc-chart-item">

      <div class="chart-name">
        <div class="title">十五日内阅读总量</div>
        <dv-decoration-3 style="width:240px;height:10px;" />
      </div>
      <dv-charts :option="option" style="margin-top:-30px" />
    </div>
  </div>
</template>

<script>

export default {
  name: "BottomCharts",
  components: {
  },
  data() {
    return {
      option: {
        legend: {
          data: ["文章阅读数"],
          textStyle: {
            fill: "#fff"
          }
        },
        xAxis: {
          data: [
            "07/01", "07/02", "07/03", "07/04", "07/05", "07/06",
            "07/07", "07/07", "07/08", "07/09", "07/10", "07/11",
            "07/12", "07/13", "07/14", "07/15"
          ],
          boundaryGap: false,
          axisLine: {
            style: {
              stroke: "#999"
            }
          },
          axisLabel: {
            style: {
              fill: "#999"
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          data: "value",
          splitLine: {
            show: false
          },
          axisLine: {
            style: {
              stroke: "#999"
            }
          },
          axisLabel: {
            style: {
              fill: "#999"
            }
            // formatter({ value }) {
            //   return value.toFixed(2)
            // }
          },
          axisTick: {
            show: false
          },
          min: 0,
          max: 40,
          interval: 10
        },
        series: [
          {
            data: [
              30, 21, 22, 23, 24, 25,
              21, 22, 23.84, 21.32, 21.14, 12.45,
              31.15, 23.45, 12.64, 12.89
            ],
            type: "line",
            name: "设备完好率",
            smooth: true,
            lineArea: {
              show: true,
              gradient: ["rgba(55, 162, 218, 0.6)", "rgba(55, 162, 218, 0)"]
            },
            linePoint: {
              radius: 4,
              style: {
                fill: "#00db95"
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
.bottom-charts {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  .bc-chart-item {
    padding-top: 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .title {
      font-size: 24px;
      font-weight: 700;
      margin-left: 20px;
    }
  }

  .dv-active-ring-chart {
    height: calc(100% - 80px);
  }

  .label-tag {
    height: 30px;
  }

  .active-ring-name {
    font-size: 18px !important;
  }

  .decoration-1,
  .decoration-2,
  .decoration-3 {
    display: absolute;
    left: 0%;
  }
}
</style>
