<template>
  <!--管理员-->
<init>
  adminList
  <input v-model="tiel">
  <el-button @click="test">跳转日志页面</el-button>
</init>
</template>

<script>
export default {
  name: "adminList",
  data(){
    return{
      tiel:''
    }
  },
  methods:{
    test(){
      window.addTab("管理员日志")
    }
  }
}
</script>

<style scoped>

</style>