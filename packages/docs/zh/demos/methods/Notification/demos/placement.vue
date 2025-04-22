<template>
  <div class="demo-wrapper">
    <n-button size="medium" type="primary" plain @click="open1">Top Right</n-button>
    <n-button size="medium" type="primary" plain @click="open2">Bottom Right</n-button>
    <n-button size="medium" type="primary" plain @click="open3">Bottom Left</n-button>
    <n-button size="medium" type="primary" plain @click="open4">Top Left</n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@nio-fe/lego';

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

<style scoped>
.demo-wrapper .n-button {
  margin-right: 40px;
}
</style>
