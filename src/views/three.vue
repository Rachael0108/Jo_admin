<template>
  <div id="login">
    <!--引入粒子特效-->
    <!--    <Particles-->
    <!--        id="tsparticles"-->
    <!--        :particlesLoaded="particlesLoaded"-->
    <!--        :options="options"-->
    <!--    />-->
  </div>
  <canvas></canvas>
</template>

<script setup>
import {getCurrentInstance, onBeforeMount, onMounted, ref} from 'vue'
import {login} from '../../api/user'
import {loadFull} from "tsparticles";
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  PointsMaterial,
  Sprite
} from 'three';

import * as echarts from "echarts";
import CustomImage from '../CustomImage.vue'

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 1500);
camera.position.set(0, 450, 2000);
let count;
let particle = {};
let particles = {};
const SEPARATION = 100, AMOUNTX = 60, AMOUNTY = 40;

const createCanvasSprites = () => {
  const scene = new Scene();
  const PI2 = Math.PI * 2;

  const material = new PointsMaterial({
    'color': 0x0f96ff,
    'vertexColors': true,
    'size': 4,
    'map': createSprites()
  });
  function createSprites  () {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    context.beginPath();
    context.arc(0, 0, 0.01, 0, PI2, true);	//画一个圆形。此处可修改大小。
    context.fill();
    return context
  }
  function createSpritesY () {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    context.beginPath();
    //绘制渐变色的矩形
    const lGrd = context.createLinearGradient(-0.008, 0.25, 0.016, -0.25);
    lGrd.addColorStop(0, '#16eff7');
    lGrd.addColorStop(1, '#0090ff');
    context.fillStyle = lGrd;
    context.fillRect(-0.008, 0.25, 0.016, -0.25);  //注意此处的坐标大小
    //绘制底部和顶部圆圈
    context.fillStyle = "#0090ff";
    context.arc(0, 0, 0.008, 0, PI2, true);    //绘制底部圆圈
    context.fillStyle = "#16eff7";
    context.arc(0, 0.25, 0.008, 0, PI2, true);    //绘制顶部圆圈
    context.fill();
    context.closePath();
    //绘制顶部渐变色光圈
    const rGrd = context.createRadialGradient(0, 0.25, 0, 0, 0.25, 0.025);
    rGrd.addColorStop(0, 'transparent');
    rGrd.addColorStop(1, '#16eff7');
    context.fillStyle = rGrd;
    context.arc(0, 0.25, 0.025, 0, PI2, true);    //绘制一个圆圈
    context.fill();
    return context
  }

  const materialY = new PointsMaterial({
    'color': 0xffffff,
    'vertexColors': true,
    'size': 1,
    'map': createSpritesY()
  });

  let i = 0;
  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      const num = Math.random() - 0.1;
      if (num > 0) {
        particles[i++] = new Sprite(material);
        particle = particles[i++]
      } else {
        particles[i++] = new Sprite(materialY);
        particle = particles
      }
      if (particle && particle.isObject3D) {
        console.log(particle)
        scene.add(particle);
      }
    }
  }
  renderer.render(scene, camera)
  window.addEventListener('resize', onWindowResize, false);
}


let windowHalfX, windowHalfY
const onWindowResize = () => {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const render = () => {
  let i = 0;
  //更新粒子的位置和大小
  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i++];
      //更新粒子位置
      particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
      //更新粒子大小
      particle.scale.x = particle.scale.y = particle.scale.z = ((Math.sin((ix + count) * 0.3) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4) * 50;	//正常情况下再放大100倍*1200
    }
  }
  renderer.render(scene, camera);
  count += 0.1;
}
const animate = () => {
  requestAnimationFrame(animate);
  render();
}
createCanvasSprites()


//particles.vue3 实现粒子特效
const options = {
  background: {
    color: {
      value: "#fff",//粒子颜色
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",//可用的click模式有: "push", "remove", "repulse", "bubble"。
      },
      onHover: {
        enable: true,
        mode: "grab",//可用的hover模式有: "grab", "repulse", "bubble"。
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#009688",
    },
    links: {
      color: "#009688",//'#dedede'。线条颜色。
      distance: 150,//线条长度
      enable: true,//是否有线条
      opacity: 0.5,//线条透明度。
      width: 1,//线条宽度。
    },
    collisions: {
      enable: false,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 1,//粒子运动速度。
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 40,//粒子数量。
    },
    opacity: {
      value: 0.5,//粒子透明度。
    },
    shape: {
      type: "circle", //可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
}
// <!--引入粒子特效的相关配置--
const particlesInit = async (engine) => {
  await loadFull(engine);
}
const particlesLoaded = (val) => {
  console.log(val)
}


// 接下来的使用就跟之前一样，初始化图表，设置配置项
// var myChart = echarts.init(document.getElementById('main'));
// // 绘制图表
// myChart.setOption({
//   title: {
//     text: 'ECharts 入门示例'
//   },
//   tooltip: {},
//   xAxis: {
//     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//   },
//   yAxis: {},
//   series: [
//     {
//       name: '销量',
//       type: 'bar',
//       data: [5, 20, 36, 10, 10, 20]
//     }
//   ]
// });

const {proxy} = getCurrentInstance()
const data = ref({
  account: 'admin',
  password: '12345',
})

const handleLogin = () => {
  login().then((res) => {
    if (res.data.code === 200) {
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

<style>
#tsparticles {
  z-index: -1;
  position: relative !important;
}

.login {
  width: 300px;
  height: 300px;
  margin: 200px auto 20px auto;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
}
</style>
