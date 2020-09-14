<template>
  <div class="login">
    <div class="login_box">
      <div class="logo">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form class="form" :model="formmsg" :rules="rules" ref="ruleForm">
        <!-- 账号 -->
        <el-form-item prop="username">
          <el-input type="text" prefix-icon="el-icon-user" v-model="formmsg.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="el-icon-lock" v-model="formmsg.password"></el-input>
        </el-form-item>
        <el-form-item class="buts">
          <el-button @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formmsg: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          this.$message({
            message: '警告！输入格式错误！',
            type: 'warning'
          })
          return
        }
        const { data: res } = await this.$http.post('login', this.formmsg)
        if (res.meta.status === 200) {
          sessionStorage.setItem('token', res.data.token)
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success'
          })
          this.$router.push('/home')
          return
        }
        this.$message.error('错了哦，账号/密码错误')
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  .login_box {
    width: 450px;
    height: 350px;
    background-color: #ffffff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    box-shadow: 1px 1px 15px rgba(255, 255, 255, 0.5);
    .logo {
      width: 150px;
      height: 150px;
      background-color: #cccccc;
      overflow: hidden;
      border-radius: 50%;
      border: 8px solid #ffffff;
      box-shadow: 1px 1px 15px rgba(7, 7, 7, 0.5);
      position: absolute;
      top: -70px;
      left: 50%;
      transform: translate(-50%);
      img {
        width: 150px;
      }
    }
    .form {
      position: absolute;
      bottom: 0;
      box-sizing: border-box;
      width: 100%;
      padding: 0 30px;
      .buts {
        float: right;
      }
    }
  }
}
</style>
