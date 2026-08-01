<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio value="small" />
        <h-radio value="medium" />
        <h-radio value="large" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="inputStyle">
      <h-radio-group v-model="inputStyle">
        <h-radio value="normal" />
        <h-radio value="emphasize" />
        <h-radio value="no-border" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="disabled">
      <h-radio-group v-model="disabled">
        <h-radio :value="true">True</h-radio>
        <h-radio :value="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>

  <h-picker :size="size" :input-style="inputStyle" :disabled="disabled" :fit-input-width="false">
    面板内容-可自定义
  </h-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const size = ref('medium');
const inputStyle = ref('normal');
const disabled = ref(false);
</script>

<style scoped></style>
