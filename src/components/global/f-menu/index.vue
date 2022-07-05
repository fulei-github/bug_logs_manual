<!--
 * @Description: 分页
 * @Autor: fulei
 * @Date: 2020-05-07 23:22:51
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-02 18:22:44
 -->
<template>
  <div>
    <!-- <el-menu :default-active='theChoosen' mode="horizontal" router class="el-menu-vertical-demo" active-text-color="#5A9CF8">
      <el-submenu v-for="item in data" :index="item.id" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <template v-for="subItem in item.children">
          <el-submenu v-if="subItem.children" :key="subItem.id" :index="subItem.id">
            <template slot="title">{{subItem.name}}</template>
            <el-menu-item :index="childItem.to" v-for="childItem in subItem.children" :key="childItem.id" :route="{path:childItem.to}">
              <el-tooltip class="item" effect="light" :content="childItem.name" placement="right" v-if="childItem.name.length>10">
                <span :class="['one-line-hidden','text-over']"> {{childItem.name}}</span>
              </el-tooltip>
              <span v-else :class="['item-text']"> {{childItem.name}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="subItem.to" :key="subItem.id" :route="{path:subItem.to}">
            <el-tooltip class="item" effect="light" :content="subItem.name" placement="right" v-if="subItem.name.length>10">
              <span :class="['item-text','text-over']"> {{subItem.name}}</span>
            </el-tooltip>
            <span v-else :class="['item-text']"> {{subItem.name}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
    </el-menu> -->
    <el-menu mode="horizontal" default-active='/index' class="el-menu-vertical-demo" :collapse-transition="false" menu-trigger="click" :aria-expanded="false">
      <el-submenu v-for="item in data" :index="item.id" :key="item.id">
        <template slot="title">
          <i :class="item.icon" id="icon-item"></i>
          <span @click="handleClick(item)">{{item.name}}</span>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import data from "./data.json"
// 取消响应式
// const theDate = Object.freeze(data)
export default {
  name: "f-menu",
  // props: {
  //   // 当前选中菜单项index
  //   theChoosen: {
  //     type: String
  //   }
  // },
  data() {
    return {
      data: []
    }
  },

  mounted() {
    this.data = data.menuList
  },

  methods: {
    handleClick(item) {
      if (item.to) {
        this.$router.push(item.to)
      } else {
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.el-menu.el-menu--horizontal {
  border: none;
}
::v-deep .el-submenu__title {
  &:hover {
    #icon-item {
      color: $main_color;
    }
    span {
      color: $main_color;
    }
  }
  span {
    color: $main_text_color;
    font-size: 16px;
  }
}
.el-menu-item {
  padding: 0 48px !important;
}
.item-text {
  display: inline-block;
  width: 100%;
}

.text-over {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>