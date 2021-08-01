<template>
    <div  class="auth_table">
        <CM_search :search-list="optionData.searchList" v-if="optionData.searchList!==undefined"></CM_search>

      <!--缩进10px-->
      <div style="padding-left: 10px">
        <slot name="slot_1" ></slot>
      </div>
      <!--不缩进-->
        <slot name="slot_2"></slot>

        <!--显示隐藏类型-->
        <el-drawer

                title="列显隐"
                v-model="drawer"
                size="50%"
                :with-header="false">
            <div style="margin-top: 50px;margin-left: 10%">
                <el-transfer
                        :titles="['隐藏列', '显示列']"
                        v-model="hideTitle"
                        :props="{
                          key: 'prop',
                          label: 'label'
                        }"
                        :data="optionData.table"/>
            </div>
        </el-drawer>



        <!--显示隐藏按钮-->
        <div style="display: flex">
            <div style="flex: 1;text-align: right;margin-right: 50px" v-if="optionData.showTitleBut">
                <el-tooltip content="显隐" placement="top" >
                    <i class="el-icon-s-operation" @click="drawer = true" ></i>
                </el-tooltip>
            </div>
        </div>

        <!--  常用一般table-->
        <el-table

                :height="optionData.height"
                v-if="showTitle.length>0"
                ref="multipleTable"
                :data="optionData.data"
                tooltip-effect="dark"
                class="tableCss"
                border
                stripe
                row-key="id"
                lazy
                :load="childrenLoad"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                @cell-click="optionData.cellClick"
                @cell-dblclick="optionData.cellDblclick"
                @row-click="optionData.rowClick"
                @row-contextmenu="optionData.rowContextmenu"
                @row-dblclick="optionData.rowDblclick"
                @selection-change="handleSelectionChange"
                :header-cell-style="cellStyle"
                 :cell-style="{padding:'5px 0'}">

          <el-table-column v-if="optionData.checkbox" type="selection">
            </el-table-column>
                <el-table-column
                        v-for="(item,index) in showTitle"
                        :key="index"
                        :prop="item.prop"
                        :label="item.label"
                        :show-overflow-tooltip="item.showOverflowTooltip"
                        :width="item.width===undefined?'':item.width"
                        :min-width="item.width===undefined?'':item.width"
                        :formatter="item.formatter">
                    <template #default="scope">
                      <el-tooltip class="item" effect="dark" :content="scope.row[item.prop]" placement="top-start" v-if="item.showOverflowTooltip" >
                        <span v-if="item.render" v-html="item.render(scope.row)" @click="handle(item,scope.row,scope.row[item.prop])"></span>
                        <span v-else @click="handle(item,scope.row,scope.row[item.prop])"> {{scope.row[item.prop]}} </span>
                      </el-tooltip>
                      <div v-else>
                        <span v-if="item.render" v-html="item.render(scope.row)" @click="handle(item,scope.row,scope.row[item.prop])"></span>
                        <span v-else @click="handle(item,scope.row,scope.row[item.prop])">
                              <span v-if="item.edit&&(item.editAudit!==undefined?(scope.row[item.editApply]===undefined?true:scope.row[item.editApply]!==scope.row[item.editAudit]):(item.editApply===undefined?true:scope.row[item.editApply]===undefined))">
                                <!--输入框-->
                                <el-input  size="mini" v-if="item.type==='input'" v-model="scope.row[item.prop]" :placeholder="item.placeholder"></el-input>
                                <!--下拉框-->
                                      <el-select  size="mini" v-if="item.type==='select'"  v-model="scope.row[item.prop]" :placeholder="item.placeholder">
                                        <el-option
                                        v-for="item in item.options===undefined?queryOptions(item,item.url):item.options "
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>



                                <!--远程搜索框-->
                                <el-autocomplete
                                    :style="{'width': (item.width-40)+'px'}"
                                    size="mini"
                                    v-if="item.type==='filterInput'"
                                    v-model="scope.row[item.prop+'FilterTitle']"
                                    value-key="title"
                                    :fetch-suggestions="((queryString,cb)=>{queryUnit(queryString,cb,item.url)})"
                                    placeholder="请输入内容"
                                    @select="((ite)=>{handleSelect(ite,scope.row,item.prop,item.alias)})"
                                    >
                                </el-autocomplete>


                          </span>

                          <span v-else> {{scope.row[item.prop]}}</span>
                        </span>
                      </div>
                    </template>
                </el-table-column>

            <el-table-column
                    v-if="optionData.authBut!==undefined&&Object.keys(optionData.authBut).length>0"
                    fixed="right"
                    label="操作"
                    :width="optionData.authButWidth===undefined?'200':optionData.authButWidth"
                    :min-width="optionData.authButWidth===undefined?'200':optionData.authButWidth"
                    >
                <template #default="scope" style="text-align: center">
                    <div  v-for="(but,index) in optionData.authBut"
                           :key="index" style="margin-left: 10px">
                        <el-button v-if="auth(but,scope)"
                                   @click="handle(but,scope.row,but)"
                                   type="text"
                                   :icon="but.icon"
                                   size="small">
                          {{but.name}}
                        </el-button>

                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <div class="block" v-if="optionData.pageLoad">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="optionData.page.currentPage"
                    :page-sizes="optionData.page.pageSizes"
                    :page-size="optionData.page.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="optionData.page.total">
            </el-pagination>
        </div>

      <slot name="view"></slot>

    </div>
