<template>
  <!--  <span>我是登录框 {{info.name}}</span>-->

  <!--Content before waves-->
  <div class="inner-header flex">
    <!--Just the logo.. Don't mind this-->

    <svg  width=200 viewBox="0 0 401 721"  class="container">
      <path d="M1023.5,48h-5.67L1026,31H676l9.81,17h-.31A31.59,31.59,0,0,0,654,79.5v626a31.6,31.6,0,0,0,29.25,31.41L676,
    752h350l-8.66-15h6.16a31.59,31.59,0,0,0,31.5-31.5V79.5A31.59,31.59,0,0,0,1023.5,48Z" transform="translate(-654 -31)" fill="#074a84"/>
    </svg>
    <!--Waves Container-->
    <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
         viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
      <g class="parallax">
        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(0,172,193,0.5)" />
        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
      </g>
    </svg>
  </div>


</template>

<script setup>
import {inject, onBeforeMount,onMounted} from "vue";
import anime from 'animejs/lib/anime.es.js';
let info = inject("info")

onMounted(()=>{
})
/**
 * @inject便于孙子和爷爷传递数据--可以用readOnly保护
 * */
// _rawValue 用于保存未转换前的原生数据
// const changeValue = inject("changeProvide") as Function
// changeValue()
// 通过 crypto-js给storage 加密
// const CryptoJS = require("crypto-js")
</script>


<style>
.container {
  overflow: hidden !important;
}
body {
  margin:0;
}

h1 {
  font-family: 'Lato', sans-serif;
  font-weight:300;
  letter-spacing: 2px;
  font-size:48px;
}
p {
  font-family: 'Lato', sans-serif;
  letter-spacing: 1px;
  font-size:14px;
  color: #333333;
}

.header {
  position:relative;
  text-align:center;
  background: linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%);
  color:white;
}
.logo {
  width:50px;
  fill:white;
  padding-right:15px;
  display:inline-block;
  vertical-align: middle;
}

.inner-header {
  height:65vh;
  width:100%;
  margin: 0;
  padding: 0;
}

.flex { /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position: relative;
  bottom: -7.5rem;
  left: -15rem;
  width: 20rem;
  height: 6rem;
  margin-bottom:-7px; /*Fix for safari gap*/
  min-height: 5rem;
  max-height:150px;
}

.content {
  position:relative;
  height:20vh;
  text-align:center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px,0,0);
  }
  100% {
    transform: translate3d(85px,0,0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height:40px;
    min-height:40px;
  }
  .content {
    height:30vh;
  }
  h1 {
    font-size:24px;
  }
}
</style>
