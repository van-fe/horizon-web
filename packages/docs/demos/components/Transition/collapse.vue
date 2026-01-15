<template>
  <div style="height: 200px">
    <h-button type="normal" class="mb-2" @click="visible = !visible">Change</h-button>
    <h-row :gutter="10">
      <h-col :span="6">
        <h-transition name="collapse">
          <div v-show="visible">
            <div class="animate-box">collapse</div>
            <div class="animate-box" style="margin-top: 10px">collapse</div>
          </div>
        </h-transition>
      </h-col>
      <h-col :span="12">
        <h-transition name="collapse-horizontal">
          <div v-show="visible" style="white-space: nowrap">
            <div class="animate-box-horizontal">collapse-horizontal</div>
            <div class="animate-box-horizontal" style="margin-left: 10px">collapse-horizontal</div>
          </div>
        </h-transition>
      </h-col>
    </h-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const visible = ref(true);
</script>

<style scoped lang="scss">
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

.animate-box-horizontal {
  width: 150px;
  height: 80px;
  background: var(--h-bg-brand-default);
  border-radius: var(--h-radius);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--h-text-inverse);
}
</style>
