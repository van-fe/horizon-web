<template>
  <n-row>
    <n-col>
      <n-radio-group v-model="size">
        <n-radio label="small" />
        <n-radio label="medium" />
        <n-radio label="large" />
      </n-radio-group>
    </n-col>
  </n-row>
  <n-form :size="size">
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

    const size = ref('medium');

    const submit = () => {
      console.info('formData:', formData.value);
      $message.success('Submit');
    };
    return {
      formData,
      submit,
      size,
    };
  },
});
</script>
