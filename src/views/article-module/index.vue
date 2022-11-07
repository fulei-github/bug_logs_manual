<template>
  <ul class="list-box">
    <transition name="fade" mode="out-in">
      <div v-if="list.length">
        <li class="list-item" v-for="(item,i) in list" :key="i" @click="handleClick(item)">
          <el-image class="image" :src="item.photo" fit="scale-down"></el-image>
          <div class="info-box">
            <p class="title">{{item.title}}</p>
            <p class="footer">
              <span class="avatar">
                <img v-if="!!item.photo" :src="item.photo" alt="">
                <i class="el-icon-user-solid" v-else></i>
              </span>
              <span class="author">
                {{item.author}}
              </span>
              <span class="company-name mr24">{{item.article_author}}</span>
              <span class="mr24">
                <svg-icon icon-class="eyes" />
                {{item.article_views}}
              </span>
              <span class="mr24">
                <svg-icon class="mr4" icon-class="love" />
                {{item.article_thumbs}}
              </span>
              <span>
                <svg-icon icon-class="time" />
                {{dayFormat(item.created_at, 'YYYY-MM-DD')}}
              </span>
            </p>
          </div>
        </li>
      </div>
      <div v-else>
        <f-empty :marginTop="180" />
      </div>
    </transition>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
    handleClick(item) {
      this.$router.push({
        path: "/article-detail",
        query: {
          info: item
        }
      })
    }

  }
}
</script>
<style lang='scss' scoped>
.list-box {
  .list-item {
    animation: aniBottomTop 600ms ease-in-out;
    display: flex;
    width: 100%;
    padding: 12px 10px;
    cursor: pointer;
    transition: all ease 260ms;
    border-bottom: 1px solid $border_light;
    &:hover {
      background: $main_bg_color;
      .title {
        color: $main_color;
      }
    }
    .image {
      width: 140px;
      min-width: 140px;
      height: 80px;
    }
    .info-box {
      padding-left: 24px;
      font-size: 14px;
      .title {
        font-size: 17px;
        font-weight: 600;
        margin: 6px 0;
      }
      .footer {
        padding-top: 5px;
        height: 30px;
        display: flex;
        align-items: center;
        .avatar {
          width: 24px;
          height: 24px;
          img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            position: relative;
            top: 2px;
          }
        }
        .company-name {
          margin-left: 6px;
        }
        color: $third_text_color;
        margin-bottom: 3px;
      }
    }
  }
}
</style>
