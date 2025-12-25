<template>
  <div class="flex align-center mb-6">
    <div class="mr-4">标签位置</div>
    <n-radio-group v-model="labelPosition" size="small">
      <n-radio-button label="top" />
      <n-radio-button label="left" />
    </n-radio-group>
    <div class="ml-6 mr-4">水平对齐</div>
    <n-radio-group v-model="labelJustifyAlign" size="small">
      <n-radio-button label="left" />
      <n-radio-button label="right" />
    </n-radio-group>
    <div class="ml-6 mr-4">垂直对齐</div>
    <n-radio-group v-model="labelVerticalAlign" size="small">
      <n-radio-button label="top" />
      <n-radio-button label="middle" />
    </n-radio-group>
  </div>
  <n-form
    :label-position="labelPosition"
    :label-justify-align="labelJustifyAlign"
    :label-vertical-align="labelVerticalAlign"
  >
    <n-form-item label="User name">
      <n-input v-model="formData.username" />
    </n-form-item>
    <n-form-item label="Email">
      <n-input v-model="formData.email" />
    </n-form-item>
    <n-form-item label="Notes">
      <n-input v-model="formData.notes" type="textarea" />
    </n-form-item>
    <n-form-item>
      <template #label></template>
      <n-button @click="submit">Submit</n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const formData = ref({
      username: '',
      email: '',
      notes: '',
    });
    const labelPosition = ref('top');
    const labelJustifyAlign = ref('left');
    const labelVerticalAlign = ref('top');
    const submit = () => {
      console.info('formData:', formData.value);
      $message.success('Submit');
    };
    return {
      formData,
      labelPosition,
      labelJustifyAlign,
      labelVerticalAlign,
      submit,
    };
  },
});
</script>
