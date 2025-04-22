<template>
  <n-space direction="vertical">
    <n-space>
      <n-checkbox v-model="showText" :disabled="!showIcon">是否显示文字</n-checkbox>
      <n-checkbox v-model="showIcon" :disabled="!showText">是否显示图标</n-checkbox>
      <n-checkbox v-model="showBadge">是否显示角标</n-checkbox>
    </n-space>
    <n-segmented default-active-key="All">
      <n-segmented-item v-for="opt in options" :key="opt.label" v-bind="resolveProps(opt)">
        <template #default>
          <n-badge v-if="opt.badge && showBadge" type="num" :num-max="99" :content="opt.badge">
            <div>{{ opt.label }}</div>
          </n-badge>
          <div v-else>{{ opt.label }}</div>
        </template>
      </n-segmented-item>
    </n-segmented>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options = [
  { label: 'All', icon: 'layout' },
  { label: 'List', icon: 'list', badge: 8 },
];

const showText = ref(true);
const showIcon = ref(true);
const showBadge = ref(true);

const resolveProps = (opt: any) => {
  if (showText.value && showIcon.value) return opt;
  if (showText.value) return { label: opt.label };
  if (showIcon.value) return { icon: opt.icon };
  return {};
};
</script>

<style scoped></style>
