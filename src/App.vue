<template>
  <div id="app">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <app-header v-if="!$route.meta.showHeaderMenu">
    <router-view></router-view>
    </app-header>
    <div v-if="$route.meta.showHeaderMenu">
    <router-view></router-view>
    </div>
  </div>
</template>

<script>

import AppHeader from '@/components/layouts/appHeader'
export default {
  name: 'App',
  components: {
    'app-header': AppHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
