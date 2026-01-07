<template>
  <h-space block direction="vertical">
    <h-radio-group v-model="type">
      <h-radio>default</h-radio>
      <h-radio value="info">info</h-radio>
      <h-radio value="warning">warning</h-radio>
      <h-radio value="success">success</h-radio>
      <h-radio value="error">error</h-radio>
    </h-radio-group>
    <h-button type="normal" @click="showAlert">打开 Alert</h-button>
  </h-space>
</template>

<script lang="ts" setup>
import { $alert, $message, NMessageBoxProps } from '@aurora/horizon-web';
import { ref } from 'vue';

const fakeSentences = `Quasi et dolore ipsum aut. Nemo earum corrupti eos magnam perspiciatis repudiandae assumenda quo aut. Et nisi optio unde dicta. Reprehenderit illo assumenda expedita animi eos.`;
const type = ref<NMessageBoxProps['type']>();
const showAlert = async () => {
  try {
    await $alert(fakeSentences, 'Alert', { type: type.value });
    $message.success('OK clicked!');
  } catch (error) {
    $message.warning('Cancel clicked!');
  }
};
</script>
