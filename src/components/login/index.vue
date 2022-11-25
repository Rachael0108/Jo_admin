<template>

</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
onMounted(() => {
})
onUnmounted(() => {
})

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
