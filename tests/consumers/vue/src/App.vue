<script setup lang="ts">
import { ref } from 'vue';
import { HButton } from '@aurora/horizon-web-vue/es/components/Button';
import { HMask } from '@aurora/horizon-web-vue/es/components/Mask';
import { HSelect } from '@aurora/horizon-web-vue/es/components/Select';
import { HSpin } from '@aurora/horizon-web-vue/es/components/Spin';
import { HTime } from '@aurora/horizon-web-vue/es/components/Time';
import {
  HDescriptionItem,
  HDescriptions,
} from '@aurora/horizon-web-vue/es/components/Descriptions';
import { HList, HListItem } from '@aurora/horizon-web-vue/es/components/List';
import { HPageHeader } from '@aurora/horizon-web-vue/es/components/PageHeader';

const value = ref<string>();
const options = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta' },
];
</script>

<template>
  <HButton>Vue consumer</HButton>
  <HSelect v-model="value" :options="options" />
  <HMask absolute :value="false">Vue mask consumer</HMask>
  <HSpin :spinning="false">Vue spin consumer</HSpin>
  <HTime calculative :time="10" :end-time="15">Vue time consumer</HTime>
  <HDescriptions title="Vue descriptions consumer">
    <HDescriptionItem label="Status" value="Ready" />
  </HDescriptions>
  <HList>
    <template #header>Vue list consumer</template>
    <HListItem title="Status" describe="Ready" />
  </HList>
  <HPageHeader :icon="null" title="Vue page header consumer" content="Ready" />
</template>
