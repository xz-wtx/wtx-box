<template>
    <el-container style="height: 100%">

      <n-menu :is-collapse="isCollapse" :menu-data-list="menuDataList" ></n-menu>
      <el-container>
        <el-header style="height: 40px">
          <div class="header_i">
            <div style="margin-right: 20px;font-size: 23px">
              <i v-if="!isCollapse" class="el-icon-s-fold" @click="isCollapse=true"></i>
              <i v-if="isCollapse" class="el-icon-s-unfold" @click="isCollapse=false"></i>
            </div>
          <breadcrumb :menuList="menuList"></breadcrumb>
           <setting></setting>
          </div>
          <el-divider style="margin:5px 0;"></el-divider>
<!--          <n-tab></n-tab>-->
        </el-header>
        <el-main >
          <div class="content_div">
            <router-view v-slot="{ Component  }"  v-if="isRouterAlive">
              <keep-alive>
                <component  :is="Component"  />
              </keep-alive>
            </router-view>
          </div>

        </el-main>
      </el-container>
    </el-container>

</template>

<script>
import store from "@/store";

export default {
  name: "Index",
  provide () {  // 在祖先组件中通过 provide 提供变量
    return {
      reload: this.reload, //  声明一个变量
    }
  },
  data(){
    return{
      isCollapse:false,
      menuList:[],
      isRouterAlive:true,
      menuDataList:JSON.parse(this.$store.getters.getMenuList),
    }
  },
  created() {

  },
  mounted() {
    //需要把菜单一级显示
    this.getAllMenuList(this.$router.options.routes)
    let _this=this;
    window.findMenuByTitle=_this.findMenuByTitle;
    _this.findMenuByTitle("数据汇总");


  },

  methods:{
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      })
    },

    //获取全部菜单
    getAllMenuList(router){
      for (let i = 0; i < router.length; i++) {
        this.menuList.push(router[i])
        if(router[i].children!==undefined&&router[i].children.length>0){
          this.getAllMenuList(router[i].children)
        }
      }
    },
    //根据标题查询路由
    /**
     *
     * @param title 标题
     * @param param 参数
     * @param bool 是否跳转
     */
    findMenuByTitle(title,param={},bool=true){
      for (let i = 0; i < this.menuList.length; i++) {
        if(this.menuList[i].title===title){
          if(typeof window.addTab === "function"){
            window.addTab(this.menuList[i])
          }
          if(typeof window.addBreadcrumb === "function"){
            window.addBreadcrumb(this.menuList[i])
          }
          if(typeof window.addMenu === "function"){
            window.addMenu=this.menuList[i].path
          }

          if(bool){
            this.$router.push(
                {path:this.menuList[i].path,query:param}
            )
          }

          return
        }
      }
    }
  }
}
</script>

<style scoped>
.header_i{
  display: flex;
  align-items: center;
  margin-top: 10px
}
.content_div{
  height: 100%;
  background-color: #f5f6f9;
}
/deep/ .el-main {
  padding: 5px 0px 0px 0px;
}
</style>