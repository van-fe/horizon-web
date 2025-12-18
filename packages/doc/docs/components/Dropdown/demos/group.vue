<template>
  <n-row>
    <n-col :span="24">
      <n-dropdown :popover-options="{ sameWidth: true }" @visible-change="v => (visible1 = v)">
        <n-button>
          no title
          <template #suffix>
            <IconArrowDown size="14" :rotate="visible1 ? 180 : 0" class="dropdown-icon" />
          </template>
        </n-button>
        <template #dropdown>
          <n-dropdown-menu>
            <n-dropdown-group>
              <n-dropdown-item>北京</n-dropdown-item>
              <n-dropdown-item>上海</n-dropdown-item>
              <n-dropdown-item>重庆</n-dropdown-item>
            </n-dropdown-group>
            <n-dropdown-item>深圳</n-dropdown-item>
            <n-dropdown-item>杭州</n-dropdown-item>
          </n-dropdown-menu>
        </template>
      </n-dropdown>
      <n-dropdown :popover-options="{ sameWidth: true }" @visible-change="v => (visible2 = v)">
        <n-button>
          with title
          <template #suffix>
            <IconArrowDown size="14" :rotate="visible2 ? 180 : 0" class="dropdown-icon" />
          </template>
        </n-button>
        <n-dropdown-menu>
          <n-dropdown-group>
            <template #title>直辖市</template>
            <n-dropdown-item>北京</n-dropdown-item>
            <n-dropdown-item>上海</n-dropdown-item>
            <n-dropdown-item>重庆</n-dropdown-item>
          </n-dropdown-group>
          <n-dropdown-group>
            <template #title>其他城市</template>
            <n-dropdown-item>深圳</n-dropdown-item>
            <n-dropdown-item>杭州</n-dropdown-item>
          </n-dropdown-group>
        </n-dropdown-menu>
      </n-dropdown>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconArrowDown } from '@aurora/icon';

const visible1 = ref(false);
const visible2 = ref(false);
</script>

<style scoped>
.n-dropdown {
  display: inline-flex;


  :deep(.n-button__suffix) {
    display: inline-flex;
    align-items: center;
  }
}

.n-dropdown + .n-dropdown {
  margin-left: 12px;
}

.dropdown-icon {
  transition: transform .2s;
  margin-left: 6px;
}
</style>
