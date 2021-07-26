<template>
<div style="display: flex">
    <template v-if="dataList[0]!==undefined">
      <el-breadcrumb-item  v-for="(data,index) in dataList[0].superList" :to="{ path: data.path }" :key="index">{{data.title}}</el-breadcrumb-item>
    </template>
  <el-breadcrumb-item v-for="(data,index) in dataList"  :key="index">{{data.title}}</el-breadcrumb-item>

</div>
</template>

<script>
export default {
  name: "BreadcrumbItem",
  props:{
    dataList:{
      type:Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default:[]
    }
  },

}
</script>

<style scoped>

</style>