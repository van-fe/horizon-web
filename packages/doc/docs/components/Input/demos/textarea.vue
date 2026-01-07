<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="inputStyle">
      <h-radio-group v-model="inputStyle">
        <h-radio label="normal" />
        <h-radio label="no-border" />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="24">
      <h-input v-model="val1" type="textarea" :input-style="inputStyle" :rows="3" resize="vertical" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { InputProps } from '@aurora/horizon-web';

const inputStyle = ref<InputProps['inputStyle']>('normal');

const val1 = ref('');
</script>
