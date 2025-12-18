<template>
  <n-steps v-model="current">
    <n-step v-for="item in steps" :key="item.title" :title="item.title" />
  </n-steps>
  <div class="steps-action">
    <n-button :disabled="current === 0" @click="prev">上一步</n-button>
    <n-button :disabled="current === steps.length" type="primary" @click="next">
      {{ current === steps.length - 1 ? '全部完成' : '下一步' }}
    </n-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const current = ref(0);
const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];
const next = () => {
  current.value++;
};
const prev = () => {
  current.value--;
};
</script>

<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}

.steps-action .n-button + .n-button {
  margin-left: 8px;
}
</style>
