<script setup lang="ts">
import { ref } from 'vue';

const recipients = ref(['maya@northstar.example']);
const draft = ref('');

function addRecipient() {
  const value = draft.value.trim().toLowerCase();
  if (!value || recipients.value.includes(value)) return;
  recipients.value.push(value);
  draft.value = '';
}

function removeRecipient(recipient: string) {
  recipients.value = recipients.value.filter(item => item !== recipient);
}
</script>

<template>
  <section class="input-embedded-demo">
    <div class="input-embedded-demo__field" role="group" aria-label="Recipients">
      <h-tag
        v-for="recipient in recipients"
        :key="recipient"
        :clickable="false"
        closable
        @close="removeRecipient(recipient)"
      >
        {{ recipient }}
      </h-tag>
      <h-input
        v-model="draft"
        embedded
        fit-content
        :fit-content-min-width="96"
        placeholder="Add recipient"
        aria-label="Add recipient"
        @keydown.enter.prevent="addRecipient"
      />
    </div>
    <small aria-live="polite">{{ recipients.length }} recipient(s)</small>
  </section>
</template>

<style scoped>
.input-embedded-demo {
  display: grid;
  gap: var(--h-spacing-2);
}

.input-embedded-demo__field {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--h-spacing-2);
  min-block-size: 44px;
  padding: var(--h-spacing-2);
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
}

.input-embedded-demo__field:focus-within {
  border-color: var(--h-border-brand-default);
}

.input-embedded-demo > small {
  color: var(--h-text-secondary);
}
</style>
