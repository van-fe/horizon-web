<template>
  <section class="form-dynamic-demo">
    <h-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      validate-trigger="blur"
      spacing="dynamic"
      @submit="submit"
    >
      <h-form-item label="Change request" prop="request">
        <h-input v-model="formData.request" placeholder="Production database migration" />
      </h-form-item>

      <h-form-item
        v-for="(reviewer, index) in formData.reviewers"
        :key="reviewer.id"
        :label="`Reviewer ${index + 1}`"
        :prop="`reviewers[${index}].email`"
        :rules="reviewerRules"
        validate-trigger="change"
      >
        <div class="form-dynamic-demo__row">
          <h-input
            v-model="reviewer.email"
            :aria-label="`Reviewer ${index + 1} email`"
            placeholder="reviewer@example.com"
          />
          <h-button
            type="danger"
            plain
            :disabled="formData.reviewers.length === 1"
            :aria-label="`Remove reviewer ${index + 1}`"
            @click="removeReviewer(index)"
          >
            Remove
          </h-button>
        </div>
      </h-form-item>

      <h-form-item>
        <h-space wrap>
          <h-button plain :disabled="formData.reviewers.length >= 5" @click="addReviewer">
            Add reviewer
          </h-button>
          <h-button native-type="submit">Validate request</h-button>
        </h-space>
      </h-form-item>
    </h-form>
    <p class="form-dynamic-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import type { HFormInstance, HFormRule } from '@aurora/horizon-web';
import { reactive, ref } from 'vue';

let nextReviewerId = 2;
const formRef = ref<HFormInstance | null>(null);
const formData = reactive({
  request: 'Production database migration',
  reviewers: [{ id: 1, email: 'maya@example.com' }],
});
const status = ref('One reviewer assigned');
const rules: Record<string, HFormRule> = {
  request: { required: true, message: 'Enter a change request' },
};
const reviewerRules: HFormRule[] = [
  { required: true, message: 'Enter a reviewer email' },
  { type: 'email', message: 'Enter a valid email address' },
];

function addReviewer() {
  if (formData.reviewers.length >= 5) return;
  formData.reviewers.push({ id: nextReviewerId++, email: '' });
  status.value = `${formData.reviewers.length} reviewer rows available`;
}

function removeReviewer(index: number) {
  if (formData.reviewers.length === 1) return;
  formData.reviewers.splice(index, 1);
  status.value = `${formData.reviewers.length} reviewer rows available`;
}

function submit() {
  formRef.value
    ?.validate()
    .then(() => {
      status.value = `${formData.reviewers.length} reviewers are ready for “${formData.request}”`;
    })
    .catch(() => {
      status.value = 'Review each highlighted reviewer row';
    });
}
</script>

<style scoped>
.form-dynamic-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.form-dynamic-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
}

.form-dynamic-demo__row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--h-spacing-3);
  width: 100%;
}

.form-dynamic-demo__status {
  font-size: var(--h-text-sm);
}

@media (max-width: 520px) {
  .form-dynamic-demo__row {
    grid-template-columns: 1fr;
  }

  .form-dynamic-demo__row .h-button {
    justify-self: start;
  }
}
</style>
