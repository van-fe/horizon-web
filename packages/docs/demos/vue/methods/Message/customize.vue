<template>
  <h-button :plain="true" @click="openHTML">自定义消息体</h-button>
</template>

<script lang="ts" setup>
import { $message, HButton, HSpace } from '@aurora/horizon-web';
import { defineComponent, h } from 'vue';

const ButtonGroup = defineComponent({
  name: 'ButtonGroup',
  // eslint-disable-next-line vue/no-unused-components
  setup() {
    return () => h(HSpace, [
      h(HButton, { size: 'small', plain: true, onClick: () => $message.success('nice~') }, 'one'),
      h(HButton, { size: 'small', plain: true, type: 'danger', onClick: () => $message.warning('danger!!!') }, 'two'),
      h(HButton, { size: 'small', plain: true, type: 'tertiary', onClick: () => $message.error('terrible') }, 'three'),
    ]);
  },
});

const openHTML = () => {
  $message({ message: h(ButtonGroup), duration: 0, showClose: true });
};
</script>
