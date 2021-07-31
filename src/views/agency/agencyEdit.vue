<template>
  <div>我是新增</div>
</template>

<script>
export default {
  name: "agencyEdit",
  data(){
    return{
      form:{}
    }
  },
  methods:{
    editRow(row) {
      this.form = row;
    },
    submitForm() {
          // this.$api.costShopConfigApi.saveCostShopConfig(this.form).then(res=>{
          //   console.log(res)
          //   if(res.data.status==200){
          //     this.$message.success(res.data.message);
              this.$emit("load");
          //   }else{
          //     this.$message.error(res.data.message);
          //   }
          // })

    },

  }
}
</script>

<style scoped>

</style>