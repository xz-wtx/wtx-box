<template>
  <div>
    abc---{{abc}}初始化
    <input v-model="abc">
    <init></init>
  </div>
</template>

<script>
export default {
  name: "abc",

  data(){
    return{
      abc:"",

    }
  },

}
</script>

<style scoped>

</style>