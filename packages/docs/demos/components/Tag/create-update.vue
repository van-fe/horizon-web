<template>
  <h-tag-group
    :use-create="true"
    :editable="true"
    :before-create="onBeforeCreate"
    :before-edit="onBeforeEdit"
    :before-close="onBeforeClose"
    :max-tags="5"
    @created="onCreated"
    @edited="onEdited"
    @closed="onClosed"
  >
    <h-tag v-for="(item, index) of tagList" :id="index" :key="index" :closable="true" :clickable="false">{{ item }}</h-tag>
  </h-tag-group>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $confirm, $message } from '@aurora/horizon-web';

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(void 0);
    }, ms);
  });
}

const tagList = ref(['北京', '上海']);

async function onBeforeCreate(tag: string) {
  const close = await $confirm(`是否确定创建 ${tag} ？`, '提示');
  close();
  await sleep(2000);
  tagList.value.push(tag);
}

async function onBeforeEdit(newVal: string, oldVal: string, id: number) {
  const close = await $confirm(`是否确定修改 ${oldVal} 为 ${newVal} ？`, '提示');
  close();
  await sleep(2000);
  tagList.value[id] = newVal;
}

async function onBeforeClose(id: number) {
  await sleep(2000);
  tagList.value.splice(id, 1);
}

function onCreated(tag: string) {
  $message(`创建了${tag}标签`);
}

function onEdited(newVal: string, oldVal: string, id: number) {
  $message(`由 ${oldVal} 修改为 ${newVal}，下标: ${id}`);
}

function onClosed(id: number) {
  $message(`删除了下标为 ${id} 的标签`);
}
</script>
