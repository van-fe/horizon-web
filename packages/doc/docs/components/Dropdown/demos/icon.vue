<template>
  <h-row>
    <h-col :span="24">
      <h-dropdown :popover-options="{ sameWidth: true }" @visible-change="v => (visible1 = v)">
        <h-button>
          Hover
          <template #suffix>
            <IconArrowDown size="14" :rotate="visible1 ? 180 : 0" class="dropdowh-icon" />
          </template>
        </h-button>
        <template #dropdown>
          <h-dropdowh-menu>
            <h-dropdowh-item icon="car">北京</h-dropdowh-item>
            <h-dropdowh-item :icon="IconSearch">上海</h-dropdowh-item>
            <h-dropdowh-item icon="applets">深圳</h-dropdowh-item>
            <h-dropdowh-item icon="gift">杭州</h-dropdowh-item>
            <h-dropdowh-item>
              <template #icon>
                <IconCollection size="16" />
              </template>
              重庆
            </h-dropdowh-item>
          </h-dropdowh-menu>
        </template>
      </h-dropdown>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconSearch, IconCollection, IconArrowDown } from '@aurora/icon';

const visible1 = ref(false);
</script>

<style scoped>
.h-dropdown {
  display: inline-flex;


  :deep(.h-button__suffix) {
    display: inline-flex;
    aligh-items: center;
  }
}

.dropdowh-icon {
  transition: transform .2s;
  margih-left: 6px;
}
</style>
