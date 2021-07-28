<template #tree>

      <el-row class="tac" >
        <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            router
            :unique-opened="true"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409eff"
            :collapse="isCollapse">
          <div style="display: flex;padding-top:30px;justify-content: center;" >
            <img src="../../assets/logo.png" width="25">
            <span style="color: white;font-size: 20px;"><span v-if="!isCollapse">XX科技</span></span>
          </div>
          <tree-menu :dataList="menuDataList" class="child-item"></tree-menu>
        </el-menu>
      </el-row>


  </template>

<script>

export default {
  name: "Menu",
  props:{
    isCollapse:{
      type:Boolean,
      default:true
    },
    menuDataList:{
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  data() {
    return {
      defaultActive:'',
    };
  },
  created() {
    window.addMenu=this.addMenu
  },
  methods: {
    addMenu(defaultActive){
      this.defaultActive=defaultActive;
    }
  },
  watch:{
    $route: {
      handler: function (route) {
        if(route.path.length>1){
          this.defaultActive=route.path.toString().substring(1,route.path.toString().length)
        }else{
          this.defaultActive=route.path;
        }

      },
      immediate: true
    },
  }
}
</script>

<style scoped>

.tac{
  height: 100%;
  overflow-x: hidden;

}
/* 定义滚动条样式 */
.tac::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: rgba(240, 240, 240, 1);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}
 ::v-deep .el-menu--collapse {
    width: 42px;
}

.child-item .el-menu-item{
  background-color: #1F2D3D!important;
}
.child-item .el-menu-item:hover{
  background-color: #001528!important;
}
.child-item .el-submenu__title{
  background-color: #1F2D3D!important;
}
.child-item .el-submenu__title:hover{
  background-color: #001528!important;
}
</style>