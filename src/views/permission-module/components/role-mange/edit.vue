<!--
 * @Description: 编辑角色和新增角色
 * @Date: 2022-06-24 14:47:12
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-06-27 09:53:30
-->
<template>
  <el-dialog :title="type === 'edit' ? '修改角色信息' : '新增角色信息'" :visible.sync="showDialog" width="30%" :before-close="handleClose">
    <div>
      <el-form ref="ruleForm" :model="form" label-width="100px" :rules="rules">

        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>

        <el-form-item label="权限字符" prop="string">
          <el-input v-model="form.string"></el-input>
        </el-form-item>

        <el-form-item label="创建时间" prop="createDate">
          <el-date-picker v-model="form.createDate" value-format="yyyy-MM-dd" style="width:100%" />
        </el-form-item>

        <el-form-item label="状态" prop="state">
          <f-select v-model="form.state" dictType="state" style="width:100%" />
        </el-form-item>

      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
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
        roleName: "", //角色名称
        string: "", //权限字符
        createDate: "", //创建时间
        state: "" //状态
      },
      rules: {
        roleName: [{ required: true, message: "请填写角色名称", trigger: "blur" }],
        string: [{ required: true, message: "请填写权限字符", trigger: "blur" }],
        createDate: [{ required: true, message: "请填写创建时间", trigger: "change" }],
        state: [{ required: true, message: "请选择状态", trigger: "change" }]
      }
    }
  },
  watch: {
    showDialog: {
      handler(newVal) {
        if (!newVal) {
          this.form = {}
        } else {
          if (this.type === "edit") {
            console.log(this.formData)
            this.backFill()
          }
        }
      }
    }
  },

  methods: {
    handleClose() {
      this.$emit("close", false)
    },
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
</style>