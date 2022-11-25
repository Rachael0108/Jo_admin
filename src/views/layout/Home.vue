
<template>
  <div class="flex">
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
      >
        <el-menu
            router
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
        >
          <el-menu-item index="/">
            <el-icon :size="20">
              <HomeFilled />
            </el-icon>
            <template #title>首页</template>
          </el-menu-item>
          <template v-for="item in menuList">
            <template v-if="item.children">
              <el-sub-menu :index="item.name" :key="item.id">
                <template #title>
                  <el-icon :size="20">
                    <component :is="item.icon"></component>
                  </el-icon>
                  <span>{{ item.name }}</span>
                </template>
                <template v-for="subItem in item.children">
                  <el-sub-menu
                      v-if="subItem.children"
                      :index="subItem.name"
                      :key="subItem.id"
                  >
                    <template #title>{{ subItem.name }}</template>
                    <el-menu-item
                        v-for="(threeItem, i) in subItem.children"
                        :key="i"
                        :index="threeItem.route"
                    >{{ threeItem.name }}</el-menu-item
                    >
                  </el-sub-menu>
                  <el-menu-item v-else :index="subItem.route" :key="subItem.id">{{
                      subItem.name
                    }}</el-menu-item>
                </template>
              </el-sub-menu>
            </template>
            <template v-else>
              <el-menu-item :index="item.route" :key="item.id">
                <el-icon :size="20">
                  <component :is="item.icon"></component>
                </el-icon>
                <template #title>{{ item.name }}</template>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
      >
       <div class="contents">
         <router-view v-slot="{ Component }">
             <component :is="Component" />
         </router-view>
       </div>
      </el-col>
    </el-row>
  </div>
<!--  <div style="display: flex">-->
<!--    <el-scrollbar ref="scrollbarRef" height="400px" style="width: 200px" always @scroll="scroll">-->
<!--      <div ref="innerRef" style="width: 200px">-->
<!--        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">-->
<!--          {{ item }}-->
<!--        </p>-->
<!--      </div>-->
<!--    </el-scrollbar>-->

<!--    <div :style="{ height: '150px' }">-->
<!--      <van-slider v-model="value" vertical @change="handleSlider" />-->
<!--    </div>-->
<!--  </div>-->
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import { ElScrollbar } from 'element-plus'
  const count = ref(0)
  const router = useRouter()
  const increment = () => count.value++
const menuList  = ref([
  {
    name: '组件封装',
    id: '1',
    icon: 'Setting',
    children: [
      {
        name: 'baseComponent',
        parent_id: '1',
        id: '12',
        route: 'baseComponent',
      }
    ]
  }, {
    name: '其他',
    id: '2',
    icon: 'Location',
    route: '/',
  }
])
</script>
<style>
.el-menu-vertical-demo {
  width: 200px;
}
</style>
