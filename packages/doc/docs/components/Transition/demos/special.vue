<template>
  <div>
    <h-button type="normal" class="mb-2" @click="visible = !visible">Change</h-button>
    <h-row :gutter="10" style="height: 80px;">
      <h-col :span="6">
        <h-transition name="float">
          <div v-show="visible" class="animate-box">float</div>
        </h-transition>
      </h-col>
      <h-col :span="6">
        <h-transition name="dropdown">
          <div v-show="visible" class="animate-box">dropdown</div>
        </h-transition>
      </h-col>
      <h-col :span="6">
        <h-transition name="tooltip">
          <div v-show="visible" class="animate-box">tooltip</div>
        </h-transition>
      </h-col>
    </h-row>
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
    background: var(--h-bg-brand-default);
    border-radius: var(--h-radius);
    display: flex;
    aligh-items: center;
    justify-content: center;
    color: var(--h-text-inverse);
}
</style>
