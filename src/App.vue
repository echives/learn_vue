<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

(function () {
  function setRfs() {
    var designWidth = 375,
      rem2px = 100;
    // 动态设置font-size
    document.documentElement.style.fontSize = Math.min(200, Math.max(window.innerWidth / designWidth * rem2px,
      document.documentElement.clientWidth / designWidth * rem2px, 50)) + "px"
  }
  setRfs()
  var tid: any
  window.addEventListener('resize', function () {
    clearTimeout(tid)
    tid = setTimeout(setRfs, 100)
  }, false)
})()
</script>

<template>
  <RouterLink to="/home">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="25" height="25" />
      <span>前端试验田</span>
    </header>
  </RouterLink>

  <RouterView />
</template>

<style scoped>
body {
  place-items: normal start;
}

header {
  line-height: 1.5;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 24px;

  margin-bottom: 20px;
}

.logo {
  display: block;
  margin-right: 5px;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>
