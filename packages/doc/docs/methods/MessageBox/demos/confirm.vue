<template>
  <h-space block direction="vertical">
    <h-radio-group v-model="type">
      <h-radio>default</h-radio>
      <h-radio value="info">info</h-radio>
      <h-radio value="warning">warning</h-radio>
      <h-radio value="success">info</h-radio>
      <h-radio value="error">error</h-radio>
    </h-radio-group>
    <h-button type="normal" @click="showConfirm">打开 Confirm</h-button>
  </h-space>
</template>

<script lang="ts" setup>
import { $confirm, $message, NMessageBoxProps } from '@aurora/horizon-web';
import { ref } from 'vue';

const fakeSentences = `Quasi et dolore ipsum aut. Nemo earum corrupti eos magnam perspiciatis repudiandae assumenda quo aut. Et nisi optio unde dicta. Reprehenderit illo assumenda expedita animi eos.`;
const type = ref<NMessageBoxProps['type']>();
const showConfirm = async () => {
  try {
    const close = await $confirm(fakeSentences, 'Confirm', { type: type.value });
    close();
    $message.success('OK clicked!');
  } catch (error) {
    $message.warning('Cancel clicked!');
  }
};
</script>
