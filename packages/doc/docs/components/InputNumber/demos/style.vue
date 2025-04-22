<script setup lang="ts">
import { ref } from 'vue';

const value = ref(20);
const style = ref('normal');
const disabled = ref(false);
const clearable = ref(false);
</script>

<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="style">
      <n-radio-group v-model="style">
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
    <n-form-item label="clearable">
      <n-radio-group v-model="clearable">
        <n-radio :label="true">True</n-radio>
        <n-radio :label="false">False</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-row :gutter="12">
    <n-col :span="8">
      <div class="demo-title">large</div>
      <n-input-number v-model="value" :input-style="style" :disabled="disabled" :clearable="clearable" size="large" />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">medium (default)</div>
      <n-input-number v-model="value" :input-style="style" :disabled="disabled" :clearable="clearable" />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">small</div>
      <n-input-number v-model="value" :input-style="style" :disabled="disabled" :clearable="clearable" size="small" />
    </n-col>
  </n-row>
</template>
