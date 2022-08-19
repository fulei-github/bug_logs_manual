<!--
 * @Description: bug记录，剩余问题记录
 * @Date: 2022-07-16 17:08:56
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-30 13:32:59
-->
<template>
  <el-drawer title="我是标题" :visible.sync="showDrawer" :with-header="false" :before-close="handleClose">
    <div class="wrapper">
      <f-title content="意见建议" border />
      <el-form ref="formRef" :model="form" label-position="top">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="问题标题">
              <el-input type="input" v-model="form.title" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="问题类型">
              <el-select v-model="form.type" clearable filterable style="width:100%">
                <el-option label="整体样式风格" value="1"></el-option>
                <el-option label="数据加载" value="2"></el-option>
                <el-option label="文章内容" value="3"></el-option>
                <el-option label="功能完整性" value="4"></el-option>
                <el-option label="动画交互" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="问题描述">
              <el-input type="textarea" rows="8" v-model="form.desc" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请上传相关问题图片">
              <div>
                <f-upload-avatar :jpg="form.imageUrl" @update:jpg="getJpgSrc" />
              </div>
            </el-form-item>

          </el-col>
        </el-row>
        <div class="text-align-c">
          <el-button size="small" @click="handleCancel">重 置</el-button>
          <el-button size="small" type="primary" @click="handleSubmit">提 交</el-button>
        </div>
      </el-form>

      <el-card class="common-question">
        <div class="title">常见问题</div>
        <ul class="questions">
          <li>1、切换分类刷新页面时，分页组件有问题</li>
          <li>2、点赞和评论功能要完善下</li>
          <li>3、查看文章时的目录呢</li>
          <li>4、个人账户页面太简陋</li>
        </ul>
        <div class="title">历史记录</div>
        <div>
          <el-tag type="info">标签三</el-tag>
        </div>
      </el-card>
    </div>
  </el-drawer>
</template>

<script>
export default {
  props: {
    showDrawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {}
    }
  },
  created() {
  },
  methods: {
    handleClose() {
      this.$emit("close", false)
    },
    handleSubmit() {
      this.$message.info("谢谢您宝贵的建议~")
      setTimeout(() => {
        this.handleClose()
      }, 300)
    },
    // 取消
    handleCancel() {
      this.$refs["formRef"].resetFields()
    },
    getJpgSrc() {

    }
  }
}
</script>
<style lang='scss' scoped>
ul {
  list-style: none;
}
.wrapper {
  padding: 0 20px 20px 20px;
  .common-question {
    margin-top: 40px;
    .title {
      font-size: 18px;
      color: $main_color;
      line-height: 50px;
      border-bottom: 1px solid #f0f0f0;
    }
    .questions {
      font-size: 14px;
      color: #666666;
      line-height: 30px;
      padding: 12px 0;
      li {
        cursor: pointer;
      }
    }
    .records {
      font-size: 12px;
      display: flex;
      flex-direction: column;
      margin-top: 12px;

      li {
        width: fit-content;

        border-radius: 2px;
        padding: 6px 4px;
        background-color: #f5f5f5;
        margin-bottom: 10px;
        cursor: pointer;
      }
    }
  }
}
.el-button.is-plain:focus,
.el-button.is-plain:hover {
  color: $main_color;
  border-color: $main_color;
}
.el-button--primary {
  background-color: $main_color;
  border-color: $main_color;
  &:hover {
    background-color: $gradient_blue_color_2;
    border-color: $fourth_border_color;
  }
}
.el-button--default {
  border-color: $second_border_color;
  &:hover {
    color: $main_color;
    border-color: $main_color;
  }
}
</style>
