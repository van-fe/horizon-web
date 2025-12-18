<template>
  <n-space block direction="vertical">
    <n-radio-group v-model="placement">
      <n-radio label="right">右 - right（默认）</n-radio>
      <n-radio label="bottom">下 - bottom</n-radio>
      <n-radio label="left">左 - left</n-radio>
      <n-radio label="top">上 - top</n-radio>
    </n-radio-group>
    <n-button type="normal" @click="visible = true">打开抽屉</n-button>
  </n-space>
  <n-drawer
    v-model:visible="visible"
    v2
    size-draggable
    title="Title"
    :placement="placement"
    :footer="false"
  >
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </n-drawer>
</template>

<script lang="ts" setup>
import { DrawerPlacement } from '@nio-fe/lego/es/components/Drawer/src/composables/useProps';
import { ref } from 'vue';

const placement = ref<DrawerPlacement>('right');
const visible = ref(false);
</script>
