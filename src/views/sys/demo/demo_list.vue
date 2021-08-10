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
      <template #view>
        <el-dialog title="demo信息" v-model="option.showDialog">
          <demo_edit ref="demo" @load="$refs.search.queryData()"></demo_edit>
        </el-dialog>
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
        //弹窗关闭（showDialog，名称自定义，可以多个）
        showDialog:false,
        //搜索
        searchList: {
          list:
              {
                paramName1:
                    {
                      placeholder: '实时通知',//提示
                      title: '实时通知',//名称
                      type: "input",//类型input，select。。。。
                      value: '',//值
                      valueFun: this.realTimeShopNo,//值实时变化通知（可写可不写）
                      linkName: 'paramName?',//连接下一个参数（可写可不写）
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
                  showTitle:'address',//显示名称字段
                  showValue:'fff',//保存值字段
                },

              },//查询（返回结果例：{paramName1:'1',paramName2:'2'....}）

          func:[
              {
                title:"添加",//按钮名称
                funName:this.add,//事件
                auth:"",//按钮权限（可写可不写）
                icon:'',//图片（可写可不写）
              }
              ],
          //按钮布局是否跟在查询款后面
          butNewlineLayout:false,
        },
        //是否开启隐藏字段
        openFieldHide:true,
        //是否首次加
        load:true,
        //开启分页
        openPageLoad:true,
        //页大小默认10
        page:{
          currentPage:1,
          pageSize:10,
          total:0,
        },
        //是否开启多选
        openCheckbox:false,
        //多选框选中数据
        selectData:[],
        table:[
          {
            prop:'userName',
            label:'用户名',//标签
            func:this.userName,//函数
            width:180,//宽度
            showOverflowTooltip: true,//提示
            hide: true,//是否隐藏字段
            render(row) {//格式
              return  '<div style="color:#ff0016">'+row.userName+'</div>'
            }
          },
          {
            prop:'userPhone',
            label:'手机号',
          },
          {
            prop: "type",
            label: "类型",
            render(row) {//格式
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
          {
            prop:'amount',
            label:'转款金额',
            edit:true,//开启编辑
            editApply:"id",//id值存在就不可编辑
            type:'input',
          },
          // {
          //   prop:'companyName',
          //   label:'公司名称',
          //   edit:true,//开启编辑
          //   editApply:"id",//id值存在就不可编辑
          //   type:'filterInput',//远程搜索
          //   alias:"companyCode",
          //   url:this.$api.companyApi.companyNameList,//路径
          // },
          {
            prop:'abstractCode',
            label:'摘要',
            edit:true,//开启编辑
            editApply:"id",//id值存在就不可编辑
            type:'select',
            options:[{
              value: 'ZCZK',
              label: 'ZCZK'
            },{
              value: 'DZTZ',
              label: 'DZTZ'
            }]
          },
        ],
        //操作栏宽度
        authButWidth:160,
        //操作
        authBut:[
          {name:"修改",//行操作名称
            func:this.editRow,//事件
            authType:[3],//权限(查看components/comp/auth.vue)可修改扩展
            field:"type",
            value:[1]
          },
          {name:"删除",func:this.delRow},
        ],
        //列表数据
        data: [],
      },
    }
  },
  methods: {


    //如当前页面存在缓存，再次点击菜单重置额外数据
    clearData(){
    alert("重置数据")
    },

    //查询（查询条件直接带入{key:1,key:2}）
    load(data) {
      this.option.data = [{type:1},{type:2}];
      // this.$api.costShopConfigApi.getCostShopConfigList(data).then(res => {
      //   if (res.data.status == 200) {
      //     this.option.data = res.data.data.list;
      //     this.option.page.total = res.data.data.total;
      //   } else {
      //     this.$message.error(res.data.message)
      //   }
      // })
    },
    //新增
    add(){
      alert("新增")
      this.option.showDialog=true;
    },
    //修改
    editRow(row){
      alert("修改")
      this.option.showDialog=true;
      this.$nextTick(() => {
        this.$refs.user.editRow(JSON.parse(JSON.stringify(row)));
      })
    },
    //删除
    delRow(row){
      alert("删除")
    },
    //行字段点击
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