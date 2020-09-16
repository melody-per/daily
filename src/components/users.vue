<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 搜索头部 -->
      <div class="search">
        <el-row>
          <el-col :span="14">
            <el-input
              placeholder="请输入内容"
              v-model="userInfo.query"
              class="input-with-select"
              clearable
              @clear="getUsersList"
            >
              <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" class="addbut">添加用户</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 用户列表 -->
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <!-- 开关 -->
            {{scope.row.mg_state}}
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <!-- 编辑-操作按钮 -->
            <el-tooltip class="item" effect="dark" content="修改用户" placement="top-start">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <!-- 设置角色-操作按钮 -->
            <el-tooltip class="item" effect="dark" content="设置用户角色" placement="top-start">
              <el-button type="warning" icon="el-icon-setting" circle></el-button>
            </el-tooltip>
            <!-- 删除-操作按钮 -->
            <el-tooltip class="item" effect="dark" content="删除用户" placement="top-start">
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[3, 6, 9, 12]"
          :page-size="usersList.length"
          :current-page="usersList.pagenum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  // 数据
  // 数据
  // 数据
  data () {
    return {
      usersList: [],
      userInfo: {
        query: '',
        pagenum: 1,
        pagesize: 3
      },
      total: 0
    }
  },
  // 方法
  // 方法
  // 方法
  methods: {
    // 获取用户数据
    async getUsersList () {
      const { data: res } = await this.$http.get('users', { params: this.userInfo })
      this.usersList = res.data.users
      this.total = res.data.total
    },
    // 每页显示条目个数
    handleSizeChange (newVal) {
      this.userInfo.pagesize = newVal
      this.getUsersList()
    },
    // 当前页码值
    handleCurrentChange (newVal) {
      this.userInfo.pagenum = newVal
      this.getUsersList()
    }
  },
  // 实例创建前
  // 实例创建前
  // 实例创建前
  created () {
    this.getUsersList()
  }
}
</script>

<style lang="less">
.box-card {
  .search {
    width: 50%;
    margin-bottom: 15px;
    .addbut {
      margin-left: 20px;
    }
  }
}
</style>
