<template>
  <h-row>
    <h-col :span="24">
      <h-button style="width: 80px" @click="handle">{{ visible ? 'Hide' : 'Show' }}</h-button>
      <h-dropdown ref="dropdown" trigger="manual" align="center" :exclusive="false">
        <h-button :text="true">Dropdown Menu</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item>北京</h-dropdown-item>
            <h-dropdown-item>上海</h-dropdown-item>
            <h-dropdown-item>深圳</h-dropdown-item>
            <h-dropdown-item>杭州</h-dropdown-item>
            <h-dropdown-item>重庆</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
      <h-dropdown trigger="manual" align="center" :visible="visible" :exclusive="false">
        <h-button :text="true">Dropdown Menu (visible prop control)</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item>北京</h-dropdown-item>
            <h-dropdown-item>上海</h-dropdown-item>
            <h-dropdown-item>深圳</h-dropdown-item>
            <h-dropdown-item>杭州</h-dropdown-item>
            <h-dropdown-item>重庆</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { HDropdown } from '@aurora/horizon-web';
import { ref } from 'vue';

const dropdown = ref<typeof HDropdown | null>(null);
const visible = ref(false);

function handle() {
  visible.value ? dropdown.value?.handleClose() : dropdown.value?.handleOpen();
  visible.value = !visible.value;
}
</script>

<style scoped>
.h-dropdown {
  display: inline-flex;
}

.h-button + .h-dropdown {
  margin-left: 12px;
}
</style>
