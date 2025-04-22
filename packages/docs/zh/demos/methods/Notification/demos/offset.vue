<template>
  <div class="demo-wrapper">
    <n-button size="medium" type="primary" plain @click="open1">offset</n-button>
    <n-button size="medium" type="primary" plain @click="open2">gap</n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@nio-fe/lego';

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

<style scoped>
.demo-wrapper .n-button {
  margin-right: 40px;
}
</style>
