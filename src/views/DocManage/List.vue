<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="title"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</template>

<script>
import {getList} from '@/api/doc'
export default {
  name: 'List',
  data () {
    return {
      queryData: {
        pageSize: 10,
        pageIndex: 1,
        total: 0
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
        console.log(res)
      })
    }
  }
}

</script>

<style scoped>

</style>
