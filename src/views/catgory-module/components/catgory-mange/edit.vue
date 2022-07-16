<!--
 * @Description: 编辑分类(后续再做)和新增分类
 * @Date: 2022-06-24 14:47:12
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-16 16:43:22
-->
<template>
  <el-dialog :title="type === 'edit' ? '修改分类信息' : '新增分类信息'" :visible.sync="showDialog" width="30%" :before-close="handleClose">
    <div>
      <el-form ref="ruleForm" :model="form" label-width="100px" :rules="rules">

        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="创建时间" prop="createDate">
          <el-date-picker v-model="form.created_at" value-format="yyyyMMdd" style="width:100%" disabled />
        </el-form-item>

      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { dayFormat } from "@/utils/dayjs"
import { addCatgoryApi } from "@/api/article/index"
export default {
  props: {
    type: { //新增 or 修改
      type: String,
      default: "add"
    },
    showDialog: { // 展示弹窗
      type: Boolean,
      default: false
    },
    formData: { //回显数据
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        name: "", //分类名称
        created_at: String(dayFormat(Date.now(), "date")) //创建时间
      },
      rules: {
        name: [{ required: true, message: "请填写分类名称", trigger: "blur" }],
        createDate: [{ required: true, message: "请填写创建时间", trigger: "change" }]
      }
    }
  },
  watch: {
    showDialog: {
      handler(newVal) {
        if (!newVal) {
          this.resetForm()
        } else {
          if (this.type === "edit") {
            console.log(this.formData)
            this.backFill()
            this.resetForm()
          }
        }
      }
    }
  },

  methods: {
    //新增分类
    addCatgory() {
      const params = {
        ...this.form,
        creartor_id: this.$sessionUtil.getItem("user").id
      }
      addCatgoryApi(params)
        .then(res => {
          if (res.code === 200) {
            this.$message.info(res.msg)
            this.$emit("close", false)
          }
          console.log(res)
        })
    },

    //确认
    submit() {
      this.addCatgory()
    },
    //关闭弹窗
    handleClose() {
      this.$emit("close", false)
    },
    //重置校验和内容
    resetForm() {
      this.$refs["ruleForm"].resetFields()
    },
    //回显数据
    backFill() {
      this.form = this.formData
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button--primary {
  background-color: $main_color;
  border-color: $main_color;
  &:hover {
    background-color: $gradient_blue_color_2;
    border-color: $fourth_border_color;
  }
}
.el-button--default {
  &:hover {
    color: $main_color;
    border-color: $main_color;
  }
}
</style>