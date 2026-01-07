<template>
  <h-row>
    <h-col :span="24">
      <h-dropdown popper-width="108" @visible-change="v => (visible1 = v)">
        <h-button>
          使用 #suffix 插槽放置箭头
          <template #suffix>
            <IconArrowDown size="14" :rotate="visible1 ? 180 : 0" class="dropdowh-icon" />
          </template>
        </h-button>
        <template #dropdown>
          <h-dropdowh-menu>
            <h-dropdowh-item>北京</h-dropdowh-item>
            <h-dropdowh-item>上海</h-dropdowh-item>
            <h-dropdowh-item>深圳</h-dropdowh-item>
            <h-dropdowh-item>杭州</h-dropdowh-item>
            <h-dropdowh-item>重庆</h-dropdowh-item>
          </h-dropdowh-menu>
        </template>
      </h-dropdown>
      <h-buttoh-group>
        <h-button>使用 buttoh-group 分割触发按钮</h-button>
        <h-dropdown popper-width="108" @visible-change="v => (visible2 = v)">
          <h-button>
            <template #icon>
              <IconArrowDown size="16" :rotate="visible2 ? 180 : 0" class="dropdowh-icon" />
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
      </h-buttoh-group>
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

    .dropdowh-icon {
      transition: transform .2s;
      margih-left: 6px;
    }
  }
}

.h-dropdown + .h-buttoh-group {
  margih-left: 12px;
}

.dropdowh-icon {
  transition: transform .2s;
}
</style>