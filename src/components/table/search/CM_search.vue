<template>
    <div >

        <!--简单搜索-->
        <div class="List wrap">

            <div v-for="(obj,index) in searchList.list" :key="index" class="div1">

                  <span class="div1_title"> {{obj.title}}：</span>
                    <span class="div1_content">

                        <el-input class="width_1" size="mini" v-if="obj.type==='input'"
                                  :placeholder="obj.placeholder"
                                  :disabled="obj.disabled"
                                  v-model="obj.value"
                                  @input="realTime($event,obj)"
                                  :clearable="obj.clearable===undefined?true:obj.clearable">
                        </el-input>


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
                          <el-date-picker
                              @change="realTime($event,obj)"
                              v-if="obj.type==='datetime'"
                              :disabled="obj.disabled"
                              class="width_1"
                              size="mini"
                              v-model="obj.value"
                              value-format="YYYY-MM-DD HH:mm:ss"
                              type="datetime"
                              :placeholder="obj.placeholder"
                              :clearable="obj.clearable===undefined?true:obj.clearable">
                            </el-date-picker>

                          <el-select
                                    v-if="obj.type==='select'"
                                    :disabled="obj.disabled"
                                    filterable
                                    class="width_1"
                                    @change="realTime($event,obj)"
                                    size="mini"
                                    v-model="obj.value"
                                    :clearable="obj.clearable===undefined?true:obj.clearable"
                                    :placeholder="obj.placeholder">
                             <el-option
                                 v-for="item in obj.options.data"
                                 :key="item[obj.options.value]"
                                 :label="item[obj.options.label]"
                                 :value="item[obj.options.value]">
                                </el-option>
                        </el-select>

                      <el-autocomplete
                          v-if="obj.type==='filterInput'"
                          @input="realTime($event,obj)"
                          class="width_1"
                          size="mini"
                          v-model="obj.value1"
                          :value-key="obj.showTitle"
                          :clearable="obj.clearable===undefined?true:obj.clearable"
                          :fetch-suggestions="((queryString,cb)=>{queryUnit(queryString,cb,obj)})"
                          :placeholder="obj.placeholder"
                          @select="((item)=>{handleSelect(item,obj)})"
                      >
                      </el-autocomplete>
                    </span>
                </div>

              <div class="div1_but_0" v-if="searchList.butNewlineLayout!==undefined&&!searchList.butNewlineLayout">
                <el-button class="but1" type="primary" icon="el-icon-search" size="mini" @click="queryData()">搜索</el-button>
                <el-button class="but2" type="danger" icon="el-icon-delete" size="mini"  @click="clearData()">清空</el-button>
                <span v-for="(func,index) in searchList.func" :key="index" style="margin-left: 10px">
                   <el-button class="but3" v-if="func.auth===''||func.auth==null||$store.getters.getAuthButtonList.indexOf(func.auth)>-1"  type="primary" @click="funClick(func)" :icon="func.icon" size="mini">{{func.title}}</el-button>
                </span>
              </div>

        </div>

        <div class="div1_but_1" v-if="searchList.butNewlineLayout===undefined||searchList.butNewlineLayout">
            <el-button class="_ut1" type="primary" icon="el-icon-search" size="mini" @click="queryData()">搜索</el-button>
            <el-button class="but2" type="danger" icon="el-icon-delete" size="mini"  @click="clearData()">清空</el-button>
            <span v-for="(func,index) in searchList.func" :key="index" style="margin-left: 10px">
               <el-button class="but3" v-if="func.auth===''||func.auth==null||$store.getters.getAuthButtonList.indexOf(func.auth)>-1"  type="primary" @click="funClick(func)" :icon="func.icon" size="mini">{{func.title}}</el-button>
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
            obj.url({search:queryString}).then(res => {
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
            obj.value=item[obj.showValue];
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
      display: flex;
      flex-wrap: wrap;
      /*justify-content: space-between;*/
      padding-bottom: 10px;
      padding-top: 10px;
    }

    .div1{
      padding-left: 20px;
      margin: 5px;
    }
    .div1 .div1_title{
      flex: 1;
      align-self: center;
      font-size: 12px
    }
    .div1 .div1_content{
      flex: 1;
    }
     .div1_but_0{
      text-align: inherit;
      align-self: center;
      margin-left: 25px;
    }
    .div1_but_1{
      margin-left: 25px;
      margin-bottom: 5px;
      margin-top: 5px
    }
    .but1{

    }
    .but2{

    }
    .but3{

    }
   /deep/ .width_1{
      width: 200px;
    }
</style>
