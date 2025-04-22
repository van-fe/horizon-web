<template>
  <n-space>
    <n-popover trigger="hover">
      <template #reference>
        <n-button>hover</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <div>show hello</div>
        </n-pop-content>
      </template>
    </n-popover>
    <n-popover trigger="click">
      <template #reference>
        <n-button>click</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <div>show hello</div>
        </n-pop-content>
      </template>
    </n-popover>
    <n-popover trigger="click-remain">
      <template #reference>
        <n-button>click-remain</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <div>Hello World</div>
        </n-pop-content>
      </template>
    </n-popover>
    <n-popover trigger="click-hide">
      <template #reference>
        <n-button>click-hide</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <div>Hello World</div>
        </n-pop-content>
      </template>
    </n-popover>
    <n-popover trigger="focus">
      <template #reference>
        <n-button>focus</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <div>Hello World</div>
        </n-pop-content>
      </template>
    </n-popover>
    <n-popover trigger="manual" :visible="visible">
      <template #reference>
        <n-button @click="visible = true">open</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <n-space>
            click the btn to close!
            <n-button type="danger" @click="visible = false">close</n-button>
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
