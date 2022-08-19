<template>
<!--  <div class="hollow-dots-spinner" :style="spinnerStyle">-->
<!--    <div class="dot"></div>-->
<!--    <div class="dot"></div>-->
<!--    <div class="dot"></div>-->
<!--  </div>-->
<!--  <el-button @click="changeProvide">click</el-button>-->
  <login-form></login-form>

<!--  <el-button @click="generateExcel">点击excel表格</el-button>-->

</template>

<script setup>
import {getCurrentInstance, readonly, ref, provide, reactive} from 'vue'
import {login} from '../../api/user'
import loginForm from '../login/loginForm.vue'

const info = reactive({
  name: "provide a cat"
})
const changeProvide = () => {
  info.name = 'provide a dog'
}
provide('info', info)

let data2 = [{
  周一: '',
  周二: '',
  周三: '',
  周四: '',
  周五: ''
}]

const worksheet = XLSX.utils.json_to_sheet(data2);
const generateExcel = () => {
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "模板");
  XLSX.writeFile(workbook, "Presidents.xlsx");
}

import * as echarts from "echarts";
import * as XLSX from "xlsx";

const aa = (val) => {
  console.log(val)
}
</script>
<style>
.hollow-dots-spinner, .hollow-dots-spinner * {
  box-sizing: border-box;
}

.hollow-dots-spinner {
  height: 15px;
  width: calc(30px * 3);
}

.hollow-dots-spinner .dot {
  width: 15px;
  height: 15px;
  margin: 0 calc(15px / 2);
  border: calc(15px / 5) solid #ff1d5e;
  border-radius: 50%;
  float: left;
  transform: scale(0);
  animation: hollow-dots-spinner-animation 1000ms ease infinite 0ms;
}

.hollow-dots-spinner .dot:nth-child(1) {
  animation-delay: calc(300ms * 1);
}

.hollow-dots-spinner .dot:nth-child(2) {
  animation-delay: calc(300ms * 2);
}

.hollow-dots-spinner .dot:nth-child(3) {
  animation-delay: calc(300ms * 3);

}

@keyframes hollow-dots-spinner-animation {
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
