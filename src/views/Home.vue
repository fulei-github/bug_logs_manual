<!--
 * @Description: 
 * @Date: 2022-07-05 15:13:59
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-07 15:04:14
-->
<!--
 * @Description: home
 * @Date: 2022-07-05 15:13:59
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-07 10:02:54
-->
<template>
  <div class="home-box">
    <div class="left_box">
      <div class="content" v-loading="loading" element-loading-text="快好了，请稍等...">
        <el-tabs v-model="activeName" @tab-click="changeClassify">
          <el-tab-pane :label="item.name" :name="item.id" v-for="item in tabsList" :key="item.id">
            <div class="content-list">
              <list-panel :list="list" />
            </div>
          </el-tab-pane>
        </el-tabs>
        <f-pagination class="pagination" :total="100" @pagination="pagination" />
      </div>
    </div>
    <div class="right_box">right_box</div>
  </div>
</template>

<script>
import ListPanel from "./article-module/index.vue"
// import { showFullScreenLoading, endLoading } from "@/utils/loading"
export default {
  name: "Home",
  components: {
    ListPanel
  },
  data() {
    return {
      activeName: "",
      tabsList: [],
      list: [],
      loading: false
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
    getMenuList() {
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

  .left_box {
    width: calc(100% - 340px);
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
          // padding-right: 40px;
        }
        .el-tabs__item {
          font-size: 18px;
        }
        .el-tabs__content {
          height: calc(100% - 60px);
          overflow: auto;
          &::-webkit-scrollbar {
            width: 8px;
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
  }
  .right_box {
    width: 340px;
    height: 100%;
    background-color: white;
    border-radius: 24px;
    animation: anitRightLeft 600ms ease-in-out;
  }
}
</style>
