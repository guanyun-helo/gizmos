<template>
  <n-config-provider :theme="lightTheme" :theme-overrides="{ common: { fontWeightStrong: '600' } }">
    <Home msg="Welcome to Your Vue.js App" />
  </n-config-provider>
</template>

<script>
import Home from './pages/Home.vue'
import { darkTheme, lightTheme } from 'naive-ui'

export default {
  setup() {
    return {
      darkTheme,
      lightTheme
    }
  },
  name: "App",
  components: {
    Home
  },
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app,
.n-config-provider {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
