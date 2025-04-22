<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import { RouteRecordRaw, useRoute } from 'vue-router';
import AsideMenu from './AsideMenu.vue';
import { getRouterBase } from '@nio-wad/fx-web';

defineProps({
  menus: {
    type: Array as PropType<RouteRecordRaw[]>,
    default: () => [],
  },
});

const selectedValue = ref(location.pathname.replace(getRouterBase(), '/') ?? '');
const route = useRoute();

watch(route, val => {
  selectedValue.value = (val.path as string).toLowerCase();
});
</script>

<template>
  <n-menu :selected-value="selectedValue" :exclusive-expand="true" :router="true">
    <AsideMenu :info="menus" />
  </n-menu>
</template>
