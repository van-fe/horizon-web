<template>
  <h-button @click="open">打开消息提示</h-button>
  <h-button @click="openVn">VNode</h-button>
  <h-button @click="closeAll">关闭所有消息提示</h-button>
</template>

<script lang="ts" setup>
import { getCurrentInstance, h } from 'vue';
import { $message } from '@aurora/horizon-web';

const instance = getCurrentInstance();

console.info(instance);

const open = () => {
  $message({
    message: '这是一条消息提示',
  });
};
const openVn = () => {
  $message({
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  });
};
const closeAll = () => {
  $message.closeAll();
};
</script>

<style scoped>
.h-button + .h-button {
  margin-left: 10px;
}
</style>
