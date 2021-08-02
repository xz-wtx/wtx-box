<template>
  <el-input  size="mini" v-if="item.type==='input'" v-model="m_prop[item.prop]" :placeholder="item.placeholder"></el-input>
</template>

<script>
export default {
  name: "m_input",
  props:{
    item:{
      type: Object,
      default: () => {
        return {}
      }
    },
    scope:{
      type: Object,
      default: () => {
        return  {}
      }
    },
  },

  data(){
    return{
      m_prop:this.scope,
    }
  }

}
</script>

<style scoped>

</style>