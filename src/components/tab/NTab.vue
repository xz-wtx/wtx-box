<template>
  <div>
    <el-tabs v-model="editableTabsValue" type="card"  @tab-remove="delTab" @tab-click="tabClick">
      <el-tab-pane
          v-for="(item) in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
          :closable="item.closable"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "NTab",
  data(){
    return{
      editableTabsValue: 'dashboard',
      editableTabs: [],
      tabIndex: 0

    }
  },
  mounted() {
    window.newTab=this.newTab
    window.delTab=this.delTab
  },
  methods: {

    newTab(obj) {
      for (let i = 0; i <this.editableTabs.length ; i++) {
        if(this.editableTabs[i].name===(obj.path)){
          this.editableTabsValue = obj.path;
          return;
        }
      }
        this.editableTabs.push({
          title: obj.title,
          name: obj.path,
          closable:obj.closable
        });
      this.editableTabsValue = obj.path;
    },
    delTab(targetName) {

      /**
       * 删除tab时重置
       * bool(是否清空数据)
       * path（清空数据的路由）
       */
      this.$store.dispatch('setClearData',{bool:true,path:targetName});

      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      this.$router.push(this.editableTabsValue)
    },
    tabClick(tab){
      this.$router.push(tab.props.name)
    }
  }
}
</script>

<style scoped>

</style>