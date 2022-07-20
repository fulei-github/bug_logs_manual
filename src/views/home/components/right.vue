<!--
 * @Description: 右侧区域
 * @Date: 2022-07-07 16:49:13
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-16 22:27:48
-->
<template>
  <div class='right-info'>
    <!-- 统计 -->
    <div class="overview">
      <span class="overview-item">
        <p>用户</p>
        <p>10</p>
      </span>
      <span class="overview-item item-border">
        <p>文章</p>
        <p>{{rightForm.art_total}}</p>
      </span>
      <span class="overview-item">
        <p>分类</p>
        <p>{{rightForm.cat_total}}</p>
      </span>
    </div>
    <!-- 卡片 -->
    <div class="team-attribute">
      <h3>参与贡献用户</h3>
      <span>{{teamTip}}</span><br>
      <div class="teamer-show">
        <span v-for="(item, index) in userList" :key="index" class="teamer-box">
          <el-image :src="item.avatarUrl" fit="fill" class="ava" v-if="index<6">
            <div slot="error" class="ava-error">
              <i class="el-icon-user-solid"></i>
            </div>
          </el-image>
        </span>
        <span class="ava-more" v-if="userList.length > 6">···</span>
        <!-- <span class="ava ava-more" v-if="userList.length>6" @click="avaMore">···</span> -->
      </div>
    </div>
    <!-- 文章列表区域 -->
    <div class="article-box">
      <h3>
        <i class="el-icon-s-claim"></i>个人成就 (20篇)
        <span class="get-thumbs">获得 <span class="color-main">3</span> 个点赞</span>
      </h3>
      <div class="article-name">
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item :title="item.name" :name="index" v-for="(item, index) in list" :key="index">
            <div class="article-list clearfix" v-for="(child, ind) in item.data" :key="ind">
              <span class="article-title">{{child && child.title}} </span>
              <el-link class="article-edit" @click="handlEdit">编辑</el-link>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- <f-empty /> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rightForm: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      teamTip: "",
      userList: [
        {
          avatarUrl: require("@/assets/imgs/bg4.jpg")
        },
        {
          avatarUrl: require("@/assets/imgs/bg4.jpg")
        },
        {
          avatarUrl: require("@/assets/imgs/bg4.jpg")
        }
      ],
      activeNames: "",
      list: []
    }
  },
  created() {
    const arr = [
      "今天，又榜上有名了😊😊",
      "你是我们的荣耀，这里是你的沉淀!",
      "若为意义而欢喜，那就给这以意义。",
      "成长，就是一点点积累的过程💪💪",
      "卷，是下一个更好的自己的别称罢了",
      "偷偷定下小目标：拿一次榜一☝️"
    ]
    this.teamTip = arr[Math.floor(Math.random() * arr.length)]
    // this.getMenuList()
  },
  methods: {
    //初始化信息
    formatInfo() {

    },
    avaMore() { },
    getMenuList() {
      this.list = []
      for (let index = 0; index < 20; index++) {
        this.list.push({
          name: "前端" + index,
          data: [{
            title: "前端必会算法" + index
          },
          {
            title: "前端必会算法" + index
          }]
        })
      }
    },
    handlEdit() {
      this.$router.push("/article-detail")
    }
  }
}
</script>
<style lang='scss' scoped>
.right-info {
  width: 100%;
  padding: 10px;
  .overview {
    width: 300px;
    padding: 12px 0;
    background-color: $fourth_border_color;
    border-radius: 24px;
    .overview-item {
      display: inline-block;
      width: 33.3%;
      margin-top: 4px;
      text-align: center;
      font-size: 16px;
      line-height: 25px;
      font-weight: 600;
      color: $second_blue_color;
    }
    .item-border {
      border-left: 1px solid $border_color;
      border-right: 1px solid $border_color;
    }
  }
  .team-attribute {
    position: relative;
    width: 300px;
    height: 159px;
    border-radius: 24px;
    margin: 24px 0 32px;
    background-image: url("~@/assets/imgs/team_gold.png");
    background-size: 126px 100%;
    background-repeat: no-repeat;
    background-position: 160px 0;
    background-color: $main_color;
    padding: 15px 0 15px 20px;
    color: white;
    .teamer-show {
      width: 90%;
      max-height: 51px;
      overflow: hidden;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      margin-top: 20px;
      padding: 10px 0;
      .ava {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid white;
        vertical-align: top;
        position: relative;
        margin-left: -5px;
        ::v-deep .ava-error {
          width: 40px;
          height: 40px;
          display: block;
          background: $main_bg_color;
          color: $fourth_text_color;
          font-size: 24px;
          text-align: center;
        }
      }
      & .teamer-box:first-of-type .ava {
        margin-left: 0px !important;
      }
      .ava-more {
        position: absolute;
        bottom: 24px;
        right: 20px;
      }
    }
  }
  .article-box {
    width: 300px;
    height: 600px;

    h3 {
      color: $third_text_color;
      width: 100%;
      margin-bottom: 10px;
      .el-icon-menu {
        margin-right: 10px;
      }
      .get-thumbs {
        float: right;
        font-size: 14px;
      }
    }
    ::v-deep .article-name {
      overflow: scroll;
      height: 100%;
      &::-webkit-scrollbar {
        width: 0;
        height: 0 !important;
      }
      &::-webkit-scrollbar-thumb {
        background: $second_border_color;
      }
      &::-webkit-scrollbar-track {
        border: none 0;
      }
      .el-collapse-item__header {
        color: $second_blue_color;
        font-size: 16px;
      }
      .el-collapse-item__content {
        padding-bottom: 0px;
      }
      .article-list {
        line-height: 32px;
        font-size: 13px;
        background: $main_bg_color;
        border-radius: 4px;
        padding: 0 14px;
        margin-bottom: 8px;
        cursor: pointer;
        &:hover {
          color: $main_color;
        }
        .article-title {
          display: inline-block;
          width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: top;
        }
        .article-edit {
          float: right;
          font-size: 13px;
          color: $main_color;
        }
      }
    }
  }
}
</style>
