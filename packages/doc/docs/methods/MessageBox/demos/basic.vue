<template>
  <n-space block direction="vertical">
    <n-radio-group v-model="type">
      <n-radio>default</n-radio>
      <n-radio value="info">info</n-radio>
      <n-radio value="warning">warning</n-radio>
      <n-radio value="success">success</n-radio>
      <n-radio value="error">error</n-radio>
    </n-radio-group>
    <n-button type="normal" @click="showAlert">打开 Alert</n-button>
  </n-space>
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
