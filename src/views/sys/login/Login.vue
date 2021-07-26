<template>
<div>
  登录中
</div>
</template>

<script>
import menuList from "@/assets/menuList";
import asyncRouter from "@/router/asyncRouter";
export default {
  name: "Login",
  mounted() {
    let _this=this;
   setTimeout(function () {
     _this.$router.push("/index")
     _this.$store.dispatch('setMenuList',JSON.stringify(menuList));
     asyncRouter.addRouter();
   },1000)
  }
}
</script>

<style scoped>

</style>