<template>
  <div>
    <el-form  label-position="left" label-width="80px" class="demo-ruleForm">
      <div >
        <el-form-item label="标题">
          <el-input v-model="rowData.roleName" size="mini" autocomplete="off"  ></el-input>
        </el-form-item>

        <el-form-item label="权限">
          <el-tree
              :data="treeData"
              show-checkbox
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps">
          </el-tree>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "role_edit",
  data(){
    return{

      rowData:{},
      treeData:[],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
    }
  },
  created() {
    this.getTreeList();
  },
  methods:{
    editRow(row){
      this.rowData=row;
      this.$refs.tree.setCheckedNodes([]);

      if(row.id!==undefined){
        this.$api.roleApi.getRole({id:row.id}).then(res=>{
          if(res.data.status!==200){
            this.$message.error(res.data.message)
            return;
          }
          this.$nextTick(() => {
            this.$refs.tree.setCheckedNodes(res.data.data.menuList);
          });
        })
      }

    },
    submitForm() {
      let chkIds = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()) ;
      console.log(chkIds)
      if(this.rowData.roleName===undefined||this.rowData.roleName===''){
        this.$message.error("角色标题不能为空");
        return false;
      }
      if(this.rowData.id===undefined){
        this.$api.roleApi.addRole({roleName:this.rowData.roleName,menuList:chkIds}).then(res=>{
          this.success(res)
        })
      }else{
        this.$api.roleApi.editRole({id:this.rowData.id,roleName:this.rowData.roleName,menuList:chkIds}).then(res=>{
          this.success(res)
        })
      }
    },

    //
    success(res){
      if(res.data.code===200){
        this.$message.success(res.data.msg);
        this.$emit("load");
      }else{
        this.$message.error(res.data.msg);
      }
    },

    getTreeList(){
      this.$api.menuApi.getMenuTreeList({}).then(res=>{
        this.treeData=res.data.data
      })
    },
  }
}
</script>

<style scoped>
/deep/ .el-tree {
  height: 260px;
  overflow: auto;
}
</style>