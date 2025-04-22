<template>
  <n-space>
    <n-popover trigger="hover">
      <template #reference>
        <n-button type="normal">悬浮</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <div>show hello</div>
        </n-pop-content>
      </template>
    </n-popover>
    <n-popover trigger="click">
      <template #reference>
        <n-button type="normal">点击</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <div>show hello</div>
        </n-pop-content>
      </template>
    </n-popover>
    <n-popover trigger="click-remain">
      <template #reference>
        <n-button type="normal">点击保留</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <div>Hello World</div>
        </n-pop-content>
      </template>
    </n-popover>
    <n-popover trigger="click-hide">
      <template #reference>
        <n-button type="normal">点击切换</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <div>Hello World</div>
        </n-pop-content>
      </template>
    </n-popover>
    <n-popover trigger="focus">
      <template #reference>
        <n-button type="normal">聚焦</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <div>Hello World</div>
        </n-pop-content>
      </template>
    </n-popover>
    <n-popover trigger="manual" :visible="visible">
      <template #reference>
        <n-button type="normal" @click="visible = true">手动控制</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <n-space>
            click the btn to close!
            <n-button type="danger" plain @click="visible = false">close</n-button>
          </n-space>
        </n-pop-content>
      </template>
    </n-popover>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>
