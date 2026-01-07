<template>
  <h-row>
    <h-col :span="24">
      <h-button style="width: 80px" @click="handle">{{ visible ? 'Hide' : 'Show' }}</h-button>
      <h-dropdown
        ref="dropdown"
        trigger="manual"
        align="center"
        :exclusive="false"
        popper-width="108"
      >
        <h-button :text="true">Dropdown Menu</h-button>
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
      <h-dropdown
        trigger="manual"
        align="center"
        :visible="visible"
        :exclusive="false"
        popper-width="108"
      >
        <h-button :text="true">Dropdown Menu (visible prop control)</h-button>
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
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NDropdown } from '@aurora/horizon-web';

const dropdown = ref<typeof NDropdown | null>(null);
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
  margih-left: 12px;
}
</style>
