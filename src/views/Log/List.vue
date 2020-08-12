<template>
     <div>
         <el-card>
           <el-form ref='queryForm' :model='queryData' :inline='true'>
             <el-form-item prop='user'>
                <el-input v-model="queryData.user" placeholder="请输入用户名" ></el-input>
             </el-form-item>
             <el-form-item prop='url'>
                <el-input v-model="queryData.url" placeholder="请输入请求url" ></el-input>
             </el-form-item>
             <el-form-item prop='type'>
                <el-select v-model="queryData.type">
                  <el-option label='全部请求类型' value=''></el-option>
                  <el-option label='GET' value='GET'></el-option>
                  <el-option label='POST' value='POST'></el-option>
                  <el-option label='PUT' value='PUT'></el-option>
                  <el-option label='DELETE' value='DELETE'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop='prop'>
                <el-date-picker
                  @change="chooseDate"
                  v-model="createTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" @click="handleQuery">查询</el-button>
            </el-form-item>
           </el-form>
         </el-card>
         <el-card>
            <el-table
              v-loading="loading"
              :data="result"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0.8)"
               border
            >
            <el-table-column
              prop="user"
              label="用户名"
              >
            </el-table-column>
             <el-table-column
              prop="request_type"
              label="请求类型"
              >
            </el-table-column>
             <el-table-column
              prop="request_url"
              label="请求url"
              >
            </el-table-column>
             <el-table-column
              prop="content"
              label="请求内容"
              >
                <template slot-scope="scope">
                  <el-tooltip :content="scope.row.content" placement="bottom" class='tooltipWidth'>
                    <span class="contentCut">{{scope.row.content}}</span>
                  </el-tooltip>
                </template>
            </el-table-column>
             <el-table-column
              prop="result"
              label="请求结果"
              >
            </el-table-column>
             <el-table-column
              label="请求时间"
              >
              <template slot-scope="scope">{{scope.row.createTime | formatDate}}</template>

            </el-table-column>

             </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryData.pageIndex"
                :page-size="queryData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
         </el-card>
     </div>
</template>

<script>
import {getList} from '@/api/log'
import { format, simpleFormat } from '@/util/date'
export default {
  name: 'log-list',
  data () {
    return {
      queryData: {
        user: '',
        type: '',
        url: '',
        startTime: '',
        endTime: '',
        pageIndex: 1,
        pageSize: 10
      },
      createTime: '',
      result: [],
      total: 0,
      loading: false
    }
  },
  created () {
    this.getList()
  },
  activated () {
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      getList(this.queryData)
        .then(res => {
          this.result = res.data
          this.total = res.total
          this.loading = false
        })
    },
    // 选择时间
    chooseDate () {
      this.queryData.startTime = this.createTime[0] ? format(this.createTime[0], 'YYYY-MM-DD 00:00:00') : ''
      this.queryData.endTime = this.createTime[1] ? format(this.createTime[1], 'YYYY-MM-DD 00:00:00') : ''
    },
    handleQuery () {
      this.getList()
    },
    handleSizeChange (val) {
      this.queryData.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.queryData.pageIndex = val
      this.getList()
    }
  },
  filters: {
    formatDate (value) {
      return simpleFormat(value)
    }
  }

}
</script>

<style scoped>
.contentCut {
  width: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
}
</style>
