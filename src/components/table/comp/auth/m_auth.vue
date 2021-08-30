<template>
  <div style="display: flex">
    <div v-for="(but,index) in optionData.authBut"
         :key="index">
      <div  v-if="auth(but,scope)">
        <el-button
                   class="but_class_1"
                   @click="click(but,scope.row,but)"
                   type="text"
                   :icon="but.icon"
                   size="small">
          {{but.name}}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "m_auth",
  props:{
    optionData:{
      type: Object,
      default: () => {
        return {}
      }
    },
    scope:{
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods:{
    //按钮权限认证
    ButAuth(auth){
      return auth===undefined?true:this.$store.getters.getAuthButtonList.indexOf(auth)>-1
    },
    //登录人权限认证
    AccountAuth(account){
      return account!==undefined?account.indexOf(this.$store.getters.getUser.account)>-1:true
    },
    auth(but,scope){
      if(but.authType===undefined){
        return true;
      }

      let bool=true;
      if(but.authType.indexOf(1)>-1){
        //只判断是否有按钮权限
        bool =this.ButAuth(but.auth)
        if(!bool){
          return false;
        }
      }
      if (but.authType.indexOf(2)>-1){
        //只判断登录人和指定人是否相等权限
        bool =this.AccountAuth(scope.row[but.account])
        if(!bool){
          return false;
        }
      }
      if (but.authType.indexOf(3)>-1){
        //只判断指定值是包含指定类型字段的值
        bool= but.value.indexOf(scope.row[but.field])>-1
        if(!bool){
          return false;
        }
      }
      if (but.authType.indexOf(4)>-1){
        //判断指定值不包含指定类型字段的值
        bool= but.value.indexOf(scope.row[but.field])===-1
        if(!bool){
          return false;
        }
      }

      return bool;
    },

    //行操作自定义事件
    click(data, row,but) {
      this.$emit("handle",data, row,but)
    },
  }
}
</script>

<style scoped>

.but_class_1{
  margin-right: 6px;
}
</style>