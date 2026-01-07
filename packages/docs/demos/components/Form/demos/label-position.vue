<template>
  <div class="flex align-center mb-6">
    <div class="mr-4">标签位置</div>
    <h-radio-group v-model="labelPosition" size="small">
      <h-radio-button label="top" />
      <h-radio-button label="left" />
    </h-radio-group>
    <div class="ml-6 mr-4">水平对齐</div>
    <h-radio-group v-model="labelJustifyAlign" size="small">
      <h-radio-button label="left" />
      <h-radio-button label="right" />
    </h-radio-group>
    <div class="ml-6 mr-4">垂直对齐</div>
    <h-radio-group v-model="labelVerticalAlign" size="small">
      <h-radio-button label="top" />
      <h-radio-button label="middle" />
    </h-radio-group>
  </div>
  <h-form
    :label-position="labelPosition"
    :label-justify-align="labelJustifyAlign"
    :label-vertical-align="labelVerticalAlign"
  >
    <h-form-item label="User name">
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <h-form-item>
      <template #label></template>
      <h-button @click="submit">Submit</h-button>
    </h-form-item>
  </h-form>
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
