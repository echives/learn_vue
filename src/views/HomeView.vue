<template>
  <main>
    <RouterLink to="jsbridge">
      <ListItem class="item" title="JSBridge测试"></ListItem>
    </RouterLink>
    <RouterLink to="about">
      <ListItem class="item" title="其他"></ListItem>
    </RouterLink>
  </main>
</template>

<script lang="ts">
import ListItem from '@/components/home/ListItem.vue';

export default {
  components: {
    ListItem
  }
}

</script>

<style lang="less">
  main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .item {
      margin: 8px 0 8px 0;
    }
  }
</style>