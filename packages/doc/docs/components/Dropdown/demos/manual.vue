<template>
  <n-row>
    <n-col :span="24">
      <n-button style="width: 80px" @click="handle">{{ visible ? 'Hide' : 'Show' }}</n-button>
      <n-dropdown
        ref="dropdown"
        trigger="manual"
        align="center"
        :exclusive="false"
        popper-width="108"
      >
        <n-button :text="true">Dropdown Menu</n-button>
        <template #dropdown>
          <n-dropdown-menu>
            <n-dropdown-item>北京</n-dropdown-item>
            <n-dropdown-item>上海</n-dropdown-item>
            <n-dropdown-item>深圳</n-dropdown-item>
            <n-dropdown-item>杭州</n-dropdown-item>
            <n-dropdown-item>重庆</n-dropdown-item>
          </n-dropdown-menu>
        </template>
      </n-dropdown>
      <n-dropdown
        trigger="manual"
        align="center"
        :visible="visible"
        :exclusive="false"
        popper-width="108"
      >
        <n-button :text="true">Dropdown Menu (visible prop control)</n-button>
        <template #dropdown>
          <n-dropdown-menu>
            <n-dropdown-item>北京</n-dropdown-item>
            <n-dropdown-item>上海</n-dropdown-item>
            <n-dropdown-item>深圳</n-dropdown-item>
            <n-dropdown-item>杭州</n-dropdown-item>
            <n-dropdown-item>重庆</n-dropdown-item>
          </n-dropdown-menu>
        </template>
      </n-dropdown>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NDropdown } from '@nio-fe/lego';

const dropdown = ref<typeof NDropdown | null>(null);
const visible = ref(false);

function handle() {
  visible.value ? dropdown.value?.handleClose() : dropdown.value?.handleOpen();
  visible.value = !visible.value;
}
</script>

<style scoped>
.n-dropdown {
  display: inline-flex;
}

.n-button + .n-dropdown {
  margin-left: 12px;
}
</style>
