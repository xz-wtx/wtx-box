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
    alert(newRouter)
    if(obj.bool&&("/"+obj.path)===newRouter){
      this.$emit("clearData")
      if(this.defaultClear){
        Object.assign(this.$parent.$data, this.$parent.$options.data())
      }
      this.$store.dispatch('setClearData',{bool:false,path:''});
    }
  },
  methods:{



  }
}
</script>

<style scoped>

</style>