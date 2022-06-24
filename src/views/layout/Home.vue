
<template>
  <el-button @click="handleLogin">登录</el-button>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { login, userList } from '../../api/user';

const { proxy } = getCurrentInstance()

const handleLogin = () =>{
  let data = {
    name: 'Jo',
    password: 'admin',
  }
  login(data).then( (res) => {
    console.log(data)
    console.log(res)
  })
}
const getUserList = () => {
  userList().then((res) => {
    console.log(res)
  })
}
onMounted(()=>{
  getUserList()
})
</script>
