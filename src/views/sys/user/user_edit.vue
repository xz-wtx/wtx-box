<template>
  <div>
    <el-form :model="form"  :rules="rules" ref="userForm"  label-position="left" label-width="80px" class="demo-ruleForm">
      <div  class="container">
        <el-form-item label="中介联系人" prop="cronTime" >
          <el-input v-model="form.cronTime"  placeholder="请输入中介联系人"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="cronTime" >
          <el-input v-model="form.cronTime"  placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="所属公司">
          <el-input v-model="form.cronTime"  placeholder="请输入所属公司"></el-input>
        </el-form-item>
        <el-form-item label="佣金政策" >
          <el-input v-model="form.cronTime"  placeholder="请输入中介来源"></el-input>
        </el-form-item>
        <el-form-item label="中介来源" >
          <el-input v-model="form.cronTime"  placeholder="请输入中介来源"> </el-input>
        </el-form-item>
        <el-form-item label="业务范围"  >
          <el-input v-model="form.cronTime" placeholder="请输入业务范围"></el-input>
        </el-form-item>
        <el-form-item label="备注" style="grid-column: span 2" >
          <el-input v-model="form.remark"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    style="width: 100%"
                    placeholder="请输入备注"></el-input>
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
  name: "user_edit",
  data(){
    return{
      form:{},
      rules:{
        cronTime:[{ required: true, message: '不能为空', trigger: 'blur' }],
      },
    }
  },
  methods: {
    editRow(row) {
      let _this = this;
      _this.form = row;

    },
    submitForm() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          this.$api.costShopConfigApi.saveCostShopConfig(this.form).then(res=>{
            console.log(res)
            if(res.data.status==200){
              this.$message.success(res.data.message);
              this.$emit("load");
            }else{
              this.$message.error(res.data.message);
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs['userForm'].resetFields();
    },
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/table";
</style>