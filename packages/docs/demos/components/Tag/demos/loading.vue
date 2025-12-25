<template>
  <n-row>
    <n-col :span="24">
      <n-form label-position="left" label-vertical-align="middle">
        <n-form-item label="Loading">
          <n-radio-group v-model="isLoading">
            <n-radio :label="true">True</n-radio>
            <n-radio :label="false">False</n-radio>
          </n-radio-group>
        </n-form-item>
      </n-form>
    </n-col>
    <n-col :span="24">
      <n-tag :clickable="false" :loading="isLoading">Default</n-tag>
      <n-tag :clickable="false" :loading="isLoading" type="success">Success</n-tag>
      <n-tag :clickable="false" :loading="isLoading" type="info">Info</n-tag>
      <n-tag :clickable="false" :loading="isLoading" type="warning">Warning</n-tag>
      <n-tag :clickable="false" :loading="isLoading" type="error">Error</n-tag>
    </n-col>
    <n-col :span="24">
      <n-tag :clickable="false" :loading="isLoading" :round="true" @click="onClick" @close="onClose">Default</n-tag>
      <n-tag :clickable="false" :loading="isLoading" :round="true" type="success">Success</n-tag>
      <n-tag :clickable="false" :loading="isLoading" :round="true" type="info">Info</n-tag>
      <n-tag :clickable="false" :loading="isLoading" :round="true" type="warning">Warning</n-tag>
      <n-tag :clickable="false" :loading="isLoading" :round="true" type="error">Error</n-tag>
    </n-col>
    <n-col :span="24">
      <n-tag :clickable="false" :loading="isLoading" :plain="true">Default</n-tag>
      <n-tag :clickable="false" :loading="isLoading" :plain="true" type="success">Success</n-tag>
      <n-tag :clickable="false" :loading="isLoading" :plain="true" type="info">Info</n-tag>
      <n-tag :clickable="false" :loading="isLoading" :plain="true" type="warning">Warning</n-tag>
      <n-tag :clickable="false" :loading="isLoading" :plain="true" type="error">Error</n-tag>
    </n-col>
    <n-col :span="24">
      <n-tag :clickable="false" :loading="isLoading" :plain="true" :equally="true" @click="onClick" @close="onClose">普</n-tag>
      <n-tag :clickable="false" :loading="isLoading" :plain="true" :equally="true" type="success">成</n-tag>
      <n-tag :clickable="false" :loading="isLoading" :plain="true" :equally="true" type="info">进</n-tag>
      <n-tag :clickable="false" :loading="isLoading" :plain="true" :equally="true" type="warning">警</n-tag>
      <n-tag :clickable="false" :loading="isLoading" :plain="true" :equally="true" type="error">错</n-tag>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">

import { ref } from 'vue';

const isLoading = ref(true);

function onClick() {
  console.info('click');
}

function onClose() {
  console.info('close');
}
</script>

<style scoped>
</style>
