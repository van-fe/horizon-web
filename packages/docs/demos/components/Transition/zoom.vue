<template>
  <div>
    <h-button type="normal" class="mb-2" @click="visible = !visible">Change</h-button>
    <h-row :gutter="10" style="height: 80px;">
      <h-col :span="6">
        <h-transition name="zoom-in-center">
          <div v-show="visible" class="animate-box">zoom-in-center</div>
        </h-transition>
      </h-col>
      <h-col :span="6">
        <h-transition name="zoom-in-top">
          <div v-show="visible" class="animate-box">zoom-in-top</div>
        </h-transition>
      </h-col>
      <h-col :span="6">
        <h-transition name="zoom-in-bottom">
          <div v-show="visible" class="animate-box">zoom-in-bottom</div>
        </h-transition>
      </h-col>
      <h-col :span="6">
        <h-transition name="zoom-in-left">
          <div v-show="visible" class="animate-box">zoom-in-left</div>
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

<style scoped>
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
