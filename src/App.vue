<template>
  <div>
    <Header />
    <router-view></router-view>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style lang="css">
body {
  background-color: #30414f;
  padding: 0%;
  margin: 0%;
  overflow-x: hidden;
  color: #f1f1f1;
}
</style>
