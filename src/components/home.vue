<template>
  <el-container class="container_home">
    <el-header>
      <div class="left" to="/home">
        <img src="../assets/59190eb9254959758a986239.gif" alt />
        <span>某🐎电商管理后台</span>
      </div>
      <el-button type="info" @click="loginout">退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    loginout () {
      sessionStorage.clear('token')
      this.$router.push('login')
    }
  }
}
</script>

<style lang="less">
.container_home {
  width: 100%;
  height: 100%;
  .el-header {
    padding-left: 0;
    background-color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      cursor: pointer;
      font-size: 25px;
      line-height: 60px;
      display: flex;
      color: #ffffff;
      img {
        height: 60px;
        margin-right: 30px;
      }
    }
  }
  .el-aside {
    background-color: #343434;
  }
}
</style>
