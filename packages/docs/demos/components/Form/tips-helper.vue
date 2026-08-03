<template>
  <h-form>
    <h-form-item label="helper主题">
      <h-radio-group v-model="helperTheme">
        <h-radio value="light" />
        <h-radio value="dark" />
      </h-radio-group>
    </h-form-item>
  </h-form>

  <h-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    :helper-theme="helperTheme"
    @submit="submit"
  >
    <h-form-item label="input style" prop="inputStyle">
      <h-radio-group v-model="formData.inputStyle" size="medium">
        <h-radio v-for="item in ['normal', 'emphasize', 'no-border']" :key="item" :value="item" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="Username" prop="username" :validate-trigger="['change']">
      <h-input
        v-model="formData.username"
        :input-style="formData.inputStyle"
        placeholder="Please enter your username"
        :clearable="true"
      />
    </h-form-item>
    <h-form-item
      label="Age"
      prop="age"
      helper-placement="after-label"
      :validate-trigger="['change']"
    >
      <template #helper>Age is between 0 to 120</template>
      <h-input-number
        v-model="formData.age"
        placeholder="Please enter your age"
        :input-style="formData.inputStyle"
        :min="0"
        :max="120"
        :clearable="true"
        @input="onInput"
        @change="onChange"
      />
    </h-form-item>
    <h-form-item label="Province" prop="province">
      <h-select
        v-model="formData.province"
        :input-style="formData.inputStyle"
        placeholder="Please select"
      >
        <h-option label="Beijing" value="beijing" />
        <h-option label="Shanghai" value="shanghai" />
        <h-option label="Hefei" value="hefei" />
      </h-select>
    </h-form-item>
    <h-form-item label="Date" prop="date" :helper="dateHelper">
      <h-date-picker
        v-model="formData.date"
        type="daterange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        start-placeholder="Start date"
        end-placeholder="End date"
        :input-style="formData.inputStyle"
      />
    </h-form-item>
    <h-form-item label="Switch" prop="switch">
      <h-switch v-model="formData.switch" />
    </h-form-item>
    <h-form-item label="Remark" tip="Hint or Error Message" prop="remark">
      <h-input
        v-model="formData.remark"
        placeholder="Type something"
        :input-style="formData.inputStyle"
        :show-limit="true"
        :maxlength="100"
        type="textarea"
      />
    </h-form-item>
    <h-form-item>
      <h-button native-type="submit">Submit</h-button>
    </h-form-item>
  </h-form>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { $message, HFormRule, HFormItemHelper, HFormInstance } from '@aurora/horizon-web';

const helperTheme = ref('light');

const formRef = ref<(HTMLElement & HFormInstance) | null>(null);
const formData = ref({
  inputStyle: 'normal',
  username: '',
  age: null,
  province: null,
  date: [],
  switch: true,
  remark: '',
});

const submit = () => {
  console.info('formData:', formData.value);
  formRef.value
    ?.validate()
    .then(() => {
      $message.success('Submit');
    })
    .catch(err => {
      $message.error(err[0]);
    });
};

const rules: Partial<Record<keyof (typeof formData)['value'], HFormRule | HFormRule[]>> = {
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

const dateHelper: HFormItemHelper = {
  title: 'Tips',
  content: () => h('div', 'Please pick your wish time which you will be free'),
};

function onInput() {
  console.info('input:', formData.value.age);
}

function onChange() {
  console.info('change:', formData.value.age);
}
</script>
