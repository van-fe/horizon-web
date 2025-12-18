<template>
  <n-button plain type="normal" @click="visible = true">点击打开Dialog</n-button>
  <n-dialog
    v-model:visible="visible"
    title="Title"
    :top="100"
    @ok="onOk"
    @cancel="onCancel"
  >
    <div>
      Quisquam ut non quae numquam quaerat voluptatem odio autem. Magnam distinctio et sint et eos
      nesciunt quidem. Molestias numquam labore rerum doloremque iusto. Omnis modi ducimus odio
      laudantium qui eius ut ea rem.
    </div>
  </n-dialog>
</template>

<script lang="ts" setup>
import { $message } from '@nio-fe/lego';
import { ref } from 'vue';

const visible = ref(false);

const onOk = () => {
  $message.success('点击了确定按钮');
  visible.value = false;
};

const onCancel = () => {
  $message.info('点击了取消按钮');
};
</script>
