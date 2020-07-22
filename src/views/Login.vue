<template>
  <div class="bg">
    <div style="width:400px;margin:0 auto;">
      <el-row>
        <h1>网站管理系统</h1>
      </el-row>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-form-item label="账号" prop="userName">
              <el-input v-model.number="ruleForm.userName"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
          </el-row>
        </el-form>
    </div>
  </div>
</template>

<script>
import {login} from '@/api/user'
import {setCookie} from '@/util/cookies'
import {crypPassword} from '@/util/crypText'
export default {
  name: 'login',
  data () {
    return {
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.password = crypPassword(this.ruleForm.password)
          login(this.ruleForm).then(res => {
            if (!res.state) {
              this.$message({
                message: '用户密码错误',
                type: 'warning'
              })
              return false
            }
            setCookie('login_token', res.token, res.cookieExp)
            setCookie('userName', res.userName, res.cookieExp)
            this.$store.commit('setName', res)
            this.$router.push({name: 'home-index'})
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .bg{
    display: flex;
    width: 100%;
    height:100%;
    justify-content: center;
    align-items:center;
  }
  h1{text-align: center;margin-bottom:40px;}
</style>
