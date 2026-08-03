<template>
  <h-form label-position="left">
    <h-form-item label="disabled">
      <h-radio-group v-model="disabled">
        <h-radio :value="true">True</h-radio>
        <h-radio :value="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-form
    ref="formRef"
    :model="formData"
    :disabled="disabled"
    label-vertical-align="middle"
    @submit.prevent="onSubmit"
  >
    <h-form-item label="Input" prop="input" required>
      <h-input v-model="formData.input" clearable />
    </h-form-item>
    <h-form-item label="Number" prop="number" required>
      <h-input-number
        v-model="formData.number"
        :min="0"
        :max="120"
        clearable
        @input="onInput"
        @change="onChange"
      />
    </h-form-item>
    <h-form-item label="Select" prop="select" required>
      <h-select v-model="formData.select" clearable :multiple="true">
        <h-option label="Beijing" value="beijing" />
        <h-option label="Shanghai" value="shanghai" />
        <h-option label="Hefei" value="hefei" />
      </h-select>
    </h-form-item>
    <h-form-item label="Cascader" prop="cascader" required>
      <h-cascader
        v-model="formData.cascader"
        :clearable="true"
        :to-body="false"
        :multiple="true"
        :options="cascaderData"
      />
    </h-form-item>
    <h-form-item label="TreeSelect" prop="treeSelect" required>
      <h-tree-select
        v-model="formData.treeSelect"
        :clearable="true"
        :to-body="false"
        :multiple="true"
        :tree-data="cascaderData"
      />
    </h-form-item>
    <h-form-item label="Date" prop="date" required>
      <h-date-picker
        v-model="formData.date"
        type="daterange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
    </h-form-item>
    <h-form-item label="Switch" prop="switch" required>
      <h-switch v-model="formData.switch" />
    </h-form-item>
    <h-form-item label="Checkbox" prop="checkbox" required>
      <h-checkbox v-model="formData.checkbox" />
    </h-form-item>
    <h-form-item label="Radio" prop="radio" required>
      <h-radio v-model="formData.radio" />
    </h-form-item>
    <h-form-item label="Textarea" prop="textarea" required>
      <h-input v-model="formData.textarea" :show-limit="true" :maxlength="100" type="textarea" />
    </h-form-item>
    <h-form-item label="Upload" prop="upload" required>
      <h-upload v-model="formData.upload"></h-upload>
    </h-form-item>
    <h-form-item label="Upload Drop" prop="upload" required>
      <h-upload v-model="formData.upload" type="drop" :limit="5" :multiple="true"></h-upload>
    </h-form-item>
    <h-form-item label="Upload Gallery" prop="upload" required>
      <h-upload v-model="formData.upload" type="gallery"></h-upload>
    </h-form-item>

    <h-button native-type="submit">Submit</h-button>
  </h-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { HFormInstance } from '@aurora/horizon-web';

const disabled = ref(true);
const cascaderData = ref([]);
const formRef = ref<HFormInstance | null>(null);
const formData = ref({
  input: '',
  number: null,
  select: null,
  date: [],
  switch: true,
  checkbox: false,
  radio: false,
  cascader: [],
  treeSelect: [],
  textarea: '',
  upload: undefined,
});

onMounted(async () => {
  cascaderData.value = await fetch(new URL('/cascader-tree-data.json', import.meta.url).href).then(
    r => r.json(),
  );
});

function onInput() {
  console.info('input:', formData.value.number);
}
function onChange() {
  console.info('change:', formData.value.number);
}

function onSubmit() {
  formRef.value?.validate();
}
</script>
