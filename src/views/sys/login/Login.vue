<template>
<div>
  登录中
</div>
</template>

<script>
import menuList from "@/assets/menuList";
import store from "@/store";
export default {
  name: "Login",
  mounted() {
    let _this=this;
   setTimeout(function () {
     _this.$store.dispatch('setMenuList',JSON.stringify(menuList));
   },1000)
  }
}
</script>

<style scoped>

</style>