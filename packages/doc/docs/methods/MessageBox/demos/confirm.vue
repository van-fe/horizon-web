<template>
  <n-space block direction="vertical">
    <n-radio-group v-model="type">
      <n-radio>default</n-radio>
      <n-radio value="info">info</n-radio>
      <n-radio value="warning">warning</n-radio>
      <n-radio value="success">info</n-radio>
      <n-radio value="error">error</n-radio>
    </n-radio-group>
    <n-button type="normal" @click="showConfirm">打开 Confirm</n-button>
  </n-space>
</template>

<script lang="ts" setup>
import { $confirm, $message, NMessageBoxProps } from '@nio-fe/lego';
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
