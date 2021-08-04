<template>
  <div style="flex: 1;text-align: end;">

    <el-dropdown trigger="click"  @command="handleCommand">
                <span class="el-dropdown-link">
                admin<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="a">个人信息</el-dropdown-item>
          <el-dropdown-item command="b">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

</template>

<script>
export default {
  name: "setting",
  methods: {
    handleCommand(command) {
      if (command==='a'){
        window.addTab("个人信息")
      }
      if(command==='b'){
        location.href="/"
      }

    }
  }
}
</script>

<style scoped>

</style>