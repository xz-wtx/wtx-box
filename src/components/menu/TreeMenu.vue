<template>
  <div>
    <div v-for="(data,index) in dataList" :key="index">

      <el-submenu :index="data.path" v-if="data.type===1" >
        <template #title >
          <svg-icon :iconClass="data.icon" class-name="" style="margin-right: 10px" v-if="data.icon!==undefined"/>
          <span>{{ data.title }} </span>
        </template>
        <el-menu-item  @click="selectMenu(child)" :index="child.path" v-for="(child,index) in data.children" :key="index">
          <template #title >
            <svg-icon :iconClass="child.icon" class-name="" style="margin-right: 10px" v-if="child.icon!==undefined"/>
            <span>{{ child.title }}</span>
          </template>
        </el-menu-item>
      </el-submenu>

      <el-menu-item :index="data.path" v-if="data.type===0" @click="selectMenu(data)" >

        <svg-icon :iconClass="data.icon" class-name="" style="margin-right: 10px" v-if="data.icon!==undefined"/>
        <template #title >{{ data.title }}</template>
      </el-menu-item>
    </div>
  </div>

</template>

<script>
export default {
  name: "TreeMenu",
  inject:['reload'],
  props:{
    dataList:{
      type:Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default:[],
    }
  },
  methods:{
    selectMenu(obj){
      //添加标签
      if(typeof window.addTab === "function"){
        window.addTab(obj)
      }
      //添加面包碎屑
      if(typeof window.addBreadcrumb === "function"){
        window.addBreadcrumb(obj)
      }
      this.$store.dispatch('setClearData',{bool:true,path:obj.path});
    }
  }
}
</script>

<style scoped>

.child-item .el-menu-item:hover{
  background-color: #404c55 !important;
}
li ul li.el-menu-item{
  background-color: #000000 !important;
}
</style>