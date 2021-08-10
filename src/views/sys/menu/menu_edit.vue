<template>
  <div>
    <el-form :model="form"  :rules="rules" ref="form"  label-position="left" label-width="80px" class="demo-ruleForm">
      <div  class="container">
        <el-form-item label="用户名称" prop="userName" >
          <el-input v-model="form.userName"  placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone" >
          <el-input v-model="form.phone"  placeholder="请输入联系电话"></el-input>
        </el-form-item>

      </div>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="mini" @click="submitForm()">提交</el-button>
        <el-button size="mini" @click="resetForm()" :disabled="form.id!==undefined">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "menu_edit",
  data(){
    return{
      form:{},
      rules:{
        userName:[{ required: true, message: '不能为空', trigger: 'blur' }],
        phone:[{ required: true, message: '不能为空', trigger: 'blur' }],
      },
    }
  },
  methods: {
    editRow(row) {
      this.form = row;
    },
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if(this.form.id!==undefined) {
            this.$api.menuApi.addMenu(this.form).then(res => {
              this.message(res)
            })
          }else{
            this.$api.menuApi.editMenu(this.form).then(res => {
              this.message(res)
            })
          }
        } else {
          return false;
        }
      });
    },

    //操作提示
    message(res){
      if (res.data.status == 200) {
        this.$message.success(res.data.message);
        this.$emit("load");
      } else {
        this.$message.error(res.data.message);
      }
    },

    resetForm() {
      this.$refs['form'].resetFields();
    },
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/table";
</style>