<template>
  <n-space>
    <n-button type="normal" @click="open1">自定义宽度</n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@nio-fe/lego';

export default defineComponent({
  setup() {
    const open1 = () => {
      $notify({
        title: '自定义宽度',
        width: '300px',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
      });
    };
    return {
      open1,
    };
  },
});
</script>
