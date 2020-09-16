<template>
  <el-container class="container_home">
    <el-header>
      <div class="left">
        <img src="../assets/59190eb9254959758a986239.gif" alt />
        <span>某🐎电商管理后台</span>
      </div>
      <el-button type="info" @click="loginout">退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'60px':'200px'" collapse>
        <div @click="isCollapse = !isCollapse">| | |</div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          unique-opened
          router
          :default-active="cunSon"
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <el-submenu v-for="(item,index) in getMenusList" :key="item.id" :index="index+''">
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="'/'+itemSon.path"
              v-for="itemSon in item.children"
              :key="itemSon.id"
              @click="cunSontoken('/'+itemSon.path)"
            >
              <span class="el-icon-menu"></span>
              {{itemSon.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      getMenusList: [],
      iconList: {
        125: 'el-icon-s-custom',
        103: 'el-icon-s-check',
        101: 'el-icon-s-shop',
        102: 'el-icon-s-claim',
        145: 'el-icon-s-data'
      },
      cunSon: '',
      isCollapse: false
    }
  },
  methods: {
    loginout () {
      sessionStorage.clear()
      this.$router.push('login')
    },
    async getMenus () {
      const { data: res } = await this.$http.get('menus')
      this.getMenusList = res.data
    },
    cunSontoken (path) {
      sessionStorage.setItem('cunSon', path)
    }
  },
  created () {
    this.getMenus()
    this.cunSon = sessionStorage.getItem('cunSon')
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
    border: 0px;
    > div {
      text-align: center;
      color: #ffffff;
      font-size: 20px;
      cursor: pointer;
    }
    .el-menu {
      border: 0px;
    }
  }
}
.el-main {
  background-color: #e8e8e8;
}
</style>
