<template>
  <div>
    <el-button type="primary" @click="addDialog = true">新增</el-button>
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryData.pageIndex"
      :page-size="queryData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryData.total">
    </el-pagination>
    <el-dialog title="新增文案管理项" :visible.sync="addDialog">
      <Add @flush="flushList"></Add>
    </el-dialog>
  </div>

</template>

<script>
import Add from '@/views/DocManage/Add'
import {getList, delDoc} from '@/api/doc'
export default {
  name: 'doc-list',
  components: {
    Add
  },
  data () {
    return {
      queryData: {
        queryText: '',
        pageIndex: 1,
        pageSize: 10,
        projectId:1,
        total:0,
      },
      tableData: [],
      addDialog: false
    }
  },
  created () {
    this.getListFn()
  },
  methods: {
    getListFn () {
      getList(this.queryData).then(res => {
        this.queryData.total = res.total
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
    },
    flushList () {
      this.getListFn();
      this.addDialog = false;
    },
    handleSizeChange(val) {
      this.queryData.pageSize = val
      this.getListFn()
    },
    handleCurrentChange(val) {
      this.queryData.pageIndex = val
      this.getListFn()
    }
  }
}

</script>

<style scoped>

</style>
