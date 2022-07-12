<template>
  <el-button @click="aa">登录</el-button>
<div id="main"></div>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { getCurrentInstance, onMounted, ref } from 'vue'
import { login } from '../../api/user'
import * as echarts from "echarts";

// 接下来的使用就跟之前一样，初始化图表，设置配置项
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
});

const { proxy } = getCurrentInstance()
const data = ref({
  account: 'admin',
  password: '12345',
})

const handleLogin = () =>{
  login().then( (res) => {
    if(res.data.code === 200) {
      console.log('登录成功')
      //存储token开始时间
      localStorage.setItem('tokenStartTime', new Date().getTime())
      //存储token
      localStorage.setItem('tokenStartTime', res.data.data.token)
    }
  })
}
const aa = (val) => {
  console.log(val)
}
</script>
