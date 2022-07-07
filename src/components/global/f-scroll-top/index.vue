<!--
 * @Description: 会顶部
 * @Autor: fulei
 * @Date: 2022-07-07 20:43:45
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-07 22:36:42
 -->
<template>
  <div class="y-scroll" v-show="isShow">
    <div class="scroll-box">
      <div class="percent-box">
        <div class="percent-text">
          {{curPercent}}<span class="percent">%</span>
        </div>
        <!-- 后期删除置顶提示 -->
        <span class="top-text">置顶</span>
      </div>
      <div class="to-top" @click="handleToTop">置顶</div>
    </div>
  </div>
</template>

<script>
import { throttle } from "@utils/common"
export default {
  name: "f-scroll-top",
  components: {},
  props: {
    scrollClass: {
      type: String,
      default: ""
    }
  },
  filters: {},
  computed: {},
  watch: {},
  data() {
    return {
      curPercent: 0,
      isShow: false
    }
  },
  created() { },
  mounted() {
    // 获取滚动元素
    this.scrollElement = document.querySelector(`.${this.scrollClass}`)
    // 获取滚动元素的高度 800
    this.scrollEleClientHeight = this.scrollElement.clientHeight
    this.flag = true
    this.scrollElement.addEventListener("scroll", this.throttleFn, true)
  },
  methods: {
    handleScroll() {
      const scrollEleTop = this.scrollElement.scrollTop
      // 获取滚动元素的 子元素高度 2200
      const scrollChildHeight = this.scrollElement.firstChild.clientHeight
      // 最大滚动量
      this.maxScrollTop = scrollChildHeight - this.scrollEleClientHeight
      // 计算当前滚动的百分比
      this.curPercent = Math.floor((scrollEleTop / this.maxScrollTop) * 100)
      this.isShow = scrollEleTop > 200
    },
    // 置顶
    handleToTop() {
      this.scrollElement.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    // 函数节流
    throttleFn() {
      throttle(this.handleScroll, 50)
    }
  },
  destroyed() { }
}
</script>

<style scoped lang="scss">
.y-scroll {
  position: fixed;
  width: 48px;
  height: 48px;
  border-radius: 90px;
  line-height: 48px;
  right: 24px;
  bottom: 24px;
  background: #999;
  text-align: center;
  color: #fff;
  font-size: 15px;
  z-index: 999;
  overflow: hidden;
  transition: all ease 300ms;
  .scroll-box {
    .percent-box {
      position: relative;
      .percent-text {
        height: 48px; // 后期删除置顶提示
        line-height: 40px; // 后期删除置顶提示
        padding-left: 8px;
        .percent {
          display: inline-block;
        }
      }
      //后期删除置顶提示
      .top-text {
        position: absolute;
        display: inline-block;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        transform: scale(0.6);
        transform-origin: center bottom;
      }
      & .percent {
        transform: scale(0.6);
        transform-origin: left center;
      }
    }
    &:hover {
      background: $main_color;
      .percent-box {
        display: none;
      }
      .to-top {
        display: block;
        cursor: pointer;
      }
    }
  }
}
</style>