<template>

  <div>
    <div v-if="item.disabled">
      <el-switch v-if="item.type==='switch'" v-model="m_prop[item.prop]" :disabled="true"></el-switch>
    </div>
    <div v-else>
      <el-switch v-if="item.type==='switch'" v-model="m_prop[item.prop]" :disabled="false"></el-switch>
    </div>
  </div>


</template>

<script>
export default {
  name: "m_switch",
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