<template>
  <!--  <span>我是登录框 {{info.name}}</span>-->

  <!--Content before waves-->
  <div class="inner-header flex">
    <!--Just the logo.. Don't mind this-->

    <svg width=200 viewBox="0 0 401 721" class="container">
      <path d="M1023.5,48h-5.67L1026,31H676l9.81,17h-.31A31.59,31.59,0,0,0,654,79.5v626a31.6,31.6,0,0,0,29.25,31.41L676,
    752h350l-8.66-15h6.16a31.59,31.59,0,0,0,31.5-31.5V79.5A31.59,31.59,0,0,0,1023.5,48Z" transform="translate(-654 -31)"
            fill="#074a84"/>
    </svg>
    <input type="range" name="range" min="0" max="120" step="1" @change="aa">
    <canvas id="c">当前浏览器不支持canvas 请升级！</canvas>

  </div>
</template>

<script setup>
import {inject, onBeforeMount, onMounted} from "vue";
import anime from 'animejs/lib/anime.es.js';

let info = inject("info")
let lineWidth,cR,axisLength,unit,nowrange,xoffset,nowdata,waveupsp,soffset,circleLock,range,sp,bR
let oRange, M, Sin, Sqrt, Cos, Pow, Round, PI, oW, oH,r,data

let ctx, canvas

onMounted(() => { canvas = document.getElementById("c")
  ctx = canvas.getContext("2d")
  oRange = document.getElementsByName("range")[0];
  M = Math;
  Sin = M.sin;
  Cos = M.cos;
  Sqrt = M.sqrt;
  Pow = M.pow;
  PI = M.PI;
  Round = M.round;
  oW = canvas.width = 250;
  oH = canvas.height = 350;
// 线宽
  let arcStack

  lineWidth = 2;
// 大半径
  r = (oW / 2);
  cR = r - 10 * lineWidth;
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
// 水波动画初始参数
  axisLength = 2 * r - 16 * lineWidth;  // Sin 图形长度
  unit = axisLength / 9; // 波浪宽
  range = .4 // 浪幅
  nowrange = range;
  xoffset = 8 * lineWidth; // x 轴偏移量
  var data = ~~(oRange.value) / 100;   // 数据量
  sp = 0; // 周期偏移量
  nowdata = 0;
  waveupsp = 0.006; // 水波上涨速度
// 圆动画初始参数
  arcStack = [];  // 圆栈
  bR = r - 8 * lineWidth;
  soffset = -(PI / 2); // 圆动画起始位置
  circleLock = true; // 起始动画锁
// 获取圆动画轨迹点集
  for (var i = soffset; i < soffset + 2 * PI; i += 1 / (8 * PI)) {
    arcStack.push([
      r + bR * Cos(i),
      r + bR * Sin(i)
    ])
  }
  let cStartPoint
// 圆起始点
  cStartPoint = arcStack.shift();
  ctx.strokeStyle = "#1c86d1";
  ctx.moveTo(cStartPoint[0], cStartPoint[1]);
// 开始渲染
  render();})
/**
 * @inject便于孙子和爷爷传递数据--可以用readOnly保护
 * */
const aa = () => {
  console.log(document.getElementsByName("range")[0].value)
}
function drawSine() {
  ctx.beginPath();
  ctx.save();
  var Stack = []; // 记录起始点和终点坐标
  for (var i = xoffset; i <= xoffset + axisLength; i += 20 / axisLength) {
    var x = sp + (xoffset + i) / unit;
    var y = Sin(x) * nowrange;
    var dx = i;
    var dy = 2 * cR * (1 - nowdata) + (r - cR) - (unit * y);
    ctx.lineTo(dx, dy);
    Stack.push([dx, dy])
  }

  // 获取初始点和结束点
  var startP = Stack[0]
  ctx.lineTo(xoffset + axisLength, oW);
  ctx.lineTo(xoffset, oW);
  ctx.lineTo(startP[0], startP[1])
  ctx.fillStyle = "#6ce2fd";
  ctx.fill();
  ctx.restore();
}

function drawText() {
  let txt
  ctx.globalCompositeOperation = 'source-over';
  var size = 0.4 * cR;
  ctx.font = 'bold ' + size + 'px Microsoft Yahei';
  txt = (nowdata.toFixed(2) * 100).toFixed(0) + '%';
  ctx.fillStyle = "#006fff";
  ctx.textAlign = 'center';
  ctx.fillText(txt, r + 5, r + 20)
}
let i
//裁剪中间水圈
function clipCircle() {
  var x = sp + (xoffset + i) / unit - 100;
  var y = Sin(x) * nowrange + 300;
  ctx.beginPath();
  ctx.arc(x + r, y + r-100, cR - 10, Math.PI, Math.PI * 3 / 2);
  ctx.lineTo(100 - r + x, y);
  ctx.arc(100 - r + x, r + y, r, Math.PI * 3 / 2, Math.PI * 2);
  ctx.lineTo(100 + x, 200 + y - r);
  ctx.arc(100 - r + x, 200 - r + y, r, 0, Math.PI * 1 / 2);
  ctx.lineTo(r + x, 200 + y);
  ctx.arc(r + x, 200 - r + y, r, Math.PI * 1 / 2, Math.PI);
  ctx.closePath();
}

//渲染canvas
function render() {
  ctx.clearRect(0, 0, oW, oH);

  //裁剪中间水圈
  clipCircle();
  // 控制波幅
  oRange.addEventListener("change", function () {
    data = ~~(oRange.value) / 100;
  }, 0);
  if (data >= 0.85) {
    if (nowrange > range / 4) {
      var t = range * 0.01;
      nowrange -= t;
    }
  } else if (data <= 0.1) {
    if (nowrange < range * 1.5) {
       t = range * 0.01;
      nowrange += t;
    }
  } else {
    if (nowrange <= range) {
       t = range * 0.01;
      nowrange += t;
    }
    if (nowrange >= range) {
       t = range * 0.01;
      nowrange -= t;
    }
  }
  if ((data - nowdata) > 0) {
    nowdata += waveupsp;
  }
  if ((data - nowdata) < 0) {
    nowdata -= waveupsp
  }
  sp += 0.07;
  // 开始水波动画
  drawSine();
  // 写字
  drawText();
  requestAnimationFrame(render)
}
const bott = () => {
  anime({
    targets: '.img-bottle',
    translateX: {
      value: [100, 250],
      delay: 500,
      direction: 'alternate',
    }, // from 100 to 250
    scale: {
      value: [2, 1.5],
      duration: 1100,
      delay: 800,
      easing: 'easeInOutSine',
    },
    loop: false
  });
}

</script>

<style>
input[type=range]::before {content: attr(min);  color: #000; padding-right: 5px;}
input[type=range]::after { content: attr(max); color: #000; padding-left: 5px;}
.container {
  overflow: hidden !important;
  background: url("./src/assets/bottle.png") no-repeat;
  background-size: 100%;
}

body {
  margin: 0;
}

h1 {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  letter-spacing: 2px;
  font-size: 48px;
}

p {
  font-family: 'Lato', sans-serif;
  letter-spacing: 1px;
  font-size: 14px;
  color: #333333;
}

.inner-header {
  height: 65vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

.flex { /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}


/* Animation */


/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }

  .content {
    height: 30vh;
  }

  h1 {
    font-size: 24px;
  }
}
</style>
