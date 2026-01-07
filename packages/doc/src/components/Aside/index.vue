<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import { RouteRecordRaw, useRoute } from 'vue-router';
import AsideMenu from './AsideMenu.vue';

defineProps({
  menus: {
    type: Array as PropType<RouteRecordRaw[]>,
    default: () => [],
  },
});

const selectedValue = ref(location.pathname.replace('/', '') ?? '');
const route = useRoute();

watch(route, val => {
  selectedValue.value = (val.path as string).toLowerCase();
});
</script>

<template>
  <h-menu :selected-value="selectedValue" :exclusive-expand="true" :router="true">
    <AsideMenu :info="menus" />
  </h-menu>
</template>
