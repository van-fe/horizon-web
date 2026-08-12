<script setup lang="ts">
import { ref } from 'vue';
import { HButton } from '@aurora/horizon-web-vue/es/components/Button';
import { HMask } from '@aurora/horizon-web-vue/es/components/Mask';
import { HSelect } from '@aurora/horizon-web-vue/es/components/Select';
import { HSpin } from '@aurora/horizon-web-vue/es/components/Spin';
import { HTime } from '@aurora/horizon-web-vue/es/components/Time';

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
</template>
