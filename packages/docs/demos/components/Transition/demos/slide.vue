<template>
  <n-button type="normal" class="mb-2" @click="visible = !visible">Change</n-button>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="animate-box__wrapper">
        <n-transition name="slide-up">
          <div v-show="visible" class="animate-box">slide-up</div>
        </n-transition>
      </div>
    </n-col>
    <n-col :span="6">
      <div class="animate-box__wrapper">
        <n-transition name="slide-down">
          <div v-show="visible" class="animate-box">slide-down</div>
        </n-transition>
      </div>
    </n-col>
    <n-col :span="6">
      <div class="animate-box__wrapper">
        <n-transition name="slide-left">
          <div v-show="visible" class="animate-box">slide-left</div>
        </n-transition>
      </div>
    </n-col>
    <n-col :span="6">
      <div class="animate-box__wrapper">
        <n-transition name="slide-right">
          <div v-show="visible" class="animate-box">slide-right</div>
        </n-transition>
      </div>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
</script>

<style>
.animate-box__wrapper {
  width: 200px;
  height: 80px;
  overflow: hidden;
  position: relative;
}

.animate-box {
  width: 200px;
  height: 80px;
  background: var(--n-bg-brand-default);
  border-radius: var(--n-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--n-text-inverse);
}
</style>
