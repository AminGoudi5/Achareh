<template>
  <Header />
  <router-view />
</template>

<script>
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="scss">
#app {
  color: #323232;
  font-family: 'Vazirmatn';
  background-color: #f9f9f9;
  padding: 0 20px;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

@media (max-width: 768px) {
  #app {
    padding: 0;

  }
}
</style>
