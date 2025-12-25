<template>
  <n-form>
    <n-form-item label="size">
      <n-radio-group v-model="size">
        <n-radio value="small" />
        <n-radio value="medium" />
        <n-radio value="large" />
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
    <n-col :span="24">
      <n-date-picker
        v-model="value"
        type="date"
        :size="size"
        :input-style="inputStyle"
        :disabled="disabled"
        @update:modelValue="onUpdate"
        @change="onChange"
        @pick="onPick"
      />
    </n-col>
    <n-col :span="24">
      <n-date-picker
        v-model="value2"
        type="date-range"
        :size="size"
        :input-style="inputStyle"
        :disabled="disabled"
        @update:modelValue="onUpdate"
        @change="onChange"
        @pick="onPick"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DatePickerProps } from '@aurora/horizon-web';

const value = ref();
const value2 = ref('');
const size = ref<NonNullable<DatePickerProps['size']>>('medium');
const inputStyle = ref<DatePickerProps['inputStyle']>('normal');
const disabled = ref(false);

function onUpdate(val: unknown) {
  console.info('update: ', val);
}

function onChange(val: unknown) {
  console.info('change: ', val);
}

function onPick(val: unknown) {
  console.info('pick: ', val);
}

onMounted(() => {
  setTimeout(() => {
    value.value = new Date();
  }, 1000);
});
</script>
