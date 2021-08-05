<template>
  <el-select  size="mini" v-if="item.type==='select'"  v-model="m_prop[item.prop]" :placeholder="item.placeholder">
    <el-option
        v-for="obj in item.options===undefined?queryOptions(item,item.url):item.options "
        :key="obj.value"
        :label="obj.label"
        :value="obj.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "m_select",
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
      mapUrlList:[],
      mapUrlData:[],
    }
  },
  methods:{
    //动态获取下拉框的值
    queryOptions(item,url){
      let tmp = url.toString();
      let re = /function\s*(\w*)/i;
      let matches = re.exec(tmp);//方法名
      let methodName=matches[1];

      //从缓存结果找
      if(this.mapUrlList.indexOf(methodName)>-1){
        let mapUrlData= this.mapUrlData;
        for (const reKey in mapUrlData) {
          if(mapUrlData[reKey].methodName==methodName){
            return item.option;
          }
        }
      }else{
        //保存请求的url
        this.mapUrlList.push(methodName)
        url({}).then(res=>{
          item.option=res.data.data;
          //缓存结果
          this.mapUrlData.push({methodName:methodName,data:item.option})
          return item.option;
        })
      }
    },
  }
}
</script>

<style scoped>

</style>