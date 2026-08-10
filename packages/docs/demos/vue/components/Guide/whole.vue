<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { HGuide } from '@aurora/horizon-web';

const guideRef = shallowRef<typeof HGuide | null>(null);
const nameInputRef = shallowRef<HTMLElement | null>(null);
const confirmButtonRef = shallowRef<HTMLElement | null>(null);
const visible = ref(false);
const dialogVisible = ref(false);
const name = ref('');
const status = ref('Setup not started');

function openForm() {
  name.value = '';
  dialogVisible.value = true;
  status.value = 'Form opened';
}

function startGuide() {
  visible.value = true;
  status.value = 'Guide in progress';
}

function acceptName() {
  if (name.value.trim().length >= 2) guideRef.value?.next();
  else status.value = 'Name needs at least two characters';
}

function submit() {
  if (name.value.trim().length < 2) {
    status.value = 'Complete the display name first';
    return;
  }
  guideRef.value?.next();
}

function finish() {
  status.value = `Profile created for ${name.value}`;
  dialogVisible.value = false;
}
</script>

<template>
  <section class="guide-demo">
    <h-button @click="openForm">Start guided setup</h-button>
    <output aria-live="polite">{{ status }}</output>

    <h-dialog
      v-model:visible="dialogVisible"
      title="Create reviewer profile"
      @opened="startGuide"
      @close="visible = false"
    >
      <h-form>
        <h-form-item label="Display name" helper="Enter at least two characters, then press Enter.">
          <h-input ref="nameInputRef" v-model="name" @keyup.enter="acceptName" />
        </h-form-item>
      </h-form>
      <template #footer>
        <h-button type="normal" @click="dialogVisible = false">Cancel</h-button>
        <h-button ref="confirmButtonRef" @click="submit">Create profile</h-button>
      </template>
    </h-dialog>

    <h-guide
      ref="guideRef"
      v-model:visible="visible"
      :use-controls="false"
      @close="status = 'Setup guide skipped'"
      @finish="finish"
    >
      <h-guide-item
        :target="nameInputRef"
        title="Name the reviewer"
        content="Enter at least two characters, then press Enter."
      />
      <h-guide-item
        :target="confirmButtonRef"
        title="Create the profile"
        content="Submit the validated value to finish setup."
        placement="right-start"
      />
    </h-guide>
  </section>
</template>

<style scoped>
.guide-demo {
  display: grid;
  justify-items: start;
  gap: 12px;
}

output {
  color: var(--h-text-secondary);
  font-size: 13px;
}

@media (max-width: 390px) {
  .guide-demo {
    gap: 10px;
  }
}
</style>
