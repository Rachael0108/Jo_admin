<template>
  <div class="mask" v-if="isShowBaseModal">
    <div class="close" @click="alert('ss')"></div>
    <div class="baseModal" ref="baseModal" id="baseModal">
      <img alt="" src="../assets/img/confirm.png" class="confirm-btn"
           @click="isShowBaseModal = false"/>
    </div>
  </div>
</template>

<script setup name="BaseModal">
import {computed, defineProps} from "vue";
import {onMounted} from "vue";
const props = defineProps({
  backUrl: ''
})
const isShowBaseModal = ref(true)
const baseModal = ref()
const imgUrl = computed(()=>{
  return props.backUrl
})
onMounted(()=>{
  document.getElementById('baseModal').style.backgroundImage = `url(${imgUrl.value.backUrl})`
})
</script>
<style scoped lang="scss">
.confirm-btn {
  width: 3.5rem;
  height: 1.2rem;
  margin-left: calc((100% - 3.5rem) / 2);
  margin-top: 0.5rem;
  position: absolute;
  bottom: 0.6rem;
}
.baseModal {
  background-size: 100% 100%;
  width: 90vw;
  height: 6rem;
  margin: auto;
  position: relative;
  top: 30%;
}
</style>
