<!--
 * @Description: 
 * @Date: 2022-07-05 17:56:02
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-08 11:46:26
-->
<template>
  <!-- <el-menu :default-active='index' :collapse="true" :unique-opened="true" router class="el-menu-vertical-demo">
      <el-menu-item v-for="item in data" :index="item.index" :key="item.id" :route="item.index">
        <i :class="item.icon" style="font-size:24px"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu> -->
  <ul class="f-menu">
    <div class="logo">
      <svg-icon icon-class="bug" class="logo-svg" />
    </div>
    <li v-for="(item,index) in data" :index="item.index" :key="item.id" :class="`f-menu-item ${defaultItem==item.index?'actived':''}`" @click="handleClick(item,index)">
      <el-tooltip effect="dark" :content="item.name" placement="right-start">
        <i :class="item.icon" style="font-size:24px"></i>
      </el-tooltip>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          id: "0",
          icon: "el-icon-s-home",
          name: "首页",
          index: "/index"
        },
        {
          id: "1",
          icon: "el-icon-edit",
          name: "编辑文章",
          index: "/article-edit"
        },
        {
          id: "2",
          icon: "el-icon-mobile",
          name: "编辑文章",
          index: "/"
        },
        {
          id: "3",
          icon: "el-icon-tickets",
          name: "编辑文章",
          index: "/"
        },
        {
          id: "4",
          icon: "el-icon-user",
          name: "编辑文章",
          index: "/"
        }
      ],
      activedIndex: 0,
      defaultItem: ""
    }
  },
  watch: {
    $route: {
      handler(to) {
        this.defaultItem = to.fullPath
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    const obj = {
      a: {
        hello: "2121",
        fafs: 13123
      },
      b: {
        f: {
          dsf: "fsdfsd"
        }
      }
    }
    console.log(this.objFun(obj))
  },
  methods: {
    objFun(obj) {
      var res = {} //定义一个对象，用来存储结果
      function isObj(obj) { //定义一个函数，用来对obj进行遍历
        for (var key in obj) {
          if (Object.prototype.toString.call(obj[key]) == "[object Object]") { //如果值为对象，则进行递归
            isObj(obj[key])
          } else { //不为对象则将值添加给res
            res[key] = obj[key]
          }
        }
      }
      isObj(obj) //调用函数
      return res //返回结果
    },
    handleClick(item, i) {
      this.$router.push(item.index)
      console.log(item, i)
      // this.activedIndex = i
    }
  }
}
</script>
<style lang='scss' scoped>
.f-menu {
  padding: $space_6;
  .logo {
    width: 50px;
    height: 50px;
    padding-top: $space_6;
    text-align: center;
    line-height: 50px;
    background-color: white;
    margin-top: 80px;
    margin-bottom: 50px;
    border-radius: 10px;
    cursor: pointer;
    .logo-svg {
      width: 30px;
      height: 30px;
      color: $main_color;
    }
  }
  .actived {
    background-color: hsla(0, 0%, 100%, 0.2);
  }
  .f-menu-item {
    margin-top: $space_24;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    color: white;
    border-radius: 5px;
    &:hover {
      transition: all 0.5s;
      background-color: hsla(0, 60%, 6%, 0.2);
    }
  }
}
</style>
