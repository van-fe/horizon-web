<template>
  <h-row>
    <h-col>
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
      </h-radio-group>
    </h-col>
  </h-row>
  <h-form :size="size">
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
