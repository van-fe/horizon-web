<script setup lang="ts">
import { ref } from 'vue';

const mode = ref('masked');
const code = ref('A7');
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="mode" size="small">
        <h-segmented-item value="masked" label="Masked" />
        <h-segmented-item value="alphanumeric" label="Alphanumeric" />
        <h-segmented-item value="disabled" label="Disabled" />
      </h-segmented>
    </div>

    <h-input-otp
      v-model="code"
      :mask="mode === 'masked'"
      :type="mode === 'alphanumeric' ? 'alphanumeric' : 'numeric'"
      :disabled="mode === 'disabled'"
      aria-label="Verification code"
    />
  </section>
</template>
