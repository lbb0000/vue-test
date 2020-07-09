<template>
    <div class="app-wrapper">
        <div class="navBox">
          <Nav></Nav>
        </div>
      <div class="mainBox">
        <Top></Top>
        <Main></Main>
      </div>
    </div>

</template>

<script>
import Nav from '@/views/Layout/Nav'
import Main from '@/views/Layout/Main'
import Top from '@/views/Layout/Top'
export default {
  name: 'Layout',
  components: {
    Nav,
    Main,
    Top
  }
}
</script>

<style scoped>
  .app-wrapper{
    width: 100%;
    height:100%;
    display: flex;
  }
  .navBox{
    flex-basis:200px;
  }
  .mainBox{
    display: flex;
    flex-direction:column;
    flex-grow:1;
  }
</style>
