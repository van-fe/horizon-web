<template>
  <h-button @click="visible = true">点我</h-button>
  <h-dialog v-model:visible="visible" title="标题" @ok="onPrimary" @cancel="onSecondary">
    <div>点击 OK 会打开第二个 Dialog</div>
    <div>点击 Cancel 会关闭当前 Dialog</div>
  </h-dialog>

  <h-dialog v-model:visible="visible2" title="标题" @ok="onPrimary2" @cancel="onSecondary2">
    <div>点击 OK 会关闭当前 Dialog</div>
    <div>点击 Cancel 会关闭所有 Dialog</div>
  </h-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const visible = ref(false);
    const visible2 = ref(false);
    const onPrimary = () => {
      console.info('Primary button clicked!');
      visible2.value = true;
    };
    const onPrimary2 = () => {
      console.info(`2nd dialog's primary button clicked!`);
      visible2.value = false;
    };
    const onSecondary = () => {
      console.info('Secondary button clicked!');
      visible.value = false;
    };
    const onSecondary2 = () => {
      console.info("2nd dialog's secondary button clicked!");
      visible.value = false;
      visible2.value = false;
    };
    return {
      visible,
      visible2,
      onPrimary,
      onSecondary,
      onPrimary2,
      onSecondary2,
    };
  },
});
</script>
