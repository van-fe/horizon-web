<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { RouteRecordRaw } from 'vue-router';

const props = defineProps({
  info: {
    type: Array as PropType<RouteRecordRaw[]>,
    required: true,
  },
  parent: {
    type: String,
  },
  level: {
    type: Number,
    default: 0,
  },
});

const sortList = computed(() => props.level === 0 ? props.info : props.info?.sort((a, b) => a.name?.toString().localeCompare(b.name?.toString() ?? '') || 0));
</script>

<template>
  <template v-for="item of sortList">
    <n-sub-menu v-if="item.children?.length" :key="item.path" :index="item.path" :value="item.path">
      <template #title>{{ item?.name }}</template>
      <AsideMenu :info="item.children" :parent="item.path" :level="level + 1" />
    </n-sub-menu>
    <n-menu-item
      v-else
      :value="parent ? `${parent}/${item.path}` : item.path"
    >
      {{ item?.name }}
    </n-menu-item>
  </template>
</template>
