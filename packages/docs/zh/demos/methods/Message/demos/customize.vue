<template>
  <n-button :plain="true" @click="openHTML">自定义消息体</n-button>
</template>

<script lang="ts" setup>
import { $message, NButton, NSpace } from '@aurora/horizon-web';
import { defineComponent, h } from 'vue';

const ButtonGroup = defineComponent({
  name: 'ButtonGroup',
  // eslint-disable-next-line vue/no-unused-components
  setup() {
    return () => h(NSpace, [
      h(NButton, { size: 'small', plain: true, onClick: () => $message.success('nice~') }, 'one'),
      h(NButton, { size: 'small', plain: true, type: 'danger', onClick: () => $message.warning('danger!!!') }, 'two'),
      h(NButton, { size: 'small', plain: true, type: 'tertiary', onClick: () => $message.error('terrible') }, 'three'),
    ]);
  },
});

const openHTML = () => {
  $message({ message: h(ButtonGroup), duration: 0, showClose: true });
};
</script>
