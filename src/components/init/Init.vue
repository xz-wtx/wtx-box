<template>
  <div class="init_c">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "init",
  props:{
    //默认清空（菜单点击，tab删除时清空）,false菜单点击，tab删除时都不清空
    defaultClear:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return{
    }
  },
  //缓存触发
  activated() {
    this.rClearData();
  },
  methods:{

    rClearData(){

      let obj=this.$store.getters.getClearData;//获取当前路由数据是否清空（tab点击不清空，菜单点击清空）
      let newRouter= this.$parent.$route.path;
      console.log(obj,newRouter)
      //判断当前路由是否需要清空，
      if(obj.bool&&obj.path===newRouter){
        this.$emit("clearData")//清空调用事件
        if(this.defaultClear){
          if(typeof this.$parent.$options.data === "function"){
            Object.assign(this.$parent.$data, this.$parent.$options.data.call(this.$parent));
          }
        }
        /**
         * bool:false(是否清空数据,默认false)
         * path:''（清空数据的路由）
         */
        //清空还原
        this.$store.dispatch('setClearData',{bool:false,path:''});
      }
    }

  }
}
</script>

<style scoped>
.init_c{
  height: 100%;
}
</style>