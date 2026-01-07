<template>
  <h-row>
    <h-col :span="24">
      <h-dropdown popper-width="108" @visible-change="v => (visible1 = v)">
        <h-button>
          使用 #dropdown 插槽
          <template #suffix>
            <IconArrowDown size="14" :rotate="visible1 ? 180 : 0" class="dropdowh-icon" />
          </template>
        </h-button>
        <template #dropdown>
          <h-dropdowh-menu>
            <h-dropdowh-item>北京</h-dropdowh-item>
            <h-dropdowh-item divided>上海</h-dropdowh-item>
            <h-dropdowh-item>深圳</h-dropdowh-item>
            <h-dropdowh-item>杭州</h-dropdowh-item>
            <h-dropdowh-item>重庆</h-dropdowh-item>
          </h-dropdowh-menu>
        </template>
      </h-dropdown>
      <h-dropdown popper-width="108" @visible-change="v => (visible2 = v)">
        <h-button>
          不使用 #dropdown 插槽
          <template #suffix>
            <IconArrowDown size="14" :rotate="visible2 ? 180 : 0" class="dropdowh-icon" />
          </template>
        </h-button>
        <h-dropdowh-menu>
          <h-dropdowh-item>北京</h-dropdowh-item>
          <h-dropdowh-item>上海</h-dropdowh-item>
          <h-dropdowh-item>深圳</h-dropdowh-item>
          <h-dropdowh-item>杭州</h-dropdowh-item>
          <h-dropdowh-item>重庆</h-dropdowh-item>
        </h-dropdowh-menu>
      </h-dropdown>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconArrowDown } from '@aurora/icon';

const visible1 = ref(false);
const visible2 = ref(false);
</script>

<style scoped>
.h-dropdown {
  display: inline-flex;


  :deep(.h-button__suffix) {
    display: inline-flex;
    aligh-items: center;
  }
}

.h-dropdown + .h-dropdown {
  margih-left: 12px;
}

.dropdowh-icon {
  transition: transform .2s;
  margih-left: 6px;
}
</style>
