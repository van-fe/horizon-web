<template>
  <div class="demo-wrapper">
    <h-button size="medium" type="primary" plain @click="open1">自动关闭</h-button>
    <h-button size="medium" type="primary" plain @click="open2">不自动关闭</h-button>
  </div>
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

<style scoped>
.demo-wrapper .h-button {
  margin-right: 40px;
}
</style>
