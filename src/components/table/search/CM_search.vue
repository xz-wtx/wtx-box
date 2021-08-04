<template>
    <div >
        <!--简单搜索-->
        <div class="List wrap">

            <div v-for="(obj,index) in searchList.list" :key="index" class="div1">

                  <span style="flex: 1;align-self: center;font-size: 13px"> {{obj.title}}：</span>
                    <span style="flex: 1">

                        <el-input class="width_1" size="mini" v-if="obj.type==='input'"
                                  :placeholder="obj.placeholder"
                                  :disabled="obj.disabled"
                                  v-model="obj.value"
                                  @input="realTime($event,obj)"
                                  :clearable="obj.clearable===undefined?true:obj.clearable">
                        </el-input>


                        <el-cascader class="width_1"
                                     size="mini"
                                     :disabled="obj.disabled"
                                     @change="realTime($event,obj)"
                                     :show-all-levels="obj.showAll"
                                     v-if="obj.type==='input_Linkage'"
                                     :placeholder="obj.placeholder"
                                     v-model="obj.value"
                                :options="obj.selectData"
                                     :clearable="obj.clearable===undefined?true:obj.clearable"
                                    filterable
                                ></el-cascader>

                        <el-date-picker
                                @change="realTime($event,obj)"
                                v-if="obj.type==='date'"
                                :disabled="obj.disabled"
                                class="width_1"
                                size="mini"
                                v-model="obj.value"
                                value-format="yyyy-MM-dd"
                                type="date"
                                :placeholder="obj.placeholder"
                                :clearable="obj.clearable===undefined?true:obj.clearable">
                        </el-date-picker>

                          <el-select
                                    :disabled="obj.disabled"
                                    filterable
                                    class="width_1"
                                    @change="realTime($event,obj)"
                                    size="mini"
                                    v-model="obj.value"
                                    :clearable="obj.clearable===undefined?true:obj.clearable"
                                    placeholder="请选择"
                                    v-if="obj.type==='select'">
                            <el-option
                                    v-for="item in obj.selectData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                      <el-autocomplete
                          @input="realTime($event,obj)"
                          class="width_1"
                          size="mini"
                          v-if="obj.type==='filterInput'"
                          v-model="obj.filterName"
                          value-key="title"
                          :clearable="obj.clearable===undefined?true:obj.clearable"
                          :fetch-suggestions="((queryString,cb)=>{queryUnit(queryString,cb,obj)})"
                          placeholder="请输入内容"
                          @select="((item)=>{handleSelect(item,obj)})"
                      >
                      </el-autocomplete>
                    </span>
                </div>

              <div style="text-align: inherit;align-self: center;" v-if="searchList.butNewlineLayout!==undefined&&!searchList.butNewlineLayout">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="queryData()">搜索</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini"  @click="clearData()">清空</el-button>
                <span v-for="(func,index) in searchList.func" :key="index" style="margin-left: 10px">
                   <el-button v-if="func.auth===''||func.auth==null||$store.getters.getAuthButtonList.indexOf(func.auth)>-1"  type="primary" @click="funClick(func)" :icon="func.icon" size="mini">{{func.title}}</el-button>
                </span>
              </div>

            <div v-for="(index) in (Object.keys(searchList.list).length<3?2:0)" :key="index"></div>

        </div>

        <div style="margin-left: 10px;margin-bottom: 10px;margin-top: 10px" v-if="searchList.butNewlineLayout===undefined||searchList.butNewlineLayout">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="queryData()">搜索</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"  @click="clearData()">清空</el-button>
            <span v-for="(func,index) in searchList.func" :key="index" style="margin-left: 10px">
               <el-button v-if="func.auth===''||func.auth==null||$store.getters.getAuthButtonList.indexOf(func.auth)>-1"  type="primary" @click="funClick(func)" :icon="func.icon" size="mini">{{func.title}}</el-button>
            </span>
        </div>

    </div>
</template>

<script>
    export default {
        name: "CM_search",
        props:{

            searchList:{
                type: Object,
                default:()=>{}
            },
        },
        data(){
            return{
              oldData:{},
            }
        },
        methods:{
          //远程搜索
          queryUnit(queryString, cb,obj){
           let result=[];
            obj.value = "";
            obj.url({title:queryString}).then(res => {
              if (res.data.status==200) {
                result = res.data.data;
              }
             cb(result);
            }).catch(err=>{
             cb([]);
           })
          },
          //远程搜索选中
          handleSelect  (item,obj) {
            obj.value=item.value;
          },

            //自定义事件
            funClick(data){
                 this.$parent.searchCustomize(data);
            },
            //查询
            queryData(){
                this.$parent.queryData();
            },
            //清空
            clearData(){
                this.$parent.clearData();
            },

          //输入值改变时通知(实时)
          realTime(value,obj){
              //通知参数有所改变（全部）
              this.$parent.realTime();
              //单个通知
              if(value===undefined||value===null){
                value='';
              }
            let linkObjList={};
            if(obj.valueFun!==undefined&&obj.valueFun!==''&&obj.valueFun!==null){
              if(typeof obj.valueFun==="function"){
                let linkObj=obj.linkName;
                if(linkObj!==undefined){
                  let list=this.searchList.list;
                  obj.valueFun(value,obj,list[linkObj]);
                  return
                }
                  obj.valueFun(value,obj);
              }
            }
          }
        },

    }
</script>

<style scoped>
    .wrap{
      display: grid;
      grid-gap: 1px;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      padding-bottom: 10px;
      padding-top: 10px;
      /*grid-template-rows: repeat(1, 30px);*/
    }

    .div1{
      margin: 5px;
      font-size: 15px;
    }
   /deep/ .width_1{
      width: 200px;
    }
</style>
