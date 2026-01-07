<template>
  <h-form>
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio value="small" />
        <h-radio value="medium" />
        <h-radio value="large" />
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
  <h-row>
    <h-col :span="24">
      <h-date-picker
        v-model="value"
        type="date"
        :size="size"
        :input-style="inputStyle"
        :disabled="disabled"
        @update:modelValue="onUpdate"
        @change="onChange"
        @pick="onPick"
      />
    </h-col>
    <h-col :span="24">
      <h-date-picker
        v-model="value2"
        type="date-range"
        :size="size"
        :input-style="inputStyle"
        :disabled="disabled"
        @update:modelValue="onUpdate"
        @change="onChange"
        @pick="onPick"
      />
    </h-col>
  </h-row>
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
