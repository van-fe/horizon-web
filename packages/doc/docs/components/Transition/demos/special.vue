<template>
  <div>
    <n-button type="normal" class="mb-2" @click="visible = !visible">Change</n-button>
    <n-row :gutter="10" style="height: 80px;">
      <n-col :span="6">
        <n-transition name="float">
          <div v-show="visible" class="animate-box">float</div>
        </n-transition>
      </n-col>
      <n-col :span="6">
        <n-transition name="dropdown">
          <div v-show="visible" class="animate-box">dropdown</div>
        </n-transition>
      </n-col>
      <n-col :span="6">
        <n-transition name="tooltip">
          <div v-show="visible" class="animate-box">tooltip</div>
        </n-transition>
      </n-col>
    </n-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      visible: ref(true),
    };
  },
});
</script>

<style>
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
