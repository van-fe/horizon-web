<template>
  <section class="card-footer-demo">
    <h-grid :cols="{ xs: 1, md: 2 }" :gap="16">
      <h-grid-item>
        <h-card title="Accessibility review" bottom-divider>
          <p>The keyboard walkthrough is complete and all focus states are ready for sign-off.</p>
          <template #footer>
            <footer class="card-footer-demo__metrics">
              <span>Updated Aug 3</span>
              <h-space>
                <span>
                  <IconEye :size="16" />
                  2,919
                </span>
                <span>
                  <IconMessage :size="16" />
                  18
                </span>
              </h-space>
            </footer>
          </template>
        </h-card>
      </h-grid-item>
      <h-grid-item>
        <h-card title="Add a review note" bottom-divider>
          <p>
            Footer slots can hold controls while the main content keeps the task context visible.
          </p>
          <template #footer>
            <footer class="card-footer-demo__composer">
              <h-input
                v-model="comment"
                type="textarea"
                placeholder="Write a concise review note"
              />
              <h-button size="small" :disabled="!comment.trim()" @click="publish">
                Publish note
              </h-button>
            </footer>
          </template>
        </h-card>
      </h-grid-item>
    </h-grid>
    <span class="card-footer-demo__status" aria-live="polite">{{ status }}</span>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconEye, IconMessage } from '@aurora/icon';

const comment = ref('');
const status = ref('No review note published');

function publish() {
  status.value = `Published: ${comment.value.trim()}`;
  comment.value = '';
}
</script>

<style scoped>
.card-footer-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.card-footer-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  line-height: 1.7;
}

.card-footer-demo__metrics,
.card-footer-demo__metrics span,
.card-footer-demo__composer {
  display: flex;
  align-items: center;
  gap: var(--h-spacing-2);
}

.card-footer-demo__metrics {
  justify-content: space-between;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.card-footer-demo__composer {
  align-items: flex-end;
}

.card-footer-demo__composer .h-input {
  flex: 1;
  min-width: 0;
}

.card-footer-demo__status {
  color: var(--h-text-brand-default);
}

@media (max-width: 520px) {
  .card-footer-demo__metrics,
  .card-footer-demo__composer {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
