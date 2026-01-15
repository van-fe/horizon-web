<script setup lang="ts">
import { IconPhone, IconMessage, IconStar, IconStarFilled } from '@aurora/icon';
import { $message } from '@aurora/horizon-web';
import { ref } from 'vue';

const isStared = ref(false);

function onCommand(type: 'star' | 'call' | 'msn') {
  switch (type) {
    case 'star':
      isStared.value = !isStared.value;
      break;
    case 'call':
      $message.info('沟通');
      break;
    case 'msn':
      $message.info('发送信息');
      break;
  }
}
</script>

<template>
  <div class="container">
    <div class="content">
      <h-avatar size="small" />
      <div class="name">
        William Li
      </div>
    </div>
    <div class="controls">
      <h-controls theme="dark" @command="onCommand">
        <h-control :icon="isStared ? IconStarFilled : IconStar" text="关注" label="star" :icon-color="isStared ? ['gold'] : undefined" />
        <h-control :icon="IconPhone" label="call">
          <template #text>沟通</template>
        </h-control>
        <h-control :icon="IconMessage" text="发送信息" label="msn" />
      </h-controls>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 300px;
  height: 50px;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--h-text-secondary);
}

.container .content {
    flex: 1;
    padding: 8px;
    display: flex;
    align-items: center;
}

.container .content .name {
    margin-left: 8px;
}

.container .controls {
    flex: 0 0 80px;
}
</style>
