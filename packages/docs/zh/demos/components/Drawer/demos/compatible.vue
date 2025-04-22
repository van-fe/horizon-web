<template>
  <div class="example">
    <n-button @click="visible0 = true">Open Drawer no header</n-button>
    <n-button @click="visible1 = true">Open Drawer no footer</n-button>
    <n-button @click="visible3 = true">Open Drawer v1</n-button>
    <n-button @click="visible4 = true">Open Drawer v1 custom title</n-button>
    <n-button @click="visible2 = true">Open Drawer v2</n-button>
  </div>

  <n-drawer v-model:visible="visible0" position="right" @ok="visible0 = false">
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </n-drawer>

  <n-drawer
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
  </n-drawer>

  <n-drawer v-model:visible="visible2" v2 placement="right" :header="false" :footer="false">
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </n-drawer>

  <n-drawer
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
  </n-drawer>

  <n-drawer
    v-model="visible4"
    position="right"
    primary-text="Primary Text"
    secondary-text="Secondary Text"
    @primary-click="visible3 = false"
  >
    <template #title>
      <div class="flex align-center" style="column-gap: 10px">
        <n-button icon="close" text size="small" @click="visible4 = false" />
        <div>This Version 1 Title</div>
      </div>
    </template>
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </n-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible0 = ref(false);
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
</script>

<style scoped>
.example {
  display: inline-grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

:deep(.n-button + .n-button:not(.n-button--block)) {
  margin-left: 0;
}
</style>
