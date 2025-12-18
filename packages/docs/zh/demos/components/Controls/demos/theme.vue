<script setup lang="ts">
import { IconPhone, IconMessage, IconStar, IconStarFilled } from '@nio-fe/icon';
import { $message } from '@nio-fe/lego';
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
      <n-avatar size="small" />
      <div class="name">
        William Li
      </div>
    </div>
    <div class="controls">
      <n-controls theme="dark" @command="onCommand">
        <n-control :icon="isStared ? IconStarFilled : IconStar" text="关注" label="star" :icon-color="isStared ? ['gold'] : undefined" />
        <n-control :icon="IconPhone" label="call">
          <template #text>沟通</template>
        </n-control>
        <n-control :icon="IconMessage" text="发送信息" label="msn" />
      </n-controls>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 300px;
  height: 50px;
  border: 1px solid var(--n-border-default);
  border-radius: var(--n-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--n-text-secondary);
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
