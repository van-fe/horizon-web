<template>
  <n-button v-popconfirm="optionsRef" @click="del">Delete</n-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    return {
      optionsRef: ref({
        title: '确定要删除吗？',
        okText: '确定',
        okButtonProps: {
          type: 'primary',
          kind: 'negative',
        },
        cancelText: '取消',
        cancelButtonProps: {
          type: 'text',
          kind: 'neutral',
        },
      }),
      del: () => {
        $message('Action!');
      },
    };
  },
});
</script>
