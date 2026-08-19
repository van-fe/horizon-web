<script setup lang="ts">
import { ref } from 'vue';
import { HButton } from '@aurora/horizon-vue/es/components/Button';
import { HMask } from '@aurora/horizon-vue/es/components/Mask';
import { HSelect } from '@aurora/horizon-vue/es/components/Select';
import { HSpin } from '@aurora/horizon-vue/es/components/Spin';
import { HTime } from '@aurora/horizon-vue/es/components/Time';
import {
  HDescriptionItem,
  HDescriptions,
} from '@aurora/horizon-vue/es/components/Descriptions';
import { HList, HListItem } from '@aurora/horizon-vue/es/components/List';
import { HPageHeader } from '@aurora/horizon-vue/es/components/PageHeader';
import { HPanel, HPanels } from '@aurora/horizon-vue/es/components/Panels';
import { HTree } from '@aurora/horizon-vue/es/components/Tree';

const value = ref<string>();
const options = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta' },
];
const treeData = [{ value: 'ready', label: 'Vue Tree consumer' }];
</script>

<template>
  <HButton>Vue consumer</HButton>
  <HSelect v-model="value" :options="options" />
  <HMask absolute :value="false">Vue mask consumer</HMask>
  <HSpin :spinning="false">Vue spin consumer</HSpin>
  <HTime calculative :time="10" :end-time="15">Vue time consumer</HTime>
  <HTree :tree-data="treeData" />
  <HDescriptions title="Vue descriptions consumer">
    <HDescriptionItem label="Status" value="Ready" />
  </HDescriptions>
  <HList>
    <template #header>Vue list consumer</template>
    <HListItem title="Status" describe="Ready" />
  </HList>
  <HPageHeader :icon="null" title="Vue page header consumer" content="Ready" />
  <HPanels model-value="ready">
    <HPanel name="ready">Vue panels consumer</HPanel>
  </HPanels>
</template>
