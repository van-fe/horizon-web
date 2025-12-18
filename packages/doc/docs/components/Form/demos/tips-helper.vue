<template>
  <n-form>
    <n-form-item label="helper主题">
      <n-radio-group v-model="helperTheme">
        <n-radio label="light" />
        <n-radio label="dark" />
      </n-radio-group>
    </n-form-item>
  </n-form>

  <n-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    :helper-theme="helperTheme"
    @submit="submit"
  >
    <n-form-item label="input style" prop="inputStyle">
      <n-radio-group v-model="formData.inputStyle" size="medium">
        <n-radio v-for="item in ['normal', 'no-border']" :key="item" :label="item" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="Username" prop="username" :validate-trigger="['change']">
      <n-input
        v-model="formData.username"
        :input-style="formData.inputStyle"
        placeholder="Please enter your username"
        :clearable="true"
      />
    </n-form-item>
    <n-form-item
      label="Age"
      prop="age"
      helper-placement="after-label"
      :validate-trigger="['change']"
    >
      <template #helper>Age is between 0 to 120</template>
      <n-input-number
        v-model="formData.age"
        placeholder="Please enter your age"
        :input-style="formData.inputStyle"
        :min="0"
        :max="120"
        :clearable="true"
        @input="onInput"
        @change="onChange"
      />
    </n-form-item>
    <n-form-item label="Province" prop="province" tip="Please pick your province">
      <n-select v-model="formData.province" :input-style="formData.inputStyle" placeholder="Please select">
        <n-option label="Beijing" value="beijing" />
        <n-option label="Shanghai" value="shanghai" />
        <n-option label="Hefei" value="hefei" />
        <n-option label="Wuhan" value="wuhan" />
      </n-select>
    </n-form-item>
    <n-form-item label="Date" prop="date" :helper="dateHelper">
      <n-date-picker
        v-model="formData.date"
        type="date-range"
        value-format="YYYY/MM/DD"
        start-placeholder="Start date"
        end-placeholder="End date"
        :input-style="formData.inputStyle"
      />
    </n-form-item>
    <n-form-item label="Switch" prop="switch">
      <n-switch v-model="formData.switch" />
    </n-form-item>
    <n-form-item label="Remark" tip="Hint or Error Message" prop="remark">
      <n-input
        v-model="formData.remark"
        placeholder="Type something"
        :input-style="formData.inputStyle"
        :show-limit="true"
        :maxlength="100"
        type="textarea"
      />
    </n-form-item>
    <n-form-item>
      <n-button native-type="submit">Submit</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { $message } from '@aurora/horizon-web';
import type { NFormRule, NFormItemHelper, NFormInstance, FormProps, InputProps } from '@aurora/horizon-web';

const helperTheme = ref<FormProps['helperTheme']>('light');

const formRef = ref<(HTMLElement & NFormInstance) | null>(null);
const formData = ref({
  inputStyle: 'normal' as InputProps['inputStyle'],
  username: '',
  age: null,
  province: null,
  date: null,
  switch: true,
  remark: '',
});

const submit = () => {
  console.log('formData:', formData.value);
  formRef.value
    ?.validate()
    .then(() => {
      $message.success('Submit');
    })
    .catch(err => {
      $message.error(err[0]);
    });
};

const rules: Partial<Record<keyof (typeof formData)['value'], NFormRule | NFormRule[]>> = {
  username: {
    required: true,
    message: 'Please enter your username',
  },
  age: [
    {
      required: true,
      message: 'Please enter your age',
    },
    {
      min: 0,
      max: 120,
      type: 'number',
      message: 'Age is between 0 - 120',
    },
  ],
  province: {
    required: true,
    message: 'Please pick your location',
  },
  date: {
    required: true,
    message: 'Please pick your wish time which you will be free',
  },
};

const dateHelper: NFormItemHelper = {
  title: 'Tips',
  content: () => h('div', 'Please pick your wish time which you will be free'),
};

function onInput() {
  console.log('input:', formData.value.age);
}

function onChange() {
  console.log('change:', formData.value.age);
}

</script>
