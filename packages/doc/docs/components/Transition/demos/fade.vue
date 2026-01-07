<template>
  <div>
    <h-button type="normal" class="mb-2" @click="visible = !visible">Change</h-button>
    <h-row :gutter="10" style="height: 80px;">
      <h-col :span="6">
        <h-transition name="fade-ih-linear">
          <div v-show="visible" class="animate-box">fade-ih-linear</div>
        </h-transition>
      </h-col>
      <h-col :span="6">
        <h-transition name="fade-in">
          <div v-show="visible" class="animate-box">fade-in</div>
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
