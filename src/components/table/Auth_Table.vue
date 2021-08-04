<template>
    <div  class="auth_table">
        <CM_search :search-list="optionData.searchList" v-if="optionData.searchList!==undefined"></CM_search>

        <!--占位-->
        <slot class="slot_div" name="slot"></slot>

        <!--显示隐藏类型-->
      <m_transfer :option-data="optionData"  ref="transfer"></m_transfer>

        <!--  常用一般table-->
        <el-table
                v-if="optionData.table.length>0"
                :height="optionData.height"
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

          <el-table-column v-if="optionData.openCheckbox" type="selection">
            </el-table-column>
                <el-table-column
                        v-for="(item,index) in (optionData.table.filter(t=>!t.hide))"
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
                                <m_input :scope="scope.row"  :item="item" ></m_input>
                                <!--下拉框-->
                                <m_select  :scope="scope.row" :item="item" ></m_select>
                                <!--远程搜索框-->
                                <m_autocomplete :scope="scope.row" :item="item"  ></m_autocomplete>
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
                  <m_auth :scope="scope" @handle="handle" :option-data="optionData"></m_auth>
                </template>

            </el-table-column>
        </el-table>

        <!--分页-->
        <div class="block" v-if="optionData.openPageLoad">
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

    import CM_search from "./search/CM_search";
    import m_input from "@/components/table/comp/input/m_input";
    import m_select from "@/components/table/comp/select/m_select";
    import m_autocomplete from "@/components/table/comp/autocomplete/m_autocomplete";
    import m_auth from "@/components/table/comp/auth/m_auth";
    import m_transfer from "@/components/table/comp/transfer/m_transfer";
    export default {
        name: "CM-Table",
        components: {m_transfer, m_auth, m_autocomplete, m_select, m_input, CM_search},
        props:{
            optionData:{
                //搜索和事件
                searchList:{type: Array,default:()=>{} },
                //弹窗关闭
                show_1:{ type:Boolean, default :()=>false },
                //弹窗关闭
                show_2:{ type:Boolean,default :()=>false},
                //是否显示隐藏字段按钮
                openFieldHide:{type:Boolean,default :()=>false},
                //查询，搜索按钮布局
                butNewlineLayout:false,
                //是否首次加载
                load:{ type:Boolean, default :()=>false },
                //分页加载数据
                openPageLoad:{ type:Boolean,default :()=>false},
                //分页
                page:{pageSizes:{ type: Array, default:()=>[10, 20, 30, 40] },
                    currentPage:{type: Number,default:()=>0},
                    pageSize:{type: Number, default:()=>10},
                    total:{type: Number, default:()=>0 }},
                //操作栏宽度
                authButWidth:120,
                //按钮
                authBut:{ type:Array, default:()=>[]
                },
                //开启多选框
                openCheckbox:{type: Boolean, default:()=>false },
                //多选框选中数据
                selectData:[],
                //表字段
                table:[{ type: Array,default: () => []}],
                //表数据
                data:{type: Array,default: () => [] },
            },

        },
        data(){
            return{
                currentPage:0,
                newOptionData:{},//保留当前Option数据
            }
        },

        methods: {
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
            },


            //行操作自定义事件
            handle(data, row,but) {
              alert("2131")
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
                let bool=this.optionData.openPageLoad;

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
                let bool=this.optionData.openPageLoad;
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

            //标题样式
            cellStyle() {
                return {'background-color': '#fafafa', 'color': '#252525'}
            }

        },
        mounted() {
          this.$nextTick(() => {
            this.$refs.transfer.showTitleEvent();
          });
            let bool=this.optionData.load;
            if(bool){
              if(this.optionData.openPageLoad){
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
