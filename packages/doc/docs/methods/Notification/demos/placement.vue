<template>
  <h-space>
    <h-button type="normal" @click="open1">topRight</h-button>
    <h-button type="normal" @click="open2">bottomRight</h-button>
    <h-button type="normal" @click="open3">bottomLeft</h-button>
    <h-button type="normal" @click="open4">topLeft</h-button>
  </h-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const open1 = () => {
      $notify({
        title: 'Top Right',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        placement: 'top-right',
      });
    };
    const open2 = () => {
      $notify({
        title: 'Bottom Right',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        placement: 'bottom-right',
      });
    };
    const open3 = () => {
      $notify({
        title: 'Bottom Left',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        placement: 'bottom-left',
      });
    };
    const open4 = () => {
      $notify({
        title: 'Top Left',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        placement: 'top-left',
      });
    };
    return {
      open1,
      open2,
      open3,
      open4,
    };
  },
});
</script>
