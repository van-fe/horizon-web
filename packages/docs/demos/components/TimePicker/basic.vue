<template>
  <h-form>
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio value="small" />
        <h-radio value="medium" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="style">
      <h-radio-group v-model="inputStyle">
        <h-radio value="normal" />
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
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-time-picker v-model="value" :size="size" :input-style="inputStyle" :disabled="disabled" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TimePickerProps } from '@aurora/horizon-web';

const value = ref();
const size = ref<NonNullable<TimePickerProps['size']>>('medium');
const inputStyle = ref<TimePickerProps['inputStyle']>('normal');
const disabled = ref(false);
</script>
