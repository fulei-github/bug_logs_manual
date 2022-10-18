<!--
 * @Description: 
 * @Date: 2022-07-05 15:13:59
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei🐰
 * @LastEditTime: 2022-10-18 17:01:00
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
        <div class="more-botton" @click="isShowCardTab=!isShowCardTab">
          <i class="el-icon-menu"></i>
        </div>
        <transition name="fade" mode="out-in">
          <ul class="card-tabs clearfix" v-if="isShowCardTab" @click="isShowCardTab=!isShowCardTab">
            <li class="mr12 mb12" :class="{'select-card-tab': item.id === activeName}" v-for="item in tabsList"
              :key="item.id" @click="handleCardTab(item)">
              {{item.name}}
            </li>
          </ul>
        </transition>

        <!-- 按照热度排序 -->
        <el-tooltip effect="dark" content="是否热度排序" placement="bottom" :hide-after="1500">
          <div class="hot-botton" @click="sortViews">
            <svg-icon icon-class="hot_red"></svg-icon>
          </div>
        </el-tooltip>
        <!-- 分页 -->
        <f-pagination class="pagination" :total="paginationForm.total" :pageSizes="[10,20, 30, 50]"
          @pagination="pagination" />
      </div>
    </div>
    <div class="right_box">
      <right-panel :rightForm="rightForm" ref="rightPanel" />
    </div>
    <div class="copyright">
      <span class="mr24">
        <i class="el-icon-s-custom mr4"></i>站长: 前端开发攻城狮-付磊
      </span>
      <span class="update-time mr24" @click="update">
        <i class="el-icon-message-solid mr4"></i>更新记录
      </span>
      <span class="update-time " @click="showDrawerFn">
        <i class="el-icon-s-opportunity mr4"></i>建议意见
      </span>
      <!-- <a class="update-time" href="https://baidu.com" target="blank">
        <i class="el-icon-s-opportunity mr4"></i>建议意见
      </a> -->
      <right-drawer :showDrawer="showDrawer" @close="showDrawer = false" />
    </div>
  </div>
</template>

<script>
import ListPanel from "../article-module/index.vue"
import RightPanel from "./components/right.vue"
import RightDrawer from "./bug.vue"
import { getCatgoryApi, getArticleApi, getArtByIdApi, getCatListApi } from "@api/article/index"
// import { showFullScreenLoading, endLoading } from "@/utils/loading"
export default {
  name: "Home",
  components: {
    ListPanel,
    RightPanel,
    RightDrawer
  },
  data() {
    return {
      showDrawer: false,
      activeName: "1",
      tabsList: [],
      list: [],
      loading: false,
      isShowCardTab: false,
      rightForm: {
        cat_total: 0,
        art_total: 0
      }
    }
  },
  watch: {
    activeName: {
      handler(newval) {
        this.paginationForm.page = "1"
        this.paginationForm.rows = "10"
        newval === "1" ? this.getArticle() : this.getArtById(newval)
        // this.getCatgory()
      },
      immediate: true
    }
  },
  activated() {
    this.getCatgory()
    this.controlCatList()
    this.getArticle()
  },
  created() {
    this.getCatgory()
    this.controlCatList()
  },
  methods: {
    //获取文章分类
    getCatgory() {
      getCatgoryApi()
        .then(res => {
          if (res.code === 200) {
            res.data.data.forEach(v => {
              v.id = String(v.id)
            })
            this.tabsList = res.data.data
            this.rightForm.cat_total = res.data.total
          }
        })
    },
    //根据id获取文章列表
    getArtById(id) {
      this.loading = true
      const params = {
        id,
        rows: this.paginationForm.rows,
        page: this.paginationForm.page
      }
      getArtByIdApi(params)
        .then(res => {
          if (res.code === 200) {
            this.list = res.data.list
            this.paginationForm.total = res.data.total
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    //当前页面有无登录信息
    controlCatList() {
      const user = this.$sessionUtil.getItem("user")
      if (user) {
        this.getCatList()
        return
      }
      this.$nextTick(() => {
        this.$refs.rightPanel.getMenuList([])
      })
      // this.$refs.rightPanel.getMenuList([])
    },
    //根据id获取分类下的文章列表
    getCatList() {
      this.loading = true
      const params = {
        id: this.$sessionUtil.getItem("user")?.id || "",
        rows: this.paginationForm.rows,
        page: this.paginationForm.page
      }
      getCatListApi(params)
        .then(res => {
          if (res.code === 200) {
            const arr = []
            const obj = {
              arr,
              total: 0,
              user_total: res.data.user_total,
              cat_total: res.data.cat_total,
              art_total: res.data.art_total
            }
            const list = res?.data?.list
            for (let index = 0; index < list.length; index++) {
              if (list[index].data.length !== 0) {
                arr.push(list[index])
              }
            }
            if (arr.length !== 0) {
              const total = arr.reduce((t, c) => t + c.total, 0)
              obj.total = total
            }
            this.$refs.rightPanel.getMenuList(obj)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    //获取文章列表
    getArticle() {
      this.loading = true
      const params = {
        rows: this.paginationForm.rows,
        page: this.paginationForm.page
      }
      getArticleApi(params)
        .then(res => {
          if (res.code === 200) {
            this.list = res.data.data
            this.paginationForm.total = res.data.totalObj.total
            this.$refs.rightPanel.getTotal(res.data.totalObj)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    //按热度排序
    async sortViews() {
      this.activeName === "1" ? this.getArticle() : this.getArtById(this.activeName)
      // this.loading = true
      // try {
      //   const res = await findListBySeeApi()
      //   this.list = res.data.data
      //   this.paginationForm.total = res.data.totalObj.total
      //   this.$refs.rightPanel.getTotal(res.data.totalObj)
      //   this.activeName = "1"
      //   console.log("按热度排序", res)
      // } catch (error) {
      //   console.log(error)
      // }
      // this.loading = false
    },
    changeClassify(tab, event) {
    },
    handleCardTab(val) {
      this.activeName = val.id
    },
    //分页
    pagination(val) {
      this.paginationForm.rows = String(val.limit)
      this.paginationForm.page = String(val.page)
      this.activeName === "1" ? this.getArticle() : this.getArtById(this.activeName)
      this.paginationForm.page = "1"
      this.paginationForm.rows = "10"
    },
    update() {
      this.$message.info("该功能暂未开放...")
    },
    showDrawerFn() {
      this.showDrawer = true
    }
  }
}
</script>
<style lang="scss" scoped>
.home-box {
  display: flex;
  justify-content: space-between;
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
