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
            <el-link :href="apiDomain+'/doc/getDetail/'+content.id" target="_blank" type="primary">{{'http://webs.yr.dev.q1.com/doc/getDetail/'+content.id}}</el-link>
          </el-form-item>
          <el-form-item label="jsonp接口URL：">
            {{apiDomain+'/doc/getDetail/jsonp/'+content.id}}
          </el-form-item>
          <el-form-item label="文案管理项：">
            <el-tabs type="card">
              <el-tab-pane
                v-for="(item, index) in content.detail"
                :label="'文案'+index"
                v-bind:key="index"
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
import {getDataForId} from '@/api/doc'
export default {
  name: 'doc-edit',
  data () {
    return {
      content: {
        title: '',
        url: '',
        id: '',
        detail:{}
      },
      apiUrl: '',
      apiDomain:''
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
        this.apiUrl = 'http://webs.yr.dev.q1.com/doc/getDetail/' + this.content.id
      })
    }
  }
}
</script>

<style scoped>

</style>
