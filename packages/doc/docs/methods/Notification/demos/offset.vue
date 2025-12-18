<template>
  <n-space>
    <n-button type="normal" @click="open1">设置偏移</n-button>
    <n-button type="normal" @click="open2">设置间距</n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const open1 = () => {
      $notify({
        title: 'Offset',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        offset: 60,
      });
    };
    const open2 = () => {
      $notify({
        title: 'Gap',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        offset: 60,
        gap: 20,
      });
    };
    return {
      open1,
      open2,
    };
  },
});
</script>

