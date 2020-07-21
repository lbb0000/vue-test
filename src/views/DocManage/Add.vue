<template>
  <el-form :model="formData" ref="ruleForm" label-width="100px">
    <el-form-item label="标题">
      <el-input v-model="formData.title" placeholder="请输入标题" maxlength="50"></el-input>
    </el-form-item>
    <el-form-item label="活动URL">
      <el-input v-model="formData.url" placeholder="请输入活动URL" maxlength="200"></el-input>
    </el-form-item>
    <el-row class="btn">
      <el-button type="primary" @click="addData">添加</el-button>
    </el-row>
  </el-form>
</template>

<script>
import {addDoc} from '@/api/doc'
export default {
  name: "doc-add",
  data () {
    return {
      formData:{
        title: '',
        url: '',
        projectId:1
      }
    }
  },
  methods: {
    addData () {
      addDoc (this.formData).then(res =>{
        if (res.state) {
          this.$message({
            message:'添加成功',
            type: 'success'
          })
          this.$emit('flush')
        }
      } )
    }
  }
}
</script>

<style scoped>

</style>
