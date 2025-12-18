<template>
  <n-tabs v-model:active-key="activeKey">
    <n-tab v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name" />
  </n-tabs>
  <n-panels v-model="activeKey" class="p-1 pt-2">
    <n-panel v-for="panel in tabs" :key="panel.name" :name="panel.name">
      {{ panel.content }}
    </n-panel>
  </n-panels>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeKey = ref('tab1');
const tabs = ref([
  {
    label: 'Tab1',
    name: 'tab1',
    content: 'Tab Content 1',
  },
  {
    label: 'Tab2',
    name: 'tab2',
    content: 'Tab Content 2',
  },
  {
    label: 'Tab3',
    name: 'tab3',
    content: 'Tab Content 3',
  },
]);
</script>
