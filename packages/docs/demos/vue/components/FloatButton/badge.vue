<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control">
        <span class="docs-demo__control-label">Unread count</span>
        <h-input-number v-model="badgeContent" :min="0" :max="999" />
      </label>
    </div>

    <h-float-button
      type="primary"
      icon="message"
      tooltip="Unread messages"
      :badge="{ type: 'num', content: badgeContent, numMax: 99 }"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const badgeContent = ref(12);
</script>
