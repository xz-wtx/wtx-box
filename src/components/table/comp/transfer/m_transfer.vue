<template>
  <div>
    <!--显示隐藏类型-->
    <el-drawer
        title="列显隐"
        v-model="drawer"
        size="50%"
        :with-header="false">
      <div style="margin-top: 50px;margin-left: 10%">
        <el-transfer
            :titles="['显示列', '隐藏列']"
            v-model="hideTitle"
            :props="{
                     key: 'prop',
                     label: 'label'
                        }"
            :data="optionData.table"/>
      </div>
    </el-drawer>
    <!--显示隐藏按钮-->
    <div style="display: flex">
      <div style="flex: 1;text-align: right;margin-right: 50px" v-if="optionData.openFieldHide">
        <el-tooltip content="显隐" placement="top" >
          <i class="el-icon-s-operation" @click="drawer = true" ></i>
        </el-tooltip>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "m_transfer",
  props:{
    optionData:{
      type: Array,
      default: () => {
        return []
      }
    },

  },
  data(){
    return{
      drawer:false,
      hideTitle:[],

    }
  },
  watch:{
    //显示，隐藏字段
    hideTitle(value){

      let _this=this;
      let tables=this.optionData.table;
      setTimeout(function () {
        tables.forEach(function (data) {
          data.hide=false;
          value.forEach(function (old) {
            if(data.prop===old){
              data.hide=true;
            }
          })
        })
      },100);
    },
  },
  methods:{
    //隐藏字段
    showTitleEvent(){
      let _this=this;
      let tables=this.optionData.table;
      tables.forEach(function (data) {
        if(data.hide){
          _this.hideTitle.push(data.prop)
        }
      })
    },
  }
}
</script>

<style scoped>

</style>