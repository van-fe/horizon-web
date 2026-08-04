<script setup lang="ts">
import { ref } from 'vue';

type InputStyle = 'normal' | 'emphasize' | 'no-border';

const value = ref('Field Research');
const inputStyle = ref<InputStyle>('normal');
const disabled = ref(false);
</script>

<template>
  <section class="input-basic-demo" aria-label="Basic input options">
    <div class="input-basic-demo__controls">
      <label>
        <span>Appearance</span>
        <h-segmented v-model:active-key="inputStyle" size="small" block>
          <h-segmented-item value="normal" label="Normal" />
          <h-segmented-item value="emphasize" label="Emphasize" />
          <h-segmented-item value="no-border" label="No border" />
        </h-segmented>
      </label>
      <h-switch v-model="disabled" label="Disabled" status />
    </div>

    <label class="input-basic-demo__field" for="basic-input">
      <span>Display name</span>
      <h-input
        id="basic-input"
        v-model="value"
        :input-style="inputStyle"
        :disabled="disabled"
        autocomplete="organization"
      />
    </label>
    <small aria-live="polite">{{ disabled ? 'Locked' : value || 'Empty' }}</small>
  </section>
</template>

<style scoped>
.input-basic-demo,
.input-basic-demo label {
  display: grid;
  gap: var(--h-spacing-2);
}

.input-basic-demo {
  gap: var(--h-spacing-4);
  max-inline-size: 720px;
}

.input-basic-demo__controls {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  gap: var(--h-spacing-4);
}

.input-basic-demo__controls label {
  flex: 1 1 320px;
}

.input-basic-demo span,
.input-basic-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
