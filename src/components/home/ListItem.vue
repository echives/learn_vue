<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="item">
    <div class="title">{{ title }}</div>
  </div>
</template>

<style lang="less" scoped>
.item {
  padding: 16px;
  display: flex;
  flex-direction: row;

  border: black;
  border-width: 5px;
  background: lightgray;

  .title {
    font-size: 16px;
    color: black;
  }
}


</style>
