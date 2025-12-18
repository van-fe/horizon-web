<template>
  <n-space block direction="vertical">
    <n-radio-group v-model="placement">
      <n-radio label="right">右 - right（默认）</n-radio>
      <n-radio label="bottom">下 - bottom</n-radio>
      <n-radio label="left">左 - left</n-radio>
      <n-radio label="top">上 - top</n-radio>
    </n-radio-group>
    <n-button v-if="!visible" type="normal" @click="visible = true">打开抽屉</n-button>
    <n-button v-else type="danger" plain @click="visible = false">关闭抽屉</n-button>
  </n-space>

  <n-drawer
    v-model:visible="visible"
    size="large"
    v2
    title="Title 1"
    :placement="placement"
    :footer="false"
  >
    <n-space block direction="vertical">
      <div>
        You can customize modal body text by the current situation. This modal will be closed
        immediately once you press the OK button.
      </div>
      <n-button v-if="!visible2" type="normal" @click="visible2 = true">打开抽屉 1</n-button>
      <n-button v-else type="danger" plain @click="visible2 = false">关闭抽屉 1</n-button>
    </n-space>
  </n-drawer>

  <n-drawer
    v-model:visible="visible2"
    v2
    title="New Drawer 1"
    :placement="placement"
    :footer="false"
  >
    <n-space block direction="vertical">
      This is new drawer
      <n-button v-if="!visible3" type="normal" @click="visible3 = true">打开新抽屉</n-button>
      <n-button v-else type="danger" plain @click="visible3 = false">Close Drawer 2</n-button>
    </n-space>
  </n-drawer>

  <n-drawer
    v-model:visible="visible3"
    size="small"
    v2
    title="New Drawer 2"
    :placement="placement"
    :footer="false"
  >
    <n-space block direction="vertical">
      This is new drawer
      <n-button v-if="!visible4" type="normal" @click="visible4 = true">打开抽屉 3</n-button>
      <n-button v-else type="danger" plain @click="visible4 = false">关闭抽屉 3</n-button>
    </n-space>
  </n-drawer>
  <n-drawer
    v-model:visible="visible4"
    v2
    title="New Drawer 3"
    :placement="placement"
    :footer="false"
  >
    This is new drawer
  </n-drawer>
</template>

<script lang="ts" setup>
import { DrawerPlacement } from '@aurora/horizon-web/es/components/Drawer/src/composables/useProps';
import { ref } from 'vue';

const placement = ref<DrawerPlacement>('right');
const visible = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
</script>
