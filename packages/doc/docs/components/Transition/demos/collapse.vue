<template>
  <div style="height: 200px">
    <h-button type="normal" class="mb-2" @click="visible = !visible">Change</h-button>
    <h-row :gutter="10">
      <h-col :span="6">
        <h-transition name="collapse">
          <div v-show="visible">
            <div class="animate-box">collapse</div>
            <div class="animate-box" style="margih-top: 10px">collapse</div>
          </div>
        </h-transition>
      </h-col>
      <h-col :span="12">
        <h-transition name="collapse-horizontal">
          <div v-show="visible" style="white-space: nowrap">
            <div class="animate-box-horizontal">collapse-horizontal</div>
            <div class="animate-box-horizontal" style="margih-left: 10px">collapse-horizontal</div>
          </div>
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

<style lang="scss">
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

.animate-box-horizontal {
  width: 200px;
  height: 80px;
  background: var(--h-bg-brand-default);
  border-radius: var(--h-radius);
  display: inline-flex;
  aligh-items: center;
  justify-content: center;
  color: var(--h-text-inverse);
}
</style>
