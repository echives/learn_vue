<template>
  <main>
    <h2 class="title">JSBridge测试页面</h2>
    <div class='test-cases'>
      <div class="case">
        <h3>发送helloworld字符串</h3>
        <button @click="helloworld">发送</button>
      </div>
      <div class="case">
        <h3>随机生成一对整数，请求客户端计算加法结果</h3>
        <button @click="calculationAddition">生成一组数字</button>
        <div>{{ numberA }} + {{ numberB }} = {{ additionResult }}</div>
      </div>
      <div class="case">
        <h3>随机生成一对整数，请求客户端计算减法，callback有效时间2s</h3>
        <button @click="calculationSubtraction">生成一组数字</button>
        <div>{{ numberC }} - {{ numberD }} = {{ subtractionResult }}</div>
        <div class="errorToast">{{ errorToast }}</div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { runBridge, ERRORS } from '@/utils/bridge'
import { defineComponent } from 'vue'
class Data {
  numberA: number
  numberB: number
  numberC: number
  numberD: number
  additionResult: number
  subtractionResult: number
  errorToast: string | null

  constructor(
    numberA: number,
    numberB: number,
    numberC: number,
    numberD: number,
    additionResult: number,
    subtractionResult: number,
    errorToast: string | null
  ) {
    this.numberA = numberA
    this.numberB = numberB
    this.numberC = numberC
    this.numberD = numberD
    this.additionResult = additionResult
    this.subtractionResult = subtractionResult
    this.errorToast = errorToast
  }
}
export default defineComponent({
  mounted () {
  },
  data () {
    return new Data(0,0,0,0,0,0,null)
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
    },
    calculationSubtraction () {
      const numberC = Math.floor(Math.random() * 10000)
      const numberD = Math.floor(Math.random() * 10000)
      this.numberC = numberC
      this.numberD = numberD
      this.errorToast = null
      runBridge('calculationSubtraction', { numberC: numberC, numberD: numberD }, ({ data, err }) => {
        if (err) {
          if (err === ERRORS.TIMEOUT) {
            this.errorToast = '回调超时'
          } else {
            this.errorToast = '其他错误' 
          }
          console.log(err)
        } else {
          console.log(data.result)
          let subtractionResult = data.result as number
          if (subtractionResult) {
            this.subtractionResult = subtractionResult
          } else {
            console.log('数据格式错误')
          }
        }
      }, 2000)
    }
  }
})

</script>

<style lang="less">
.title {
  padding: 20px 0 20px 0;
}
.case {
  border-radius: 16px;
  background: gainsboro;
  margin: 10px;
  padding: 20px;

  button {
    background: whitesmoke;
    border: none;
    border-radius: 8px; 
    padding: 10px;
  }

  .errorToast {
    color: red;
  }
}
</style>