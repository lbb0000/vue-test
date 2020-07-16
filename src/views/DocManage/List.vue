<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column prop="title" label="标题" width="180"></el-table-column>
    <el-table-column label="活动URL">
      <template slot-scope="scope">
          <el-link type="primary" :href="scope.row.url" target="_blank">{{scope.row.url}}</el-link>
      </template>
    </el-table-column>
    <el-table-column label="API">
      <template slot-scope="scope">
        <el-link type="primary" :href="'http://webs.yr.dev.q1.com/doc/getDetail/'+scope.row.id" target="_blank">{{'http://webs.yr.dev.q1.com/doc/getDetail/'+scope.row.id}}</el-link>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="gotoEdit(scope.row.id)">编辑</el-button>
        <el-popconfirm  confirmButtonText='确定'
                        cancelButtonText='取消'
                        @onConfirm="delData(scope.row.id)"
                        icon="el-icon-info"
                        iconColor="red"
                        :title="'确定删除（'+scope.row.title+'）吗？'">
          <el-button slot="reference" type="danger">删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {getList, delDoc} from '@/api/doc'
export default {
  name: 'List',
  data () {
    return {
      queryData: {
        pageSize: 10,
        pageIndex: 1,
        total: 0,
        projectId: 1,
        queryText: ''
      },
      tableData: []
    }
  },
  created () {
    this.getListFn()
  },
  methods: {
    getListFn () {
      getList(this.queryData).then(res => {
        console.log(res.data.length)
        this.tableData = res.data
      })
    },
    gotoEdit (id) {
      console.log(id)
    },
    delData (id) {
      delDoc({id}).then(() => {
        this.getListFn()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    }
  }
}

</script>

<style scoped>

</style>
