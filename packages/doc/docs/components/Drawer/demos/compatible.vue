<template>
  <h-space>
    <h-button type="normal" @click="visible1 = true">打开抽屉（隐藏抽屉底部）</h-button>
    <h-button type="normal" @click="visible3 = true">打开抽屉（兼容兼容）</h-button>
    <h-button type="normal" @click="visible4 = true">打开抽屉自定义标题插槽（兼容模式）</h-button>
    <h-button type="normal" @click="visible0 = true">打开抽屉（隐藏抽屉头部）</h-button>
    <h-button type="normal" @click="visible2 = true">打开抽屉（最新特性）</h-button>
  </h-space>

  <h-drawer v-model:visible="visible0" position="right" @ok="visible0 = false">
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </h-drawer>

  <h-drawer
    v-model:visible="visible1"
    title="Title"
    :closable="false"
    :primary-button="false"
    :secondary-button="false"
    placement="right"
  >
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
    <template #footer></template>
  </h-drawer>

  <h-drawer v-model:visible="visible2" v2 placement="right" :header="false" :footer="false">
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </h-drawer>

  <h-drawer
    v-model="visible3"
    position="left"
    primary-text="Primary Text"
    secondary-text="Secondary Text"
    @primary-click="visible3 = false"
  >
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </h-drawer>

  <h-drawer
    v-model="visible4"
    position="right"
    primary-text="Primary Text"
    secondary-text="Secondary Text"
    @primary-click="visible3 = false"
  >
    <template #title>
      <div class="flex aligh-center" style="column-gap: 10px">
        <h-button icon="close" text size="small" @click="visible4 = false" />
        <div>This Version 1 Title</div>
      </div>
    </template>
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </h-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible0 = ref(false);
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
</script>

<style scoped></style>
