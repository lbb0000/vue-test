<template>
  <el-menu @select="handleSelect" background-color="#545c64"  text-color="#fff" active-text-color="#ffd04b">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>文案管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/doc/list">文案列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>新闻管理</span>
    </template>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'Nav',
  methods: {
    handleSelect (key, keyPath) {
      this.$router.push(keyPath[keyPath.length - 1])
    }
  }
}
</script>

<style scoped>

</style>
