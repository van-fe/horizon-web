<template>
  <h-row :gutter="10">
    <h-col :span="24">
      <div class="demo-title">
        设置了 <code>index</code> 值
      </div>
      <h-steps v-model="current" :initial="initial">
        <h-step title="Start" :index="initial" />
        <h-step v-for="(item, index) in steps" :key="item.title" :title="item.title" :index="index + initial + 1" />
        <h-step title="End" :index="steps.length + initial + 1" />
      </h-steps>
    </h-col>
  </h-row>
  <h-row :gutter="10">
    <h-col :span="24">
      <div class="demo-title">
        未设置 <code>index</code> 值
      </div>
      <h-steps v-model="current" :initial="initial">
        <h-step title="Start" />
        <h-step v-for="item in steps" :key="item.title" :title="item.title" />
        <h-step title="End" />
      </h-steps>
    </h-col>
  </h-row>
  <div class="steps-action">
    <h-button :disabled="current === initial" @click="prev">上一步</h-button>
    <h-button :disabled="current === steps.length + initial + 2" type="primary" @click="next">
      {{ current === steps.length + initial + 2 ? '全部完成' : '下一步' }}
    </h-button>
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

.steps-action .h-button + .h-button {
  margin-left: 8px;
}
</style>
