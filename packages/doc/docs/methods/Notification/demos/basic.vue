<template>
  <n-space>
    <n-button type="normal" @click="open1">自动关闭</n-button>
    <n-button type="normal" @click="open2">不自动关闭</n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const open1 = () => {
      $notify({
        title: '自动关闭',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
      });
    };
    const open2 = () => {
      $notify({
        title: '不自动关闭',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        duration: 0,
      });
    };
    return {
      open1,
      open2,
    };
  },
});
</script>
