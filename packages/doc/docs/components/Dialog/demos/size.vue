<template>
  <h-space block direction="vertical">
    <h-radio-group v-model="size">
      <h-radio value="small">small</h-radio>
      <h-radio value="medium">medium</h-radio>
      <h-radio value="large">large</h-radio>
      <h-radio value="huge">huge</h-radio>
    </h-radio-group>
    <h-button plain type="normal" @click="visible = true">点击打开Dialog</h-button>
  </h-space>
  <h-dialog v-model:visible="visible" title="Title" :size="size" @ok="onOk">
    <div>
      Quisquam ut non quae numquam quaerat voluptatem odio autem. Magnam distinctio et sint et eos
      nesciunt quidem. Molestias numquam labore rerum doloremque iusto. Omnis modi ducimus odio
      laudantium qui eius ut ea rem.
    </div>
  </h-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { DialogProps } from '@aurora/horizon-web/es/components/Dialog/src/composables/useProps';
import { $message } from '@aurora/horizon-web';

const size = ref<DialogProps['size']>('medium');
const visible = ref(false);

const onOk = () => {
  $message.success('点击了确定按钮');
  visible.value = false;
};
</script>
