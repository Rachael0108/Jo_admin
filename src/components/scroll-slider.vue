
<template>
  <div style="display: flex">
<!--    <el-scrollbar ref="scrollbarRef" height="400px" styles="width: 200px" :always="false" @scroll="scroll">-->
<!--      <div ref="innerRef" styles="width: 200px">-->
<!--        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">-->
<!--          {{ item }}-->
<!--        </p>-->
<!--      </div>-->
<!--    </el-scrollbar>-->

    <div style="height:400px; width: 200px" ref="scrollbarRef">
      <div ref="innerRef" style="width: 200px">
        <ul class="content" ref="content">
          <li>
            <br>
            Privacy Terms and Conditions <br>
            Hermes Games is collecting the private information
            (phone number, email address, and WEMIX
            Wallet address) of its users for game announce ments and event info. <br>
            Therefore, each user must consent to the Privacy
            Terms and Conditions prior to participating in the event. <br>
            * Private Information Collection Terms and Conditions:
            Event Participate Info, Event Coupon Distri bution, and Customer Supports. <br>
            * Private Information Category: Phone Number,
            Email Address, WEMIX Wallet Address. <br>
            * Collected information will be saved in the data base for 1 year from the time of agreeing to the consent.
          </li>
        </ul>
      </div>
    </div>

    <div :style="{ height: '150px' }" class="slider">
      <van-slider v-model="value" vertical @change="handleSlider" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, nextTick} from 'vue';
import { ElScrollbar } from 'element-plus'

const max = ref(0)
const value = ref(0)
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

onMounted(() => {
  max.value = innerRef.value!.clientHeight - 380
})
let sliderHeight = 150
let domHeight
const getDomHeight = () =>{
  domHeight = innerRef.value!.clientHeight
}
const handleSlider = (value: number) => {
  getDomHeight()
  let move = domHeight * (value / sliderHeight)
  scrollbarRef.value!.setScrollTop(move)
  // nextTick(()=>{
  //   scrollbarRef.value!.scrollTop = move
  // })
}
const scroll = ({ scrollTop }) => {
  getDomHeight()
  value.value = sliderHeight * (scrollTop / domHeight )
}
const formatTooltip = (value: number) => {
  return `${value} px`
}

</script>
<style>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.slider {
  margin-left: 20px;
}
</style>
