<template>
  <h-space block direction="vertical">
    <h-radio-group v-model="placement">
      <h-radio label="right">右 - right（默认）</h-radio>
      <h-radio label="bottom">下 - bottom</h-radio>
      <h-radio label="left">左 - left</h-radio>
      <h-radio label="top">上 - top</h-radio>
    </h-radio-group>
    <h-button type="normal" @click="visible = true">打开抽屉</h-button>
  </h-space>
  <h-drawer
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
  </h-drawer>
</template>

<script lang="ts" setup>
import { DrawerPlacement } from '@aurora/horizon-web/es/components/Drawer/src/composables/useProps';
import { ref } from 'vue';

const placement = ref<DrawerPlacement>('right');
const visible = ref(false);
</script>
