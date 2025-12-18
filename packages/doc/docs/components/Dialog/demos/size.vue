<template>
  <n-space block direction="vertical">
    <n-radio-group v-model="size">
      <n-radio value="small">small</n-radio>
      <n-radio value="medium">medium</n-radio>
      <n-radio value="large">large</n-radio>
      <n-radio value="huge">huge</n-radio>
    </n-radio-group>
    <n-button plain type="normal" @click="visible = true">点击打开Dialog</n-button>
  </n-space>
  <n-dialog v-model:visible="visible" title="Title" :size="size" @ok="onOk">
    <div>
      Quisquam ut non quae numquam quaerat voluptatem odio autem. Magnam distinctio et sint et eos
      nesciunt quidem. Molestias numquam labore rerum doloremque iusto. Omnis modi ducimus odio
      laudantium qui eius ut ea rem.
    </div>
  </n-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { DialogProps } from '@nio-fe/lego/es/components/Dialog/src/composables/useProps';
import { $message } from '@nio-fe/lego';

const size = ref<DialogProps['size']>('medium');
const visible = ref(false);

const onOk = () => {
  $message.success('点击了确定按钮');
  visible.value = false;
};
</script>
