<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const initial = 10;
const current = ref(initial);
const loading = ref(true);
const steps = ref<{ title: string }[]>([]);
const timers: ReturnType<typeof setTimeout>[] = [];

const maxIndex = computed(() => initial + steps.value.length + 1);

const next = () => {
  if (current.value < maxIndex.value) current.value += 1;
};

const previous = () => {
  if (current.value > initial) current.value -= 1;
};

onMounted(() => {
  timers.push(
    setTimeout(() => {
      steps.value = [{ title: '校验依赖' }, { title: '生成资源' }];
      loading.value = false;
    }, 450),
    setTimeout(() => {
      steps.value.push({ title: '上传产物' });
    }, 900),
  );
});

onBeforeUnmount(() => timers.forEach(timer => clearTimeout(timer)));
</script>

<template>
  <div class="docs-demo">
    <div class="steps-scroll">
      <h-steps v-model="current" :initial="initial">
        <h-step title="开始构建" :index="initial" />
        <h-step
          v-for="(item, index) in steps"
          :key="item.title"
          :title="item.title"
          :index="index + initial + 1"
        />
        <h-step title="完成" :index="steps.length + initial + 1" />
      </h-steps>
    </div>
    <div class="step-actions">
      <h-button type="normal" :disabled="current === initial" @click="previous">上一步</h-button>
      <h-button :disabled="current === maxIndex" @click="next">
        {{ current === maxIndex ? '全部完成' : '下一步' }}
      </h-button>
    </div>
    <p class="docs-demo__status" role="status">
      {{ loading ? '正在加载步骤…' : `当前 index：${current}` }}
    </p>
  </div>
</template>

<style scoped>
.steps-scroll {
  overflow-x: auto;
  padding-block: 12px;
}

.steps-scroll :deep(.h-steps) {
  min-width: 620px;
}

.step-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
