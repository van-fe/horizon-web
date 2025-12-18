<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="size">
      <n-radio-group v-model="size">
        <n-radio label="small" />
        <n-radio label="medium" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="inputStyle">
      <n-radio-group v-model="inputStyle">
        <n-radio label="normal" />
        <n-radio label="no-border" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="disabled">
      <n-radio-group v-model="disabled">
        <n-radio :label="true">True</n-radio>
        <n-radio :label="false">False</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>

  <n-picker :size="size" :input-style="inputStyle" :disabled="disabled" :fit-input-width="false">
    面板内容-可自定义
  </n-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PickerProps } from '@aurora/horizon-web';

const size = ref<PickerProps['size']>('medium');
const inputStyle = ref<PickerProps['inputStyle']>('normal');
const disabled = ref(false);
</script>

<style scoped>
</style>
