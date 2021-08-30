<template>
  <!--
   default-clear:如当前页面存在缓存，再次点击菜单是否重置data值（可选，默认重置）
    @clearData：如当前页面存在缓存，再次点击菜单重置额外数据(可选)例
  -->
  <init :default-clear="false"
        @clearData="clearData">
    <auth-table
        ref="search"
        :optionData.sync="option"
        @loadData="load">
      <!--自定义搜索框，在原本搜索框前-->
      <template #search_front>
        <div>
          <span>{{option.searchList.list.paramName0.title}}:</span>
          <input v-model="option.searchList.list.paramName0.value">
        </div>
      </template>
      <!--自定义搜索框，在原本搜索框后-->
      <template #search_later>
        <div>
          <span>{{option.searchList.list.paramName0.title}}:</span>
          <input v-model="option.searchList.list.paramName0.value">
        </div>
      </template>

      <!--弹窗-->
      <template #view>
        <el-dialog title="demo信息" v-model="option.showDialog">
          <demo_edit ref="demo" @load="$refs.search.queryData()"></demo_edit>
        </el-dialog>
      </template>

      <!--自定义单元格编辑-->
      <template #userPhone="slotProps">
        <el-input v-model="slotProps.row.userPhone"></el-input>
      </template>
      <!--自定义单元格编辑-->
      <template #abstractCode="slotProps">
        <el-select v-model="slotProps.row.abstractCode">
          <el-option
              v-for="item in slotProps.item.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </template>



    </auth-table>
  </init>
</template>

<script>
import demo_edit from "@/views/sys/demo/demo_edit";
export default {
  name: "demo_list",
  components: {demo_edit},
  data(){
    return{

      option: {
        //TODO 弹窗关闭（showDialog，名称自定义，可以多个）
        showDialog:false,
        //TODO 搜索
        searchList: {
          list:
              {
                paramName0:{
                  placeholder:'input',
                  type:"input",
                  hide:true, //TODO 隐藏,模板重写
                  title:'input',
                  value:''
                },
                paramName1:
                    {
                      placeholder: '实时通知',//TODO 提示
                      title: '实时通知',//TODO 名称
                      type: "input",//TODO 类型input，select。。。。
                      value: '',//TODO 值
                      valueFun: this.realTimeShopNo,//TODO 值实时变化通知（可写可不写）
                      linkName: 'paramName?',//TODO 连接下一个参数（可写可不写）
                    },
                paramName2:{placeholder:'input',type:"input",title:'input',value:''},

                paramName3:{placeholder:'下拉选择',type:"select",title:'下拉选择',
                            value:'',options:{ data: [],value:"shopNo", label:'shopName'}},

                paramName4:{placeholder:'年月日',type:"date",title:'年月日',value:''},

                paramName5:{placeholder:'年月日时分秒',type:"datetime",title:'年月日时分秒',value:''},

                paramName6:{
                  placeholder:'远程搜索',
                  type:"filterInput",
                  title:'远程搜索',
                  value:'',
                  showTitle:'address',//TODO 显示名称字段
                  showValue:'fff',//TODO 保存值字段
                },

              },//TODO 查询（返回结果例：{paramName1:'1',paramName2:'2'....}）

          func:[
              {
                title:"添加",//TODO 按钮名称
                funName:this.add,//TODO 事件
                auth:"",//TODO 按钮权限（可写可不写）
                icon:'',//TODO 图片（可写可不写）
              },
            {
              title:"导出",//TODO 按钮名称
              funName:this.export,//TODO 事件
              auth:"",//TODO 按钮权限（可写可不写）
              icon:'',//TODO 图片（可写可不写）
            }
              ],
          //TODO 按钮布局是否跟在查询款后面
          butNewlineLayout:false,
        },
        //TODO 是否开启隐藏字段
        openFieldHide:true,
        //TODO 是否首次加
        load:true,
        //TODO 开启分页
        openPageLoad:true,
        //TODO 页大小默认10
        page:{
          currentPage:1,
          pageSize:10,
          total:0,
        },
        //TODO 是否开启多选
        openCheckbox:false,
        //TODO 多选框选中数据
        selectData:[],
        table:[
          {
            prop:'userName',
            label:'用户名',//TODO  标签
            func:this.userName,//TODO  函数
            width:180,//TODO  宽度
            showOverflowTooltip: true,//TODO  提示
            hide: true,//TODO  是否隐藏字段
            render(row) {//TODO  格式,不要使用二级对象
              return  '<div style="color:#ff0016">'+row.userName+'</div>'
            }
          },
          {
            prop:'userPhone',
            label:'手机号',
            openEdit:true,//TODO 双击可编辑
          },
          {
            prop: "type",
            label: "类型",
            render(row) {//TODO   格式,不要使用二级对象
              if (row.type == 0) {
                return '<div style="color:#ff0016" >在线</div>'
              }else {
                return '<div style="color: #0585d2">不在线</div>'
              }
            },

          },
          {
            prop:'remark',
            label:'备注',
            width:120,
          },
          {
            prop:'createTime',
            label:'创建时间',
            render(row){
              let date=new Date(row.createTime);
              return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            }
          },


            //TODO 动态操作
          {
            prop:'abstractCode',
            label:'摘要',
            openEdit:true,//TODO 双击可编辑
            options:[{
              value: '22',
              label: 'ZCZK'
            },{
              value: '11',
              label: 'DZTZ'
            }],
            render(row){
              return "ZCZK";
            }
          },
        ],
        //TODO 操作栏宽度
        authButWidth:160,
        //TODO 操作
        authBut:[
          {name:"修改",//TODO 行操作名称
            func:this.editRow,//TODO 事件
            authType:[3],//TODO 权限(查看components/comp/auth.vue)可修改扩展
            field:"type",
            value:[1]
          },
          {name:"删除",func:this.delRow},
        ],
        //TODO 列表数据
        data: [],
      },
    }
  },
  methods: {


    //TODO 如当前页面存在缓存，再次点击菜单重置额外数据
    clearData(){
    alert("重置数据")
    },

    //TODO 查询（查询条件直接带入{key:1,key:2}）
    load(data) {
      this.option.data = [{userPhone:123,type:1,abstractCode:'11'},{userPhone:456,type:2,abstractCode:'22'}];
      //TODO  this.$api.costShopConfigApi.getCostShopConfigList(data).then(res => {
      //TODO    if (res.data.status == 200) {
      //TODO      this.option.data = res.data.data.list;
      //TODO      this.option.page.total = res.data.data.total;
      //TODO    } else {
      //TODO      this.$message.error(res.data.message)
      //TODO    }
      //TODO  })
    },
    //TODO 新增
    add(){
      alert("新增")
      this.option.showDialog=true;
    },
    export(){
      alert("导出")
     let param=this.$refs.search.getSearchValue();//获取组装参数
      alert(JSON.stringify(param))
    },
    //TODO 修改
    editRow(row){
      alert("修改")
      this.option.showDialog=true;
      this.$nextTick(() => {
        this.$refs.user.editRow(JSON.parse(JSON.stringify(row)));
      })
    },
    //TODO 删除
    delRow(row){
      alert("删除")
    },
    //TODO 行字段点击
    userName(row,but){
      alert("行字段点击")
    },

    /**
     * 实时通知
     * @param value 值
     * @param obj 当前对象
     * @param linkName 链接对象
     */
    realTimeShopNo(value,obj,linkName){
      alert(value)
      linkName.value=234
    }
  }
}
</script>

<style scoped>

</style>