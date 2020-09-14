<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div class="search">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="邮箱" prop="name"></el-table-column>
        <el-table-column label="电话" prop="name"></el-table-column>
        <el-table-column label="角色" prop="name"></el-table-column>
        <el-table-column label="状态">
          <template>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.box-card {
  .search {
    width: 50%;
    margin-bottom: 15px;
  }
}
</style>
