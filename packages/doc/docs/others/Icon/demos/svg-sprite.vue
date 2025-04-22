<template>
  <div class="container">
    <div class="block">
      <span class="title">设置 name 选择图标 :</span>
      <NIconSVG name="success_filled" />
      <n-icon-SVG name="time" />
      <n-icon-SVG name="nio" @click="test" />
    </div>
    <div class="block">
      <span class="title">设置 size 控制大小 :</span>
      <NIconSVG name="time" size="16" />
      <n-icon-SVG name="time" />
      <n-icon-SVG name="time" size="32" />
    </div>
    <div class="block">
      <span class="title">设置 color 控制颜色 :</span>
      <NIconSVG name="time" color="red" />
      <n-icon-SVG name="time" color="#f6d110" />
      <n-icon-SVG name="time" color="rgb(36, 235, 32)" />
    </div>
    <div class="block">
      <span class="title">设置 spin 开启动画 :</span>
      <NIconSVG name="time" spin="cw" />
      <n-icon-SVG name="time" spin="ccw" />
      <n-icon-SVG name="loading" spin="cw" />
    </div>
    <div class="block">
      <span class="title">设置 rotate 转动方向 :</span>
      <NIconSVG name="time" :rotate="45" />
      <n-icon-SVG name="time" :rotate="90" />
      <n-icon-SVG name="time" :rotate="180" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const test = () => {
      console.log('svg sprite');
    };
    return {
      test,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.container .block {
  margin: 20px;
}

.container .block .title {
  margin-right: 20px;
  display: inline-block;
}

.container .block .n-icon {
  margin-right: 20px;
}
</style>
