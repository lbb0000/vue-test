<template>
    <div style="width:800px;">
        <el-form ref="form" :model="content"  label-width="150px">
           <el-form-item label="活动名称：">
             <el-input v-model="content.title"></el-input>
           </el-form-item>
          <el-form-item label="活动URL：">
            <el-input v-model="content.url"></el-input>
          </el-form-item>
          <el-form-item label="CORS接口URL：">
            <el-link :href="apiDomain+'/doc/getDetail/'+content.id" target="_blank" type="primary">{{apiDomain+'/doc/getDetail/'+content.id}}</el-link>
          </el-form-item>
          <el-form-item label="jsonp接口URL：">
            {{apiDomain+'/doc/getDetail/jsonp/'+content.id}}
          </el-form-item>
          <el-form-item label="文案管理项：">
            <el-tabs type="card"  v-model='editableTabsValue'  editable @edit="handleTabsEdit">
              <el-tab-pane
                :key="index"
                v-for="(item, index) in content.detail"
                :label="'文案'+index"
                :name='index.toString()'
              >
                <el-row>
                   <el-col>文案：</el-col>
                    <el-col>
                      <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="item.value">
                      </el-input>
                    </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3">示意图：</el-col>
                  <el-col :span="21">
                    <el-button type="primary" size="mini" @click="uploadImg(index)">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                    <input type="file" id="fileImg" @change="getFile"/>
                  </el-col>
                  <el-col :span="24">
                    <img v-if="item.hintImg" :src="apiDomain+'/images/doc/'+item.hintImg" alt="">
                  </el-col>
                </el-row>
                <el-row>
                  <el-button type="primary" @click="submitForm('content')">提交</el-button>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
import domain from '@/util/apiDomain'
import {getDataForId, uploadImg, modifData} from '@/api/doc'
export default {
  name: 'doc-edit',
  data () {
    return {
      content: {
        title: '',
        url: '',
        id: '',
        detail: []
      },
      apiUrl: '',
      apiDomain: '',
      imgIndex: '',
      editableTabsValue: '0',
      tabIndex: 0
    }
  },
  activated () {
    this.getData()
    this.apiDomain = domain
  },
  methods: {
    getData () {
      getDataForId(this.$route.params.id).then(res => {
        console.log(res.data)
        this.content = JSON.parse(JSON.stringify(res.data))
        this.apiUrl = 'http://webs.yr.dev.q1.com/api/doc/getDetail/' + this.content.id
        this.tabIndex = this.content.detail.length
        // this.editableTabsValue = (this.content.detail.length - 1).toString()
      })
    },
    submitForm () {
      modifData(this.content).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.$router.push({ path: '/doc/list' })
      })
    },
    uploadImg (index) {
      this.imgIndex = index
      console.log(this.imgIndex)
      document.getElementById('fileImg').click()
    },
    getFile (event) {
      let formData = new FormData()
      formData.append('file', event.target.files[0])
      event.target.value = ''
      uploadImg(formData).then(res => {
        if (!res.state) {
          this.$message({
            message: '图片上传失败',
            type: 'warning'
          })
          return false
        }
        this.content.detail[this.imgIndex].hintImg = res.fileName
        console.log(this.content)
      })
    },
    handleTabsEdit (targetName, action) {
      console.log(targetName)
      if (action === 'add') {
        let newTabName = ++this.tabIndex + ''
        this.content.detail.push({
          value: '输入文案',
          hintImg: ''
        })
        this.editableTabsValue = (parseInt(newTabName) - 1).toString()
        console.log(this.editableTabsValue)
      }
      if (action === 'remove') {
        let tabs = this.content.detail
        let activeName = this.editableTabsValue
        console.log(activeName)
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (index.toString() === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              console.log(nextTab)
              if (nextTab) {
                activeName = index.toString()
                console.log(activeName)
              }
            }
          })
        }

        this.editableTabsValue = activeName
        this.content.detail = tabs.filter((tab, index) => index.toString() !== targetName)
      }
    }
  }
}
</script>

<style scoped>
  #fileImg{display: none;}
  img{max-width:100%}
</style>
