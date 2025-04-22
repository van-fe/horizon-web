<template>
  <div class="loading-container">
    <n-button size="large" type="primary" @click="show">显示</n-button>
    <n-button size="large" type="primary" @click="hide">隐藏</n-button>
    <n-button
      v-loading="{
        isShow: isFullscreenShow,
        loadingType: 'circle',
        textOrient: 'row',
        text: '加载中...',
        size: 'medium',
        bgc: '#FFF',
        fullscreen: isFullscreen,
      }"
      size="large"
      type="primary"
      value="checked border"
      label="checked border"
      @click="fullscreen"
    >
      全屏
    </n-button>
  </div>
  <n-checkbox
    v-model="checkbox"
    v-loading="{
      isShow,
      loadingType: 'circle',
      textOrient: 'row',
      text: '加载中...',
      size: 'medium',
      bgc: '#FFF',
    }"
    value="checked border"
    label="checked border"
    border
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checkbox = ref(['checked border']);
const isShow = ref<boolean>(true);
const isFullscreen = ref<boolean>(true);
const isFullscreenShow = ref<boolean>(false);
const show = () => {
  isShow.value = true;
};
const hide = () => {
  isShow.value = false;
};
const fullscreen = () => {
  isFullscreenShow.value = true;
  setTimeout(() => {
    isFullscreenShow.value = false;
  }, 2000);
};
</script>

<style scoped>
.loading-container {
  margin-bottom: 20px;
}
</style>
