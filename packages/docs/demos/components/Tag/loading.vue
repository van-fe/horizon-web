<template>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-form label-position="left" label-vertical-align="middle">
        <h-form-item label="Loading">
          <h-radio-group v-model="isLoading">
            <h-radio :label="true">True</h-radio>
            <h-radio :label="false">False</h-radio>
          </h-radio-group>
        </h-form-item>
      </h-form>
    </h-grid-item>
    <h-grid-item :span="24">
      <h-tag :clickable="false" :loading="isLoading">Default</h-tag>
      <h-tag :clickable="false" :loading="isLoading" type="success">Success</h-tag>
      <h-tag :clickable="false" :loading="isLoading" type="info">Info</h-tag>
      <h-tag :clickable="false" :loading="isLoading" type="warning">Warning</h-tag>
      <h-tag :clickable="false" :loading="isLoading" type="error">Error</h-tag>
    </h-grid-item>
    <h-grid-item :span="24">
      <h-tag :clickable="false" :loading="isLoading" :round="true" @click="onClick" @close="onClose">Default</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :round="true" type="success">Success</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :round="true" type="info">Info</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :round="true" type="warning">Warning</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :round="true" type="error">Error</h-tag>
    </h-grid-item>
    <h-grid-item :span="24">
      <h-tag :clickable="false" :loading="isLoading" :plain="true">Default</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :plain="true" type="success">Success</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :plain="true" type="info">Info</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :plain="true" type="warning">Warning</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :plain="true" type="error">Error</h-tag>
    </h-grid-item>
    <h-grid-item :span="24">
      <h-tag :clickable="false" :loading="isLoading" :plain="true" :equally="true" @click="onClick" @close="onClose">普</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :plain="true" :equally="true" type="success">成</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :plain="true" :equally="true" type="info">进</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :plain="true" :equally="true" type="warning">警</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :plain="true" :equally="true" type="error">错</h-tag>
    </h-grid-item>
  </h-grid>
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
