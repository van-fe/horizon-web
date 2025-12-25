<template>
  <n-button @click="visible = true">点我</n-button>
  <n-dialog
    v-model="visible"
    title="标题"
    vertical-position="top"
    :top="100"
    @primaryClick="onPrimary"
    @secondaryClick="onSecondary"
  >
    <div>随便写点什么</div>
  </n-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const visible = ref(false);
    const onPrimary = () => {
      console.info('Primary button clicked!');
    };
    const onSecondary = () => {
      console.info('Secondary button clicked!');
      visible.value = false;
    };
    return {
      visible,
      onPrimary,
      onSecondary,
    };
  },
});
</script>
