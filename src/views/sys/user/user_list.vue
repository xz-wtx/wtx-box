<template>
  <div style="height: 100%;">

    <auth-table
        ref="search"
        :optionData.sync="option"
        @loadData="load">
      <template #view>
        <el-dialog title="用户信息" v-model="option.show_1">
          <User_edit @load="$refs.search.queryData_1()"></User_edit>
        </el-dialog>
      </template>
    </auth-table>


  </div>
</template>

<script>
import User_edit from "@/views/sys/user/user_edit";
export default {
  name: "user_list",
  components: {User_edit},
  data(){
    return{

      option: {
        //弹窗关闭（show_1，show_2。。。）
        show_1:false,
        //搜索
        searchList: {
          list:
              {
                shopNo:{placeholder:'请输入店铺编号',type:"input",title:'店铺编号',value:''},
                shopName:{placeholder:'请输入店铺名称',type:"input",title:'店铺名称',value:''}
              },

          func:[{title:"添加",funName:this.add,auth:"",icon:''}],
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
            label:'用户名',
            func:this.userName,//函数
            width:180,//宽度
            showOverflowTooltip: true,//提示
            hide: true//是否隐藏字段
          },
          {
            prop:'userPhone',
            label:'手机号',
            hide: true
          },
          {
            prop: "type",
            label: "类型",
            render(row) {//格式
              if (row.type == 0) {
                return '<div style="color:#ff0016">在线</div>'
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
        ],
        //操作栏宽度
        authButWidth:120,
        //操作
        authBut:[
          {name:"修改",func:this.editRow},//权限
          {name:"删除",func:this.delRow},
         // {name:"修改",func:this.editRow,authType:[2,3],field:"status",value:[3],account:"userAccount"},
        ],
        //列表数据
        data: [],
      },
    }
  },
  methods: {

    //查询
    load(data) {
      alert(JSON.stringify(data))
      this.option.data = [{type:1}];
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
      this.option.show_1=true;
    },
    //修改
    editRow(row){
      this.option.show_1=true;
      this.$nextTick(() => {
        this.$refs.agency.editRow(JSON.parse(JSON.stringify(row)));
      })
    },
    //删除
    delRow(row){

    },
    //行字段点击
    userName(row,but){

    }
  }
}
</script>

<style scoped>

</style>