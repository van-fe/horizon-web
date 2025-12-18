<template>
  <n-form label-position="left">
    <n-form-item label="disabled">
      <n-radio-group v-model="disabled">
        <n-radio :label="true">True</n-radio>
        <n-radio :label="false">False</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-form ref="formRef" :model="formData" :disabled="disabled" label-vertical-align="middle" @submit.prevent="onSubmit">
    <n-form-item label="Input" prop="input" required>
      <n-input v-model="formData.input" clearable />
    </n-form-item>
    <n-form-item label="Number" prop="number" required>
      <n-input-number v-model="formData.number" :min="0" :max="120" clearable @input="onInput" @change="onChange" />
    </n-form-item>
    <n-form-item label="Select" prop="select" required>
      <n-select v-model="formData.select" clearable :multiple="true">
        <n-option label="Beijing" value="beijing" />
        <n-option label="Shanghai" value="shanghai" />
        <n-option label="Hefei" value="hefei" />
      </n-select>
    </n-form-item>
    <n-form-item label="Cascader" prop="cascader" required>
      <n-cascader
        v-model="formData.cascader"
        :clearable="true"
        :to-body="false"
        :multiple="true"
        :options="cascaderData"
      />
    </n-form-item>
    <n-form-item label="TreeSelect" prop="treeSelect" required>
      <n-tree-select
        v-model="formData.treeSelect"
        :clearable="true"
        :to-body="false"
        :multiple="true"
        :tree-data="cascaderData"
      />
    </n-form-item>
    <n-form-item label="Date" prop="date" required>
      <n-date-picker
        v-model="formData.date"
        type="date-range"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
    </n-form-item>
    <n-form-item label="Time" prop="time" required>
      <n-time-picker
        v-model="formData.time"
        type="time"
        is-range
        start-placeholder="Start time"
        end-placeholder="End time"
      />
    </n-form-item>
    <n-form-item label="Switch" prop="switch" required>
      <n-switch v-model="formData.switch" />
    </n-form-item>
    <n-form-item label="Checkbox" prop="checkbox" required>
      <n-checkbox v-model="formData.checkbox" />
    </n-form-item>
    <n-form-item label="Radio" prop="radio" required>
      <n-radio v-model="formData.radio" />
    </n-form-item>
    <n-form-item label="Textarea" prop="textarea" required>
      <n-input
        v-model="formData.textarea"
        :show-limit="true"
        :maxlength="100"
        type="textarea"
      />
    </n-form-item>
    <n-form-item label="Upload" prop="upload" required>
      <n-upload v-model="formData.upload"></n-upload>
    </n-form-item>
    <n-form-item label="Upload Drop" prop="upload" required>
      <n-upload v-model="formData.upload" type="drop" :limit="5" :multiple="true"></n-upload>
    </n-form-item>
    <n-form-item label="Upload Gallery" prop="upload" required>
      <n-upload v-model="formData.upload" type="gallery"></n-upload>
    </n-form-item>

    <n-button native-type="submit">Submit</n-button>
  </n-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { NFormInstance } from '@aurora/horizon-web';

const disabled = ref(true);
const cascaderData = ref([]);
const formRef = ref<NFormInstance | null>(null);
const formData = ref({
  input: '',
  number: null,
  select: null,
  date: null,
  time: null,
  switch: true,
  checkbox: false,
  radio: false,
  cascader: [],
  treeSelect: [],
  textarea: '',
  upload: undefined,
});

onMounted(async () => {
  cascaderData.value = await fetch(`https://static.nio.com/fx-static/51/fixed/cascader-tree-data.prod.json?t=${Date.now()}`).then(r => r.json());
});

function onInput() {
  console.log('input:', formData.value.number);
}
function onChange() {
  console.log('change:', formData.value.number);
}

function onSubmit() {
  formRef.value?.validate();
}
</script>
