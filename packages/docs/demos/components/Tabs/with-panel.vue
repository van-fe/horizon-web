<template>
  <h-tabs v-model:active-key="activeKey">
    <h-tab v-for="tab in tabs" :key="tab.name" :label="tab.label" />
  </h-tabs>
  <h-panels v-model="activeKey" class="p-1 pt-2">
    <h-panel v-for="panel in tabs" :key="panel.name" :name="panel.name">
      {{ panel.content }}
    </h-panel>
  </h-panels>
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
