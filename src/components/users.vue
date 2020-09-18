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
            <!-- 添加用户按钮 -->
            <el-button type="primary" class="addbut" @click="dialogVisible = true">添加用户</el-button>
            <!-- 添加用户弹对话框dialog -->
            <el-dialog
              title="添加用户"
              :visible.sync="dialogVisible"
              width="40%"
              :before-close="handleClose"
            >
              <el-form :model="addUserInfo" :rules="rules" ref="addUserInfo" label-width="80px">
                <!-- 添加用户名 -->
                <el-form-item prop="username" label="用户名">
                  <el-input type="text" prefix-icon="el-icon-user" v-model="addUserInfo.username"></el-input>
                </el-form-item>
                <!-- 添加用户密码 -->
                <el-form-item prop="password" label="密码">
                  <el-input
                    type="password"
                    prefix-icon="el-icon-lock"
                    v-model="addUserInfo.password"
                  ></el-input>
                </el-form-item>
                <!-- 添加用户邮箱 -->
                <el-form-item prop="email" label="邮箱">
                  <el-input
                    type="text"
                    prefix-icon="el-icon-s-promotion"
                    v-model="addUserInfo.email"
                  ></el-input>
                </el-form-item>
                <!-- 添加用户手机 -->
                <el-form-item prop="mobile" label="手机">
                  <el-input
                    type="text"
                    prefix-icon="el-icon-phone-outline"
                    v-model="addUserInfo.mobile"
                  ></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button type="primary" @click="addUser('addUserInfo')">确 定</el-button>
              </span>
            </el-dialog>
          </el-col>
        </el-row>
      </div>
      <!-- 用户列表 -->
      <el-table :data="usersList" border style="width: 100%" v-loading="loading">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <!-- 开关 -->
            <el-switch v-model="scope.row.mg_state" @change="showUserState(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <!-- 编辑-操作按钮 -->
            <el-tooltip class="item" effect="dark" content="修改用户" placement="top-start">
              <el-button type="primary" icon="el-icon-edit" circle @click="repairBtm(scope.row)"></el-button>
            </el-tooltip>
            <!-- 设置角色-操作按钮 -->
            <el-tooltip class="item" effect="dark" content="设置用户角色" placement="top-start">
              <el-button type="warning" icon="el-icon-setting" circle @click="roleBtm(scope.row)"></el-button>
            </el-tooltip>
            <!-- 删除-操作按钮 -->
            <el-tooltip class="item" effect="dark" content="删除用户" placement="top-start">
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteBtm(scope.row)"></el-button>
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
          :page-size="usersList.pagesize"
          :current-page="usersList.pagenum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <!-- 修改用户弹出对话框 -->
      <el-dialog
        title="编辑用户"
        :visible.sync="repairDialogVisible"
        width="40%"
        :before-close="handleClose"
      >
        <el-form :model="repairUserInfo" :rules="rules" ref="addUserInfo" label-width="80px">
          <!-- 修改用户名 -->
          <el-form-item prop="username" label="用户名">
            <el-input
              type="text"
              disabled
              prefix-icon="el-icon-user"
              v-model="repairUserInfo.username"
            ></el-input>
          </el-form-item>
          <!-- 修改用户邮箱 -->
          <el-form-item prop="email" label="邮箱">
            <el-input type="text" prefix-icon="el-icon-s-promotion" v-model="repairUserInfo.email"></el-input>
          </el-form-item>
          <!-- 修改用户手机 -->
          <el-form-item prop="mobile" label="手机">
            <el-input
              type="text"
              prefix-icon="el-icon-phone-outline"
              v-model="repairUserInfo.mobile"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm">取 消</el-button>
          <el-button type="primary" @click="repairUser(repairUserInfo)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 设置用户角色弹出对话框 -->
      <el-dialog
        title="设置用户角色"
        :visible.sync="RoleDialogVisible"
        width="25%"
        :before-close="handleClose"
      >
        <el-form :model="roleRepair" :rules="rules" label-width="100px" ref="addUserInfo">
          <!-- 修改用户角色 -->
          <el-form-item label="角色">
            <el-select v-model="roleRepair.role_name" placeholder="请选择角色">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :value="item.id"
                :label="item.roleName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm">取 消</el-button>
          <el-button type="primary" @click="roleUser(roleRepair)">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  // 数据
  // 数据
  // 数据
  data () {
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      roleRepair: {},
      usersList: [],
      roleList: [],
      userInfo: {
        query: '',
        pagenum: 1,
        pagesize: 3
      },
      total: 0,
      loading: true,
      dialogVisible: false,
      repairDialogVisible: false,
      RoleDialogVisible: false,
      addUserInfo: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      repairUserInfo: {},
      // 添加用户的表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  // 方法
  // 方法
  // 方法
  methods: {
    // 获取用户数据
    async getUsersList () {
      const { data: res } = await this.$http.get('users', { params: this.userInfo })
      if (res.meta.status !== 200) {
        this.loading = true
        return
      }
      this.usersList = res.data.users
      this.total = res.data.total
      this.loading = false
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
    },
    // 添加用户弹出对话框,确认按钮事件
    addUser () {
      // this.dialogVisible = false
      this.$refs.addUserInfo.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('请填写完整信息')
        }
        const { data: res } = await this.$http.post('users', this.addUserInfo)
        if (res.meta.status !== 201) {
          return this.$message.error('添加用户失败')
        }
        this.getUsersList()
        this.$message.success('添加用户成功')
        this.dialogVisible = false
      })
    },
    // 添加用户弹出对话框,取消按钮事件
    resetForm (formName) {
      this.dialogVisible = false
      this.repairDialogVisible = false
      this.RoleDialogVisible = false
      this.$refs.addUserInfo.resetFields()
      // this.$refs.repairUserInfo.resetFields()
    },
    // 关闭添加用户的对话框？
    handleClose (done) {
      console.log(done)
      this.$confirm('确认关闭添加用户的对话框？')
        .then(_ => {
          done()
          this.$refs.addUserInfo.resetFields()
        })
        .catch(_ => {})
    },
    // 设置用户状态showUserState
    async showUserState (state) {
      const { data: res } = await this.$http.put(`users/${state.id}/state/${state.mg_state}`)
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('更改用户状态失败!')
      }
      this.$message.success('更改用户状态成功!')
      this.getUsersList()
    },
    // 点击修改用户信息按钮事件
    repairBtm (state) {
      this.repairDialogVisible = true
      this.repairUserInfo = state
    },
    // 确认修改用户信息
    async repairUser (repair) {
      const { data: res } = await this.$http.put('users/' + repair.id, { email: repair.email, mobile: repair.mobile })
      if (res.meta.status !== 200) {
        return this.$message.error('修改用户信息失败!')
      }
      this.repairDialogVisible = false
      this.$message.success('修改用户信息成功!')
      this.getUsersList()
    },
    // 点击设置角色按钮
    async roleBtm (role) {
      this.roleRepair = role
      console.log(this.roleRepair)
      this.RoleDialogVisible = true
      const { data: res } = await this.$http.get('roles')
      console.log(res.data)
      this.roleList = res.data
    },
    // 点击设置角色确定的按钮
    async roleUser (k) {
      console.log(k.id, k.role_name)
      const { data: res } = await this.$http.put(`users/${k.id}/role`, { rid: k.role_name })
      if (res.meta.status !== 200) {
        k.role_name = ''
        return this.$message.error('修改用户信息失败!')
      }
      this.$message.success('修改用户信息成功!')
      this.RoleDialogVisible = false
      this.getUsersList()
    },
    // 点击删除按钮
    async deleteBtm (del) {
      console.log(del)
      const { data: res } = await this.$http.delete('users/' + del.id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败!')
      }
      this.$message.success('删除成功!')
      this.getUsersList()
    }

  },
  // 实例创建前
  // 实例创建前
  // 实例创建前
  created () {
    this.getUsersList()
    this.loading = true
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
