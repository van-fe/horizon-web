<template>
  <n-button @click="open">打开消息提示</n-button>
  <n-button @click="openVn">VNode</n-button>
  <n-button @click="closeAll">关闭所有消息提示</n-button>
</template>

<script lang="ts" setup>
import { getCurrentInstance, h } from 'vue';
import { $message } from '@nio-fe/lego';

const instance = getCurrentInstance();

console.log(instance);

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
.n-button + .n-button {
  margin-left: 10px;
}
</style>
