<template>
  <main>
    <h2>JSBridge测试页面</h2>
    <div class='test-cases'>
      <div class="case1">
        <button @click="helloworld">向test发送helloworld字符串</button>
      </div>
      <div class="case2">
        <button @click="calculationAddition">随机生成一段加法，请求客户端计算</button>
        <div>{{ numberA }} + {{ numberB }} = {{ additionResult }}</div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { runBridge } from '@/utils/bridge'
export default {
  mounted () {
  },
  data: function () {
    return {
      numberA: 0,
      numberB: 0,
      additionResult: 0
    }
  },
  methods: {
    helloworld () {
      runBridge('helloworld', {})
    },
    calculationAddition () {
      const numberA = Math.floor(Math.random() * 10000)
      const numberB = Math.floor(Math.random() * 10000) 
      this.numberA = numberA
      this.numberB = numberB
      runBridge('calculateAddition', { numberA: numberA, numberB: numberB }, ({ data, err }) => {
        if (err) {
          console.log(err)
        } else {
          console.log(data.result)
          let additionResult = data.result as number
          if (additionResult) {
            this.additionResult = additionResult
          } else {
            console.log('数据格式错误')
          }
        }
      })
    }
  }
}

</script>

<style lang="less">
.case2 {
  display: flex;
  flex-direction: row;
}
</style>