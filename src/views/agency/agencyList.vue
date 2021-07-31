<template>
  <!--中介管理-->
  <div style="height: 100%;">

    <auth-table
        ref="search"
        :optionData.sync="option"
        @loadData="load">
    </auth-table>

    <el-dialog title="中介信息" v-model="dialogFormVisible">
      <agency-edit ref="agency" @load="editAddLoad"></agency-edit>
    </el-dialog>
  </div>
</template>

<script>
import AgencyEdit from "@/views/agency/agencyEdit";
export default {
  name: "agencyList",
  components: {AgencyEdit},
  data(){
    return{
      dialogFormVisible:false,
      option: {
        //搜索
        searchList: {
          list:
              {
                shopNo:{placeholder:'请输入店铺编号',type:"input",title:'店铺编号',value:''},
                shopName:{placeholder:'请输入店铺名称',type:"input",title:'店铺名称',value:''}
              },

          func:[{title:"添加",funName:this.addAgency,auth:"",icon:''}],
          butNewlineLayout:false,
        },
        //是否首次加
        load:true,
        pageLoad:true,
        //页大小默认10
        page:{
          currentPage:1,
          pageSize:10,
          total:0,
        },
        checkbox:false,
        //多选框选中数据
        selectData:[],
        table:[
          {
            prop:'shopNo',
            label:'店铺编号',
            width:70,
            func:this.rowsShopNo
          },
          {
            prop:'shopName',
            label:'店铺名称',
            width:180
          },
          {
            prop: "type",
            label: "类型",
            render(row) {
              if (row.type == 0) {
                return '<div style="color:#ff0016">机器人</div>'
              }else {
                return '<div style="color: #0585d2">应用</div>'
              }
            }
          },

          {
            prop: "cronTime",
            label: "时间配置"
          },
          {
            prop: "messageType",
            label: "消息类型"
          },
          {
            prop:'address',
            label:'发送地址',
            showOverflowTooltip: true,
          },
          {
            prop:'limitTime',
            label:'时间限制',
            width:70,
          },
          {
            prop:'earlyWarn',
            label:'预警值',
            width:60,
          },
          {
            prop:'status',
            label:'状态',
            width:50,
            render(row) {
              if (row.status == 0) {
                return '<div style="color:#ff0016">不可用</div>'
              }else {
                return '<div style="color: #0585d2">可用</div>'
              }
            }
          },
          {
            prop:'remark',
            label:'备注',
            width:120,
            showOverflowTooltip: true,
          },
          {
            prop:'createTime',
            label:'创建时间',
            render(row){
              console.log(row)
              let date=new Date(row.createTime);
              return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            }
          },
        ],
        // authButWidth:120,
        // authBut:[
        //   {name:"修改",func:this.editRow},
        //   {name:"删除",func:this.delRow},
        // ],
        //列表数据
        data: [],
      },
    }
  },
  methods: {
    //editAddLoad 修改添加刷新
    editAddLoad() {
      this.dialogFormVisible=false;
      this.option.data = [];
      //重新查询数据
      this.$refs.search.queryData();
    },
    //查询
    load(data) {
      this.option.data = [];
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
    addAgency(){
      this.dialogFormVisible=true;
    },
    //修改
    editRow(row){
      this.dialogFormVisible=true;
      this.$nextTick(() => {
        this.$refs.agency.editRow(JSON.parse(JSON.stringify(row)));
      })
    },
    //行字段点击
    rowsShopNo(row,but){

    }
  }
}
</script>

<style scoped>

</style>