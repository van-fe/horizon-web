<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="inputStyle">
      <n-radio-group v-model="inputStyle">
        <n-radio label="normal" />
        <n-radio label="no-border" />
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="24">
      <n-input v-model="val1" type="textarea" :input-style="inputStyle" :rows="3" resize="vertical" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { InputProps } from '@aurora/horizon-web';

const inputStyle = ref<InputProps['inputStyle']>('normal');

const val1 = ref('');
</script>
