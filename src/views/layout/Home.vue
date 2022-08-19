
<template>
  <div class="flex">
    <el-button color="#626aef" >Default</el-button>
    <el-button color="#626aef"  plain>Plain</el-button>

    <el-button color="#626aef" disabled>Disabled</el-button>
    <el-button color="#626aef"  disabled plain>Disabled Plain</el-button>
  </div>
</template>

<script>

import {ref} from 'vue'
export function useCounter() {
  const count = ref(0)
  const fruit = ref({
    SSPPName: "apple"
  })
  const increment = () => count.value++
  return {
    count,
    increment
  }
}
</script>
