<template>
  <n-form>
    <n-form-item label="size">
      <n-radio-group v-model="size">
        <n-radio value="small" />
        <n-radio value="medium" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="style">
      <n-radio-group v-model="inputStyle">
        <n-radio value="normal" />
        <n-radio value="no-border" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="disabled">
      <n-radio-group v-model="disabled">
        <n-radio :value="true">True</n-radio>
        <n-radio :value="false">False</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="6">
      <n-time-picker v-model="value" :size="size" :input-style="inputStyle" :disabled="disabled" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TimePickerProps } from '@nio-fe/lego';

const value = ref();
const size = ref<NonNullable<TimePickerProps['size']>>('medium');
const inputStyle = ref<TimePickerProps['inputStyle']>('normal');
const disabled = ref(false);
</script>
