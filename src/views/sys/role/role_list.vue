<template>
  <init :default-clear="false">
    <auth-table
        ref="search"
        :optionData.sync="option"
        @loadData="load">
    </auth-table>

    <el-dialog title="添加/修改角色信息" v-model="option.showDialog">
      <role_edit ref="role_ref" @load="$refs.search.queryData()"></role_edit>
    </el-dialog>

  </init>
</template>

<script>
import role_edit from "@/views/sys/role/role_edit";
export default {
  name: "role_list",
  components: {role_edit},
  data(){
    return{

      option: {
        //弹窗关闭（showDialog，名称自定义，可以多个）
        showDialog:false,
        //搜索
        searchList: {
          list:
              {
                title:{placeholder:'请输入角色名称',type:"input",title:'角色名称',value:''},
              },

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
        table:[
          {
            prop:'title',
            label:'名称',
          },
          {
            prop:'createTime',
            label:'创建时间',
          },
        ],
        //操作栏宽度
        authButWidth:160,
        //操作
        authBut:[
          {name:"修改",func:this.rowEdit},
          {name:"删除",func:this.rowDel},
        ],
        //列表数据
        data: [],
      },
    }
  },
  methods: {

    //查询（查询条件直接带入{key:1,key:2}）
    load(data) {
      this.$api.roleApi.getRolePageList(data).then(res => {
        if (res.data.status == 200) {
          this.option.data = res.data.data.list;
          this.option.page.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    //新增
    add(){
      this.option.showDialog=true;
      this.$nextTick(() => {
        this.$refs.role_ref.editRow({});
      })
    },
    //修改
    rowEdit(row){
      this.option.showDialog=true;
      this.$nextTick(() => {
        this.$refs.role_ref.editRow(JSON.parse(JSON.stringify(row)));
      })
    },
    //删除
    rowDel(row){
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.userApi.delUser(row).then(res => {
          this.$message.error(res)
        })
      }).catch(()=>{})
    },

  }
}
</script>

<style scoped>

</style>