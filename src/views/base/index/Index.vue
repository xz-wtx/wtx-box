<template>
    <el-container style="height: 100%">

      <!--移动端展开-->
      <div class="box" v-if="dialogShow&&!isCollapse" >
        <div id="dialog">
          <el-aside v-if="dialogShow&&!isCollapse" width="0px"  id="transition_width" class="transition_width">
            <n-menu :is-collapse="isCollapse" :menu-data-list="menuDataList" ></n-menu>
          </el-aside>
          <div style="height: 100%;flex: 1" @click="clickDialogShow(false)"></div>
        </div>
      </div>

      <!--移动端收起-->
      <el-aside v-if="!dialogShow&&isMobile" width="0px" style="transition:all 2s;">
        <n-menu :is-collapse="isCollapse" :menu-data-list="menuDataList" ></n-menu>
      </el-aside>

      <!--pc端收起-->
        <n-menu v-if="!dialogShow&&!isMobile" :is-collapse="isCollapse" :menu-data-list="menuDataList" ></n-menu>



      <el-container>
        <el-header style="height: 40px">
          <div class="header_i">
            <div style="margin-right: 20px;font-size: 23px">
              <i v-if="!isCollapse" class="el-icon-s-fold" @click="clickCollapse(true)"></i>
              <i v-if="isCollapse" class="el-icon-s-unfold" @click="clickCollapse(false)"></i>
            </div>
            <!--面包屑导航-->
          <breadcrumb :menuList="menuList"></breadcrumb>
           <setting></setting>
          </div>
          <el-divider style="margin:5px 0;"></el-divider>
          <!--tab标签-->
          <!--<n-tab></n-tab>-->
        </el-header>
        <el-main style="height:0;flex-grow:1;width: 100%">

           <div class="content_div" >
               <router-view v-slot="{ Component  }"  v-if="isRouterAlive" >
                 <keep-alive>
                   <component :is="Component"   v-show="$route.meta.keepAlive"/>
                 </keep-alive>
               </router-view>

               <router-view v-if="isRouterAlive&&!$route.meta.keepAlive" ></router-view>
             </div>


        </el-main>
      </el-container>
    </el-container>

</template>

<script>

import ResizeHandler from "@/components/menu/mixin/ResizeHandler";
export default {
  name: "Index",

  provide () {  // 在祖先组件中通过 provide 提供变量
    return {
      reload: this.reload, //  声明一个变量
    }
  },
  mixins: [ResizeHandler],
  data(){
    return{
      isCollapse:false,
      menuList:[],
      isRouterAlive:true,
      menuDataList:this.$store.getters.getMenuList,
      dialogShow:false,
      isMobile:false,
    }
  },
  created() {

  },
  mounted() {
    //需要把菜单一级显示
    this.getAllMenuList(this.$router.options.routes)
    window.removeTab=this.removeTab;
    window.addTab=this.addTab;
    this.addTab("数据汇总");
  },

  methods:{
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      })
    },

    /**
     * 关闭菜单
     **/
    clickCollapse(bool){
      this.isCollapse = bool;
      if(this.isMobile){
        this.dialogShow=true;
        this.$nextTick(() => {
          setTimeout(function () {
            document.getElementById("transition_width").style.width="200px";
          },10)
        })
      }
    },
    /**
     * 关闭弹框
     **/
    clickDialogShow(bool){
      this.isMobile=true;
        let _this=this;
        this.$nextTick(() => {
          document.getElementById("transition_width").style.width="0px";
          setTimeout(function () {
            _this.dialogShow=bool;
            _this.isCollapse = true;
          },300)
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

    removeTab(title){

      for (let i = 0; i < this.menuList.length; i++) {
        if(this.menuList[i].title===title){
          window.delTab(this.menuList[i].path)
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
    addTab(title,param={},bool=true){
      for (let i = 0; i < this.menuList.length; i++) {
        if(this.menuList[i].title===title){
          if(typeof window.newTab === "function"){
            window.newTab(this.menuList[i])
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

#dialog{
  display: flex;
  height: 100%;
}
.box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index:4000 ;
  background: rgba(0, 0, 0, 0.3);
}

.transition_width{
  transition: width .3s;
  -moz-transition: width .3s; /* Firefox 4 */
  -webkit-transition: width .3s; /* Safari 和 Chrome */
  -o-transition: width .3s; /* Opera */
}
.el-container .is-vertical{
  width: 0;
}

</style>