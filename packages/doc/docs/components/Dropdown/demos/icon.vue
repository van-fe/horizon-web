<template>
  <n-row>
    <n-col :span="24">
      <n-dropdown :popover-options="{ sameWidth: true }" @visible-change="v => (visible1 = v)">
        <n-button>
          Hover
          <template #suffix>
            <IconArrowDown size="14" :rotate="visible1 ? 180 : 0" class="dropdown-icon" />
          </template>
        </n-button>
        <template #dropdown>
          <n-dropdown-menu>
            <n-dropdown-item icon="car">北京</n-dropdown-item>
            <n-dropdown-item :icon="IconSearch">上海</n-dropdown-item>
            <n-dropdown-item icon="applets">深圳</n-dropdown-item>
            <n-dropdown-item icon="gift">杭州</n-dropdown-item>
            <n-dropdown-item>
              <template #icon>
                <IconCollection size="16" />
              </template>
              重庆
            </n-dropdown-item>
          </n-dropdown-menu>
        </template>
      </n-dropdown>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconSearch, IconCollection, IconArrowDown } from '@aurora/icon';

const visible1 = ref(false);
</script>

<style scoped>
.n-dropdown {
  display: inline-flex;


  :deep(.n-button__suffix) {
    display: inline-flex;
    align-items: center;
  }
}

.dropdown-icon {
  transition: transform .2s;
  margin-left: 6px;
}
</style>
