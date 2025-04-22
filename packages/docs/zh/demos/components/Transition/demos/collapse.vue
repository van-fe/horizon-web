<template>
  <div style="height: 200px">
    <n-button type="normal" class="mb-2" @click="visible = !visible">Change</n-button>
    <n-row :gutter="10">
      <n-col :span="6">
        <n-transition name="collapse">
          <div v-show="visible">
            <div class="animate-box">collapse</div>
            <div class="animate-box" style="margin-top: 10px">collapse</div>
          </div>
        </n-transition>
      </n-col>
      <n-col :span="12">
        <n-transition name="collapse-horizontal">
          <div v-show="visible" style="white-space: nowrap">
            <div class="animate-box-horizontal">collapse-horizontal</div>
            <div class="animate-box-horizontal" style="margin-left: 10px">collapse-horizontal</div>
          </div>
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

<style lang="scss">
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

.animate-box-horizontal {
  width: 200px;
  height: 80px;
  background: var(--n-bg-brand-default);
  border-radius: var(--n-radius);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--n-text-inverse);
}
</style>
