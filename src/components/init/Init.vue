<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "comm",
  props:{
    defaultClear:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return{
    }
  },
  activated() {
    let obj=this.$store.getters.getClearData;
    console.log(obj)
   let newRouter= this.$parent.$route.path;
    if(obj.bool&&obj.path===newRouter){
      this.$emit("clearData")
      if(this.defaultClear){
        Object.assign(this.$parent.$data, this.$parent.$options.data())
      }
      /**
       * bool:false(是否清空数据)
       * path:''（清空数据的路由）
       */
      this.$store.dispatch('setClearData',{bool:false,path:''});
    }
  },
  methods:{



  }
}
</script>

<style scoped>

</style>