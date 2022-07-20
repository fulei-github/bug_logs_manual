<!--
 * @Description: 编辑角色和新增角色
 * @Date: 2022-06-24 14:47:12
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-16 22:59:16
-->
<template>
  <el-dialog :title="type === 'edit' ? '修改角色信息' : '新增角色信息'" :visible.sync="showDialog" width="30%" :before-close="handleClose">
    <div>
      <el-form ref="ruleForm" :model="form" label-width="100px" :rules="rules">

        <el-form-item label="角色名称" prop="permission">
          <el-input v-model="form.permission"></el-input>
        </el-form-item>

        <el-form-item label="角色描述" prop="desc">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>

        <el-form-item label="创建时间" prop="created_at">
          <el-date-picker v-model="form.created_at" value-format="yyyyMMdd" style="width:100%" disabled />
        </el-form-item>

        <!-- <el-form-item label="状态" prop="state">
          <f-select v-model="form.state" dictType="state" style="width:100%" />
        </el-form-item> -->

      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addRoleApi, editRoleApi } from "@/api/user/index"

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
        permission: "", //角色名称
        desc: "", //权限字符
        created_at: String(this.dayFormat(Date.now(), "date")), //创建时间
        state: "" //状态
      },
      rules: {
        permission: [{ required: true, message: "请填写角色名称", trigger: "blur" }],
        desc: [{ required: true, message: "请填写权限字符", trigger: "blur" }],
        created_at: [{ required: true, message: "请填写创建时间", trigger: "change" }],
        state: [{ required: true, message: "请选择状态", trigger: "change" }]
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
            this.backFill()
            this.resetForm()
          }
        }
      }
    }
  },

  methods: {
    //新增角色
    addRole() {
      const params = {
        permission: this.form.permission,
        desc: this.form.desc,
        created_at: this.dayFormat(Date.now(), "date")
      }
      addRoleApi(params)
        .then(res => {
          if (res.code === 200) {
            this.$message.info(res.msg)
            this.$emit("close", false)
          }
        })
    },
    //修改角色信息
    editRole() {
      const params = {
        permission: this.form.permission,
        desc: this.form.desc,
        id: this.form.id,
        created_at: this.dayFormat(Date.now(), "date")
      }
      editRoleApi(params)
        .then(res => {
          if (res.code === 200) {
            console.log(res)
            this.$message.info("修改角色成功！")
            this.$emit("close", false)
          }
        })
    },
    //确认
    submit() {
      switch (this.type) {
        case "add":
          this.addRole()
          break
        case "edit":
          this.editRole()
          break
      }
    },
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