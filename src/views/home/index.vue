<!--
 * @Description: 
 * @Date: 2022-07-05 15:13:59
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-14 14:54:30
-->

<template>
  <div class="home-box">
    <div class="left_box">
      <div class="content" v-loading="loading" element-loading-text="快好了，请稍等...">
        <!-- tab分类区域 -->
        <el-tabs v-model="activeName" @tab-click="changeClassify">
          <el-tab-pane :label="item.name" :name="item.id" v-for="item in tabsList" :key="item.id">
            <div class="content-list">
              <list-panel :list="list" />
            </div>
          </el-tab-pane>
        </el-tabs>
        <!-- 更多tab按钮 -->
        <div class="more-botton" @click="isShowCardTab = true">
          <i class="el-icon-menu"></i>
        </div>
        <transition name="fade" mode="out-in">
          <ul class="card-tabs clearfix" v-if="isShowCardTab" @mouseleave="isShowCardTab=false">
            <li class="mr12 mb12" :class="{'select-card-tab': item.id === activeName}" v-for="item in tabsList" :key="item.id" @click="handleCardTab(item)">
              {{item.name}}
            </li>
          </ul>
        </transition>

        <!-- 按照热度排序 -->
        <el-tooltip effect="dark" content="是否热度排序" placement="bottom" :hide-after="1500">
          <div class="hot-botton" @click="getArticleList">
            <svg-icon icon-class="hot_red"></svg-icon>
          </div>
        </el-tooltip>
        <!-- 分页 -->
        <f-pagination class="pagination" :total="100" @pagination="pagination" />
      </div>
    </div>
    <div class="right_box">
      <right-panel />
    </div>
    <div class="copyright">
      <span class="mr24">
        <i class="el-icon-s-custom mr4"></i>站长: 前端开发攻城狮-付磊
      </span>
      <span class="update-time mr24" @click="update">
        <i class="el-icon-message-solid mr4"></i>更新记录
      </span>
      <a class="update-time" href="https://baidu.com" target="blank">
        <i class="el-icon-s-opportunity mr4"></i>建议意见
      </a>
    </div>
  </div>
</template>

<script>
import ListPanel from "../article-module/index.vue"
import RightPanel from "./components/right.vue"
// import { showFullScreenLoading, endLoading } from "@/utils/loading"
export default {
  name: "Home",
  components: {
    ListPanel,
    RightPanel
  },
  data() {
    return {
      activeName: "",
      tabsList: [],
      list: [],
      loading: false,
      isShowCardTab: false
    }
  },
  watch: {
    activeName: {
      handler(newval) {
        this.getArticleList()
        console.log(this.activeName)
      }
    }
  },
  created() {
    this.getMenuList()

  },
  methods: {
    changeClassify(tab, event) {
    },
    handleCardTab(val) {
      this.activeName = val.id
    },
    getMenuList() {
      this.tabsList = []
      for (let index = 0; index < 20; index++) {
        this.tabsList.push({
          name: "前端" + (index + 1),
          id: String(index)
        })
      }
    },
    getArticleList() {
      this.loading = true
      // showFullScreenLoading()
      this.list = []
      const timers = setTimeout(() => {
        for (let index = 0; index < 20; index++) {
          this.list.push({
            article_title: "前端常用60种工具方法",
            avatar: require("@/assets/imgs/bg4.jpg"),
            article_img: require("@/assets/imgs/bg4.jpg"),
            article_author: "admin用户",
            article_views: 20,
            article_thumbs: 20,
            article_time: Date.now()
          })
        }
        // endLoading()
        this.loading = false
        clearTimeout(timers)
      }, 300)
    },
    pagination(val) {
      this.getArticleList()
    },
    update() {
      this.$message.info("该功能暂未开放...")
    }
  }
}
</script>
<style lang="scss" scoped>
.home-box {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;

  // margin: 4px 0 0 5px;
  .left_box {
    width: calc(100% - 380px);
    height: 100%;
    margin-right: $space_12;
    background-color: white;
    border-radius: 24px;
    padding: 0 $space_10;
    .content {
      width: 100%;
      height: 100%;
      position: relative;
      ::v-deep .el-tabs {
        height: 100%;
        .el-tabs__header {
          padding-right: 40px;
        }
        .el-tabs__item {
          font-size: 18px;
        }
        .el-tabs__content {
          height: calc(100% - 60px);
          overflow: auto;
          &::-webkit-scrollbar {
            width: 4px;
            height: 0 !important;
          }
          &::-webkit-scrollbar-thumb {
            background: $second_border_color;
          }
          &::-webkit-scrollbar-track {
            border: none 0;
          }
        }
      }
      // animation: aniBottomTop 600ms ease-in-out;
      ::v-deep .el-tabs__nav {
        // width: 90%;
      }
    }
    .pagination {
      position: absolute;
      bottom: -30px;
      left: 50%;
    }
    .more-botton {
      position: absolute;
      width: 32px;
      height: 32px;
      right: 24px;
      top: 6px;
      text-align: center;
      line-height: 32px;
      color: $third_text_color;
      cursor: pointer;
      &:hover {
        color: $main_color;
      }
    }
    // 按照热度排序
    .hot-botton {
      position: absolute;
      width: 32px;
      height: 32px;
      right: 0;
      top: 6px;
      text-align: center;
      line-height: 32px;
      color: $second_text_color;
      cursor: pointer;
      &:hover {
        color: $main_color;
      }
    }
    .card-tabs {
      width: 80%;
      min-height: 120px;
      background: #fff;
      border-radius: 8px;
      position: absolute;
      right: 10px;
      top: 42px;
      // transform: translate(-50%, 0);
      z-index: 9;
      border: 1px solid $third_border_color;
      animation: aniTopBottom 300ms;
      box-shadow: 0px 1.3px 1.2px -24px rgba(0, 0, 0, 0.041),
        0px 3.3px 3.1px -24px rgba(0, 0, 0, 0.056),
        0px 6.7px 6.4px -24px rgba(0, 0, 0, 0.069),
        0px 13.9px 13.1px -24px rgba(0, 0, 0, 0.084),
        0px 38px 36px -24px rgba(0, 0, 0, 0.13);
      padding: 20px;
      li {
        list-style: none;
        float: left;
        background: $main_bg_color;
        border-radius: 8px;
        cursor: pointer;
        padding: 4px 10px;
        font-size: 14px;
        color: $second_text_color;
        &:hover {
          background: $main_color;
          color: #fff;
        }
      }
      .select-card-tab {
        background: $main_color;
        color: #fff;
        font-weight: bold;
      }
    }
  }
  .right_box {
    width: 340px;
    height: 100%;
    background-color: white;
    border-radius: 24px;
    animation: anitRightLeft 600ms ease-in-out;
  }
  .copyright {
    position: absolute;
    bottom: 0;
    left: 30%;
    font-size: 12px;
    margin-top: 8px;
    color: #aaa;
    .update-time:hover {
      color: $main_color;
      cursor: pointer;
    }
  }
}
</style>