</template>

<script>

    import CM_search from "../search/CM_search";
    export default {
        name: "CM-Table",
        components: {CM_search},
        props:{
            optionData:{
                //搜索和事件
                searchList:{
                    type: Array,
                    default:()=>{}
                },
                //弹窗关闭
                show_1:{
                    type:Boolean,
                    default :()=>false
                  },
                //弹窗关闭
                show_2:{
                  type:Boolean,
                  default :()=>false
                },
                //是否显示隐藏字段按钮
                showTitleBut:{
                    type:Boolean,
                    default :()=>false
                },
                //查询，搜索按钮布局
                butNewlineLayout:false,
                //是否首次加载
                load:{
                  type:Boolean,
                  default :()=>false
                },
                //分页加载数据
                pageLoad:{
                    type:Boolean,
                    default :()=>false
                },
                //分页
                page:{
                    pageSizes:{
                        type: Array,
                        default:()=>[10, 20, 30, 40]
                    },
                    currentPage:{
                        type: Number,
                        default:()=>0
                    },
                    pageSize:{
                        type: Number,
                        default:()=>10
                    },
                    total:{
                        type: Number,
                        default:()=>0
                    },
                },
                //操作栏宽度
                authButWidth:120,
                //按钮
                authBut:{
                  type:Array,
                  default:()=>[
                    // {func:Object, 方法名
                    // name:"",  名称
                    // auth:"",//权限
                    // icon:''},
                  ]
                },
                //开启多选框
                checkbox:{
                    type: Boolean,
                    default:()=>false
                },
                //多选框选中数据
                selectData:[],
                //表字段
                table:[{
                    type: Array,
                    default: () => []
                }],
                //表数据
                data:{
                    type: Array,
                    default: () => []
                },

            },

        },
        data(){
            return{
                currentPage:0,
                newOptionData:{},//保留当前Option数据

                drawer:false,
                showTitle: [],//
                hideTitle:[],

                mapUrlData:[],
                mapUrlList:[],

            }
        },

        watch:{
            //显示，隐藏字段
          hideTitle(value){
            let _this=this;
            let tables=this.optionData.table;
            _this.showTitle=[];
            setTimeout(function () {
              tables.forEach(function (data) {
                value.forEach(function (old) {
                  if(data.prop===old){
                    data.hide=true;
                    _this.showTitle.push(data);
                  }
                })
              })
            },100);
            },
        },

        methods: {
          //按钮权限认证
          ButAuth(auth){
            return auth===undefined?true:this.$store.getters.getAuthButtonList.indexOf(auth)>-1
          },
          //登录人权限认证
          AccountAuth(account){
            return account!==undefined?account.indexOf(this.$store.getters.getUser.account)>-1:true
          },
          auth(but,scope){
            if(but.type===undefined){
              return true;
            }

            let bool=true;
            if(but.type.indexOf(1)>-1){
              //只判断是否有按钮权限
              bool =this.ButAuth(but.auth)
              if(!bool){
                return false;
              }
            }
            if (but.type.indexOf(2)>-1){
              //只判断登录人和指定人是否相等权限
              bool =this.AccountAuth(scope.row[but.account])
              if(!bool){
                return false;
              }
            }
            if (but.type.indexOf(3)>-1){
              //只判断指定值是包含指定类型字段的值
              bool= but.showValue.indexOf(scope.row[but.showName])>-1
              if(!bool){
                return false;
              }
            }
            if (but.type.indexOf(4)>-1){
              //判断指定值不包含指定类型字段的值
              bool= but.showValue.indexOf(scope.row[but.showName])===-1
              if(!bool){
                return false;
              }
            }

            return bool;
          },

          //动态获取下拉框的值
          queryOptions(item,url){
            let tmp = url.toString();
            let re = /function\s*(\w*)/i;
            let matches = re.exec(tmp);//方法名
            let methodName=matches[1];

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
                this.mapUrlData.push({methodName:methodName,data:item.option})
                return item.option;
              })
            }
          },
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
            /**
             *条件查询数据
             **/
            queryData(){
              this.newOptionData=this.optionData;
              this.newOptionData.data=[];
              this.newOptionData.page.total=0;
              this.$emit('update:optionData',this.newOptionData)
                let page = {pageSizes:this.optionData.page.pageSizes,pageSize: this.optionData.page.pageSize,total:0,currentPage:1};
                const  assign= Object.assign(page,this.getSearchValue());
                this.$emit("load-data",assign);
            },
          /**
           *条件查询数据
           **/
          queryData_all(){
            this.newOptionData.show_1=false;
            this.newOptionData.show_2=false;
            this.queryData();
          },
            /**
             *条件查询数据
             **/
            queryData_1(){
              this.newOptionData.show_1=false;
              this.queryData();
            },
            /**
             *条件查询数据
             **/
            queryData_2(){
              this.newOptionData.show_2=false;
              this.queryData();
            },

            /**
             * 清空条件数据
             **/
            clearData(){

                let obj=this.optionData.searchList.list;
              for (let [key, value] of Object.entries(obj)) {
                if(value.disabled===undefined){
                  value.value=value.defaultValue!==undefined?value.defaultValue:'';
                }
                value.filterName=''
              }
              this.queryData()
                },

            //搜索框实时通知，通知参数有所改变（全部）
            realTime(){

              let page={pageSize: this.optionData.page.pageSize,total:this.optionData.page.total,currentPage:this.optionData.page.currentPage};
              const  assignData= Object.assign(page,this.getSearchValue());
              this.$emit("real-time",assignData);
            },

            //搜索事件(自定义)
            searchCustomize(data){
                let page={pageSize: this.optionData.page.pageSize,total:this.optionData.page.total,currentPage:this.optionData.page.currentPage};
                const  assignData= Object.assign(page,this.getSearchValue());
                //事件， 事件对象，查询和分页数据
               //this.$emit(data.funName,1data,assignData)
              if(data.funName!==undefined) {
                if (typeof data.funName === "function") {
                  data.funName(data, assignData)
                } else {
                  console.log("非函数")
                }
              }
            },

            //选中数据
            handleSelectionChange(val) {
              this.newOptionData=this.optionData;
              this.newOptionData.selectData=val;
              this.$emit('update:optionData',this.newOptionData)
              //this.$emit("box-select-data",val);
            },


            //行操作自定义事件
            handle(data, row,but) {
              if(data.func!==undefined) {
                if (typeof data.func === "function") {
                  data.func(row, but)
                } else {
                  console.log("非函数")
                }
              }
            },

            //子节点数据异步加载
            childrenLoad(tree, treeNode, resolve){
                this.$emit("children-load",tree, treeNode, resolve)
            },
            /**
             * 分页
             * @param val
             */
            handleSizeChange(val) {
              this.newOptionData=this.optionData;
              this.newOptionData.page.pageSize=val;
              this.$emit('update:optionData',this.newOptionData)
                let page={pageSizes:this.optionData.page.pageSizes,pageSize: this.newOptionData.page.pageSize,total: this.optionData.page.total,currentPage:1};
                this.$emit("page",page);
                let bool=this.optionData.pageLoad;

                if(bool){
                    let data=Object.assign(this.getSearchValue(),page);
                    this.$emit("load-data",data)
                }


            },
            handleCurrentChange(val) {

              if( this.currentPage===val){
                  return;
                }
              this.currentPage=val;
                let page={pageSizes:this.optionData.page.pageSizes,pageSize: this.optionData.page.pageSize,total:this.optionData.page.total,currentPage:val};
                this.$emit("page",page);
                let bool=this.optionData.pageLoad;
                if(bool){
                    let data=Object.assign(this.getSearchValue(),page);
                    this.$emit("load-data",data)
                }

            },

            //获取当前条件值
            getSearchValue(){
              let obj={};
              let searchList=this.optionData.searchList;
              if(searchList===undefined){
                return obj;
              }
              let list=searchList.list;
              if(list===undefined){
                return obj;
              }
              for (let [key, value] of Object.entries(list)) {
                //console.log(key + ':' + value.value);
                if(value.default!==undefined&&value.defaultValue===undefined){
                  value.defaultValue=value.value
                }
                if(value.value==null){
                  value.value=''
                }
                obj[key]=value.value;
              }
              return obj;
            },
            //隐藏字段
            showTitleEvent(){
                let _this=this;
                let tables=this.optionData.table;
                _this.showTitle=[];
                tables.forEach(function (data) {
                    if(data.hide){
                        _this.hideTitle.push(data.prop)
                    }else{
                      _this.showTitle.push(data);
                    }
                })
            },

            //标题样式
            cellStyle() {
                return {'background-color': '#fafafa', 'color': '#252525'}
            }

        },
        mounted() {
          this.showTitleEvent();
            let bool=this.optionData.load;
            if(bool){
              if(this.optionData.pageLoad){
                //page={pageSizes:this.optionData.page.pageSizes,pageSize: this.optionData.page.pageSize,total:0,currentPage:1};
                this.queryData()
              }else{
                let page={pageSizes:1,pageSize:100000,currentPage:1};
                this.$emit("load-data",page);
              }
            }
        }

    }
</script>

<style scoped>
.block{
    margin-top: 10px;
    float: right;
    padding-bottom: 20px;
}
    /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #5184ff;
        color: #FFFFFF;
    }

    .tableCss{
        width: 100%;
        margin-bottom: 20px;
        font-size: 11px ;

    }
    .item{
      cursor:pointer
    }
  /deep/ .el-table .cell, .el-table th>.cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
  padding-left: 10px;
  display: flex;
    /*justify-content: center;*/
}
.auth_table{
  height: 100%
}
 /deep/ .el-table__fixed-right{
  right:0px !important;
}
</style>
