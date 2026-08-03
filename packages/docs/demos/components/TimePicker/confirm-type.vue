<script setup lang="ts">
import { ref } from 'vue';

const confirmType = ref<'enter' | 'blur'>('enter');
const value = ref('09:45');
const activity = ref('尚未提交');

function record(event: string, nextValue: unknown) {
  activity.value = `${event}：${String(nextValue ?? 'empty')}`;
}
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="confirmType" size="small">
        <h-segmented-item key="enter" label="Enter" />
        <h-segmented-item key="blur" label="Blur" />
      </h-segmented>
    </div>

    <h-time-picker
      v-model="value"
      value-format="HH:mm"
      :confirm-type="confirmType"
      :to-body="false"
      @input="record('input', $event)"
      @change="record('change', $event)"
    />
    <p class="docs-demo__status" aria-live="polite">{{ activity }}</p>
  </section>
</template>
