
<template>
  <div class="customImage block">
    <el-image v-bind="$attrs">
      <div slot="error" class="image-slot">
        <el-image>
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
            <div slot="placeholder" class="placeholder-slot">加载中...</div>
          </template>
        </el-image>
      </div>
    </el-image>
  </div>
</template>
<script>
import { Picture as IconPicture } from '@element-plus/icons-vue'
export default {
  /**
   * @封装第三方组件：封装图片加载失败和图片加载中
   * @Vue3中的$attrs包括属性和方法
   * */
  inheritAttrs:false,     //避免属性被添加到根元素，custom-image可以直接使用el-image的属性
}

</script>
<style scoped>
.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;
}
.el-image {
  padding: 0 5px;
  max-width: 300px;
  max-height: 200px;
  width: 100%;
  height: 200px;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.el-icon {
  font-size: 30px;
}
</style>
