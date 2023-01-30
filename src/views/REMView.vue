<template>
  <div>
    <h2>rem</h2>
    <div class="content">
      <div class="title">这句话固定为16Px</div>
      <div>
        <div>其他内容为16px，转换为相应的rem</div>
        <span>使用了</span>
        <a href="https://github.com/cuth/postcss-pxtorem">postcss-pxtorem</a>
        <span>自动进行px到rem的转换，转换规则为：px=>rem，Px/PX=>px</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
}

</script>

<style lang="less">
h2 {
  padding: 20px 0 20px 0;
}

.content {
  font-size: 16px;

  .title {
    font-size: 16Px;
  }
}
</style>