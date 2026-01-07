<template>
  <h-space>
    <h-popover trigger="hover">
      <template #reference>
        <h-button>hover</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div>show hello</div>
        </h-pop-content>
      </template>
    </h-popover>
    <h-popover trigger="click">
      <template #reference>
        <h-button>click</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div>show hello</div>
        </h-pop-content>
      </template>
    </h-popover>
    <h-popover trigger="click-remain">
      <template #reference>
        <h-button>click-remain</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div>Hello World</div>
        </h-pop-content>
      </template>
    </h-popover>
    <h-popover trigger="click-hide">
      <template #reference>
        <h-button>click-hide</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div>Hello World</div>
        </h-pop-content>
      </template>
    </h-popover>
    <h-popover trigger="focus">
      <template #reference>
        <h-button>focus</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div>Hello World</div>
        </h-pop-content>
      </template>
    </h-popover>
    <h-popover trigger="manual" :visible="visible">
      <template #reference>
        <h-button @click="visible = true">open</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <h-space>
            click the btn to close!
            <h-button type="danger" @click="visible = false">close</h-button>
          </h-space>
        </h-pop-content>
      </template>
    </h-popover>
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>
