<template>
  <section class="wrap">
    <el-menu mode="horizontal" class="topNav">
      <!--<breadcrumb></breadcrumb>-->
      <router-link to="/">退出</router-link>
    </el-menu>
  </section>

</template>

<script>
export default {
  name: 'Top'
}
</script>

<style scoped>
.wrap{
  display: flex;
  justify-content:flex-end;
  flex-basis: 50px;
  border-bottom:1px solid #e6e6e6;
  padding-right:25px;
}
.topNav{
  height:50px;
  line-height: 50px;}
</style>
