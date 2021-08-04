<template>
  <init>
    个人信息
    <input v-model="userName">
    <el-button @click="removeTab">关闭</el-button>
    222
  </init>
</template>

<script>
export default {
  name: "personal_details",
  data(){
    return{
      userName:""
    }
  },
  activated() {

  },
  methods:{
    clearData(){
      console.log("111")
    },
    removeTab(){
      window.removeTab("个人信息")
    }
  }
}
</script>

<style scoped>

</style>