<template>
  <div >
    个人信息
    <input v-model="userName">
    <init :default-clear="false" @clearData="clearData"></init>
  </div>
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
    }
  }
}
</script>

<style scoped>

</style>