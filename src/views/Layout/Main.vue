<template>
  <section class="wrap">
    <transition name="fade" mode="out-in" appear>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>

</template>

<script>
export default {
  name: 'Main'
}
</script>

<style scoped>
.wrap{
  flex-grow: 1;
  padding:10px;
  overflow:auto;
}
</style>
