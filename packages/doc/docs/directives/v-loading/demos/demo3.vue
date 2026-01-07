<template>
  <div v-loading="loadingOptions" class="loadingContainer">
    {{ loadingOptions }}
  </div>
  <h-form :inline="true">
    <h-form-item label="是否显示">
      <h-radio-group v-model="loadingOptions.isShow" size="small">
        <h-radio :label="true" size="small">显示</h-radio>
        <h-radio :label="false" size="small">隐藏</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="排列风格">
      <h-radio-group v-model="loadingOptions.textOrient" size="small">
        <h-radio label="column" size="small" />
        <h-radio label="row" size="small" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="大小">
      <h-radio-group v-model="loadingOptions.size" size="small">
        <h-radio label="large" size="small" />
        <h-radio label="medium" size="small" />
        <h-radio label="small" size="small" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="是否全屏">
      <h-radio-group v-model="loadingOptions.fullscreen" size="small">
        <h-radio :label="true" size="small" />
        <h-radio :label="false" size="small" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="loading文字">
      <h-input v-model="loadingOptions.text"></h-input>
    </h-form-item>
    <h-form-item label="背景色">
      <h-input v-model="loadingOptions.bgc"></h-input>
    </h-form-item>
  </h-form>
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
  margih-bottom: 20px;
  display: flex;
  justify-content: center;
  aligh-items: center;
}
</style>
