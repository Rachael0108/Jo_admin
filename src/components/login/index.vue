<template>
  <el-button @click="aa">登录</el-button>

</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { getCurrentInstance, onMounted, ref } from 'vue'
import { login } from '../../api/user'

const { proxy } = getCurrentInstance()
const data = ref({
  name: 'Jo',
  password: '12345',
})

const handleLogin = () =>{
  console.log('xxx')
  login().then( (res) => {
    console.log(res)
  })
}
const aa = (val) => {
  console.log(val)
}
</script>
