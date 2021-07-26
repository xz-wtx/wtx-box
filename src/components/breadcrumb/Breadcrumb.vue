<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">

    <breadcrumb-item :data-list="dataList"></breadcrumb-item>

  </el-breadcrumb>
</template>

<script>

export default {
  name: "Breadcrumb",
  props:{
    menuList:{
      type:Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default:[]
    }
  },
  data(){
    return{
      dataList:[],
    }
  },

  mounted() {
    },
  created() {
    window.addBreadcrumb=this.addBreadcrumb
  },
  methods:{
    addBreadcrumb(obj){
      this.dataList=[];
      this.dataList.push(obj);
    },


  }
}
</script>

<style scoped>

</style>