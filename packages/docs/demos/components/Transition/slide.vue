<template>
  <h-button type="normal" class="mb-2" @click="visible = !visible">Change</h-button>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="animate-box__wrapper">
        <h-transition name="slide-up">
          <div v-show="visible" class="animate-box">slide-up</div>
        </h-transition>
      </div>
    </h-col>
    <h-col :span="6">
      <div class="animate-box__wrapper">
        <h-transition name="slide-down">
          <div v-show="visible" class="animate-box">slide-down</div>
        </h-transition>
      </div>
    </h-col>
    <h-col :span="6">
      <div class="animate-box__wrapper">
        <h-transition name="slide-left">
          <div v-show="visible" class="animate-box">slide-left</div>
        </h-transition>
      </div>
    </h-col>
    <h-col :span="6">
      <div class="animate-box__wrapper">
        <h-transition name="slide-right">
          <div v-show="visible" class="animate-box">slide-right</div>
        </h-transition>
      </div>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
</script>

<style scoped>
.animate-box__wrapper {
  width: 150px;
  height: 80px;
  overflow: hidden;
  position: relative;
}

.animate-box {
  width: 150px;
  height: 80px;
  background: var(--h-bg-brand-default);
  border-radius: var(--h-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--h-text-inverse);
}
</style>
