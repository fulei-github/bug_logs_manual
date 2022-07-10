<template>
  <div class="f-title" :style="style">
    <div :class="border ? 'content' : 'border-none content'" :style="contStyle">
      <p v-if="content">{{ content }}</p>
      <span :class="`tab ${activedIndex==index?'actived':''}`" v-else v-for="(item,index) in tabs" :key="index" :tab='index'>{{item}}</span>
      <img class="title-icon" :style="iconStyle" :src="imgIconUrl" v-if="iconUrl" alt="" />
      <div class="line-flag" :style="lineStyle" v-else></div>
      <router-link class="more" v-show="more" :to="pathUrl" v-if="moreType == 1">{{ more }}</router-link>
      <span class="more-flag" v-if="moreType == 2">
        <span class="required">*</span>为必填项</span>
      <div class="right-area">
        <slot name="right-area"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "f-title",
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      }
    },
    activedIndex: {
      type: Number,
      default() {
        return 0
      }
    },
    moreType: {
      type: Number, // 默认不展示,默认1为链接,2为文字
      default: 1
    },
    border: {
      type: Boolean,
      default: false
    },
    // 标题内容样式
    fontContSize: {
      //标题字大小
      type: String,
      default: "18"
    },
    colorCont: {
      //标题内容颜色
      type: String,
      default: "333"
    },
    content: {
      //标题内容
      type: String,
      required: false,
      default: ""
    },
    pleft: {
      //左边间距
      type: String,
      default: "0"
    },
    fontWeight: {
      //是否可以加粗
      type: String,
      default: "bold"
    },
    mBottom: {
      //标题底部间距
      type: String,
      default: "16"
    },
    // 左侧竖线样式
    lineWidth: {
      //线宽度
      type: String,
      default: "5"
    },
    lineHeight: {
      //线高度
      type: String,
      default: "20"
    },
    lineLeft: {
      //线左边距
      type: String,
      default: "0"
    },
    lineTop: {
      //线头部边距
      type: String,
      default: "0"
    },
    more: {
      //更多
      type: String,
      default: ""
    },
    pathUrl: {
      //设置更多的链接
      type: String,
      default: "/"
    },
    backgroundColor: {
      type: String,
      default:
        "linear-gradient(0deg,rgba (52, 152, 219, 1) 0%,rgba (87, 186, 252, 1) 100%)"
    },
    iconUrl: {
      //图标的url 如：footer-icon-fault.png 标题的图标要放titleIcon底下
      type: String,
      default: ""
    },
    iconWidth: {
      //图标宽度
      type: String,
      default: "28"
    },
    iconHeight: {
      //图标高度
      type: String,
      default: "28"
    },
    iconLeft: {
      //图标左边距
      type: String,
      default: "-32"
    },
    iconTop: {
      //图标头部边距
      type: String,
      default: "7"
    }
  },
  computed: {
    style() {
      return {
        marginBottom: this.mBottom + "px",
        paddingLeft: this.pleft + "px"
      }
    },
    lineStyle() {
      return {
        width: this.lineWidth + "px",
        height: this.lineHeight + "px",
        left: this.lineLeft + "px",
        top: this.lineTop + "px",
        background: this.backgroundColor
      }
    },
    contStyle() {
      return {
        fontSize: this.fontContSize + "px",
        color: "#" + this.colorCont,
        fontWeight: this.fontWeight
      }
    },
    iconStyle() {
      //前置图标
      return {
        width: this.iconWidth + "px",
        height: this.iconHeight + "px",
        left: this.iconLeft + "px",
        top: this.iconTop + "px"
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.f-title {
  background-color: #fff;
  position: relative;
  margin-top: 8px;
  p {
    line-height: 40px;
  }
  span {
    line-height: 40px;
    cursor: pointer;
    &.actived {
      color: $main_color;
    }
    &:hover {
      color: $main_color;
    }
    & + span {
      margin-left: 16px;
    }
  }
  .border-none {
    border: 0 !important;
  }
  .content {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 14px;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
    display: flex;
    align-content: center;
    .title-icon {
      position: absolute;
    }
    .line-flag {
      position: absolute;
      top: 50% !important;
      transform: translateY(-50%);
      background: $main_color;
    }
  }

  .more,
  .more-flag {
    position: relative;
    float: right;
    font-size: 12px;
    right: 30px;
    color: $fourth_text_color;
  }
  .more-flag {
    color: $third_text_color;
    font-size: 14px;
  }
  .required {
    color: $danger_color;
  }
}
.right-area {
  margin-left: auto;
}
</style>
