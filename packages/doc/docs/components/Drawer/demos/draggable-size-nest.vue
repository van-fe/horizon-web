<template>
  <h-space block direction="vertical">
    <h-radio-group v-model="placement">
      <h-radio label="right">右 - right（默认）</h-radio>
      <h-radio label="bottom">下 - bottom</h-radio>
      <h-radio label="left">左 - left</h-radio>
      <h-radio label="top">上 - top</h-radio>
    </h-radio-group>
    <h-button v-if="!visible" type="normal" @click="visible = true">打开抽屉</h-button>
    <h-button v-else type="danger" plain @click="visible = false">关闭抽屉</h-button>
  </h-space>

  <h-drawer
    v-model:visible="visible"
    push
    :placement="placement"
    v2
    size-draggable
    title="Title 1"
    :footer="false"
  >
    <h-space block direction="vertical">
      <div>
        You can customize modal body text by the current situation. This modal will be closed
        immediately once you press the OK button.
      </div>
      <h-button v-if="!visible2" type="normal" @click="visible2 = true">打开新抽屉</h-button>
      <h-button v-else type="danger" plain @click="visible2 = false">关闭抽屉</h-button>
    </h-space>
  </h-drawer>

  <h-drawer
    v-model:visible="visible2"
    :placement="placement"
    v2
    push
    :mask="false"
    title="New Drawer 1"
    :footer="false"
    size-draggable
  >
    <h-space block direction="vertical">This is new drawer</h-space>
  </h-drawer>
</template>

<script lang="ts" setup>
import { DrawerPlacement } from '@aurora/horizon-web/es/components/Drawer/src/composables/useProps';
import { ref } from 'vue';

const placement = ref<DrawerPlacement>('right');
const visible = ref(false);
const visible2 = ref(false);
</script>
