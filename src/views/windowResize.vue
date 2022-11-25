<template>
  <div class="box" id="scroll-content">
    <span id="screen-title" class="screen-title" v-for="(item,index) in 50" :key="index">基于scale的适配方案</span>
  </div>
  <div id="progress-container" class="progress-container-el">
    <div id="progress-el" ref="progressEleRef" ></div>
    <div id="progress-ball" ></div>
  </div>

  <el-button @click="toggleDark()">
    <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
  </el-button>

  <div class="screen-container">
    <div class="screen-content" ref="screenRef" id="scrollElement">
      <el-button @click="toggleDark()"><span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span></el-button>
      <img class="screen-img" src="https://img2.baidu.com/it/u=1297807229,3828610143&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281" alt="">
    </div>
  </div>
  <!--<intel-inpt></intel-inpt>-->

</template>

<script setup lang="ts">
import windowResize from '../../utils/windowResize.js';
import {onMounted, onUnmounted, ref} from 'vue';
import scrollProgress from '../../utils/scroll-progress.js';
const { screenRef, calcRate, windowDraw, unWindowDraw } = windowResize()
import {useDark, useToggle} from '@vueuse/core'

const {getHeight, progressEleRef, windowRe, progressMove} = scrollProgress();

const isDark = useDark()
const toggleDark = useToggle(isDark)

onMounted(() => {
  windowRe()
  progressMove()
  getHeight()
  // 监听浏览器窗口尺寸变化

  // calcRate()
})
onUnmounted(() => {
  unWindowDraw();
})
import {useWindowSize} from '@vueuse/core';
// import IntelInpt from "../intelInput/intelInpt.vue";
// const {width, height} = useWindowSize()
</script>

<style scoped lang="scss">
.box {
  width: 300px;
  height: 300px;
  overflow: auto;
}

.screen-container {
  height: 100%;
  background-color: lightcyan;
  display: flex;
  justify-content: center;
  align-items: center;

  .screen-content {
    width: 1920px;
    height: 300px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;

    flex-direction: column;

    .screen-title {
      font-size: 32px;
      width: 100px;

    }

    .screen-img {
      margin-top: 20px;
    }
  }
}

#progress-container {
  width: 0.2rem;
  height: 380px;
  background-color: #42b883;
  position: absolute;
  top: 1rem;
  left: 20rem;
}

#progress-el {
  background: black;
  width: 0.2rem;
  height: 0;
}

#progress-ball {
  background: black;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  position: relative;
  left: -0.4rem;
}

#progress-ball:active {
  transform: scale(1.2);
}
</style>
