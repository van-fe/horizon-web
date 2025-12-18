<template>
  <n-row :gutter="10">
    <n-col :span="24">
      <div class="demo-title">
        设置了 <code>index</code> 值
      </div>
      <n-steps v-model="current" :initial="initial">
        <n-step title="Start" :index="initial" />
        <n-step v-for="(item, index) in steps" :key="item.title" :title="item.title" :index="index + initial + 1" />
        <n-step title="End" :index="steps.length + initial + 1" />
      </n-steps>
    </n-col>
  </n-row>
  <n-row :gutter="10">
    <n-col :span="24">
      <div class="demo-title">
        未设置 <code>index</code> 值
      </div>
      <n-steps v-model="current" :initial="initial">
        <n-step title="Start" />
        <n-step v-for="item in steps" :key="item.title" :title="item.title" />
        <n-step title="End" />
      </n-steps>
    </n-col>
  </n-row>
  <div class="steps-action">
    <n-button :disabled="current === initial" @click="prev">上一步</n-button>
    <n-button :disabled="current === steps.length + initial + 2" type="primary" @click="next">
      {{ current === steps.length + initial + 2 ? '全部完成' : '下一步' }}
    </n-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const initial = 10;
const current = ref(initial);
const steps = ref<{title: string; content: string}[]>([]);

const next = () => {
  current.value++;
};
const prev = () => {
  current.value--;
};

onMounted(() => {
  setTimeout(() => {
    steps.value = [
      {
        title: 'First',
        content: 'First-content',
      },
      {
        title: 'Second',
        content: 'Second-content',
      },
    ];
  }, 500);

  setTimeout(() => {
    steps.value.push(
      {
        title: 'Last',
        content: 'Last-content',
      });
  }, 1000);
});
</script>

<style scoped>
.steps-action {
  margin-top: 24px;
}

.steps-action .n-button + .n-button {
  margin-left: 8px;
}
</style>
