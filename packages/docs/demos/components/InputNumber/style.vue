<script setup lang="ts">
import { ref } from 'vue';

const value = ref(20);
const style = ref('normal');
const disabled = ref(false);
const clearable = ref(false);
</script>

<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="style">
      <h-radio-group v-model="style">
        <h-radio label="normal" />
        <h-radio label="emphasize" />
        <h-radio label="no-border" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="disabled">
      <h-radio-group v-model="disabled">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="clearable">
      <h-radio-group v-model="clearable">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-grid :gap="12">
    <h-grid-item :span="8">
      <div class="demo-title">large</div>
      <h-input-number v-model="value" :input-style="style" :disabled="disabled" :clearable="clearable" size="large" />
    </h-grid-item>
    <h-grid-item :span="8">
      <div class="demo-title">medium (default)</div>
      <h-input-number v-model="value" :input-style="style" :disabled="disabled" :clearable="clearable" />
    </h-grid-item>
    <h-grid-item :span="8">
      <div class="demo-title">small</div>
      <h-input-number v-model="value" :input-style="style" :disabled="disabled" :clearable="clearable" size="small" />
    </h-grid-item>
  </h-grid>
</template>
