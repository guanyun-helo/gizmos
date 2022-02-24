<template>
  <n-config-provider :theme="lightTheme" :theme-overrides="{ common: { fontWeightStrong: '600' } }">
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-config-provider>
</template>

<script>
import { darkTheme, lightTheme } from 'naive-ui'

export default {
  setup() {
    document.title = 'Gizmos'
    return {
      darkTheme,
      lightTheme
    }
  },
  name: "App",
  components: {
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

@media screen and (max-width: 600px) {
  .container {
    padding: 0;
    margin: 4px !important;
  }
  .n-card__content {
    padding: 0 !important;
    margin: 4px !important;
  }
}
.chart {
  min-width: 390px;
}
</style>
