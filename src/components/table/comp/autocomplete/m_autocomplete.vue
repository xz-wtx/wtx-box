<template>
  <el-autocomplete
      :style="{'width': (item.width-40)+'px'}"
      size="mini"
      v-if="item.type==='filterInput'"
      v-model="m_prop[item.prop+'FilterTitle']"
      value-key="title"
      :fetch-suggestions="((queryString,cb)=>{queryUnit(queryString,cb,item.url)})"
      placeholder="请输入内容"
      @select="((ite)=>{handleSelect(ite,scope.row,item.prop,item.alias)})"
  >
  </el-autocomplete>
</template>

<script>
export default {
  name: "m_autocomplete",
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
        return {}
      }
    }
  },
  data(){
    return{
      m_prop:this.scope,
    }
  },
  methods:{
    //远程搜索
    queryUnit(queryString, cb,url){
      let result=[];
      url({title:queryString}).then(res => {
        if (res.data.status==200) {
          result = res.data.data;
        }
        cb(result);
      }).catch(err=>{
        cb([]);
      })
    },
    //远程搜索选中
    handleSelect  (item,obj,name,alias) {
      obj[name]=item.value;
      if(alias!==undefined){
        obj[alias]=item.value;
        obj[alias+"value"]=item.value;
      }

    },
  }
}
</script>

<style scoped>

</style>