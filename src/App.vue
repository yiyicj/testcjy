<!--
 * @Author: your name
 * @Date: 2020-09-28 21:55:47
 * @LastEditTime: 2020-09-28 22:19:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cjy-test/src/App.vue
-->
<template>
  <div id="app">
    <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <AtestPage/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
  import AtestPage from './components/AtestPage/index.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    AtestPage
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.display-flex {
  display: flex;
}
</style>
