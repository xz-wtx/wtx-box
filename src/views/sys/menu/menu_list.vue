<template>
  <init :default-clear="false">
    <auth-table
        ref="search"
        :optionData.sync="option"
        @loadData="load">
    </auth-table>

    <el-dialog title="添加/修改菜单信息" v-model="option.showDialog">
      <menu_edit ref="menu_ref" @load="$refs.search.queryData()"></menu_edit>
    </el-dialog>

  </init>
</template>

<script>
import menu_edit from "@/views/sys/menu/menu_edit";
export default {
  name: "menu_list",
  components: {menu_edit},
  data(){
    return{

      option: {
        //弹窗关闭（showDialog，名称自定义，可以多个）
        showDialog:false,
        //搜索
        searchList: {
          list:
              {
                title:{placeholder:'请输入标题',type:"input",title:'标题',value:''},
                name:{placeholder:'请输入组件名称',type:"input",title:'组件名称',value:''},
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
            label:'标题',
            width:180,
            func:this.onTitle
          },
          {
            prop:'name',
            label:'组件名称',
            width:180,
            showOverflowTooltip:true
          },
          {
            prop:'component',
            label:'组件路径',
            width:270,
            showOverflowTooltip:true
          },
          {
            prop:'path',
            label:'url路径',
            width:230,
            showOverflowTooltip:true
          },
          {
            prop:'type',
            label:'类型',
            render(row) {//格式
              if (row.type == 0) {
                return '<div style="color:#ff0016" >一级页面</div>'
              }else if(row.type == 1){
                return '<div style="color: #0585d2">父级页面</div>'
              }else if(row.type == 2){
                return '<div style="color: #39de69">二级页面</div>'
              }else if(row.type == 3){
                return '<div style="color: #31804b">隐藏页面</div>'
              }else if(row.type == 4){
                return '<div style="color: #a6d205">按钮</div>'
              }
            },
          },
          {
            prop:'icon',
            label:'icon',
          },
          {
            prop:'closable',
            label:'可关闭',
            edit:true,
            type:'switch',
            disabled:true,
          },
          {
            prop:'keepAlive',
            label:'缓存',
            render(row) {
                if (row.keepAlive) {//不要使用二级对象
                  return '<div style="color:#ff0016" >缓存</div>'
                }else{
                  return '<div style="color: #0585d2">不缓存</div>'
                }
            }
          },
          {
            prop:'status',
            label:'状态',
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
      this.$api.menuApi.getMenuPageList(data).then(res => {
        if (res.data.status == 200) {
          this.option.data = res.data.data.list;
          if( this.option.data.length>0){
            this.option.data.forEach(p => {
              p.keepAlive=p.meta.keepAlive
            })
          }

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
        this.$refs.menu_ref.editRow({});
      })
    },
    //修改
    rowEdit(row){
      this.option.showDialog=true;
      this.$nextTick(() => {
        this.$refs.menu_ref.editRow(JSON.parse(JSON.stringify(row)));
      })
    },
    //删除
    rowDel(row){
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.menuApi.delMenu(row).then(res => {
          this.$message.error(res)
        })
      }).catch(()=>{})
    },

  }
}
</script>

<style scoped>

</style>