<template>
  <div v-loading="loadingOptions" class="loadingContainer">
    {{ loadingOptions }}
  </div>
  <n-form :inline="true">
    <n-form-item label="是否显示">
      <n-radio-group v-model="loadingOptions.isShow" size="small">
        <n-radio :label="true" size="small">显示</n-radio>
        <n-radio :label="false" size="small">隐藏</n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="排列风格">
      <n-radio-group v-model="loadingOptions.textOrient" size="small">
        <n-radio label="column" size="small" />
        <n-radio label="row" size="small" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="大小">
      <n-radio-group v-model="loadingOptions.size" size="small">
        <n-radio label="large" size="small" />
        <n-radio label="medium" size="small" />
        <n-radio label="small" size="small" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="是否全屏">
      <n-radio-group v-model="loadingOptions.fullscreen" size="small">
        <n-radio :label="true" size="small" />
        <n-radio :label="false" size="small" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="loading文字">
      <n-input v-model="loadingOptions.text"></n-input>
    </n-form-item>
    <n-form-item label="背景色">
      <n-input v-model="loadingOptions.bgc"></n-input>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const loadingOptions = ref({
  isShow: true,
  loadingType: 'circle',
  textOrient: 'column',
  text: '加载中...',
  size: 'large',
  bgc: '#5fdde3',
  fullscreen: false,
});
</script>

<style>
.loadingContainer {
  height: 240px;
  width: 240px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
