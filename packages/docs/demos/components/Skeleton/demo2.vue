<template>
  <section class="skeleton-content-demo">
    <div class="skeleton-content-demo__actions">
      <span class="skeleton-content-demo__status" aria-live="polite">
        {{ isLoading ? 'Loading…' : 'Content ready' }}
      </span>
      <h-button type="normal" size="small" :disabled="isLoading" @click="replayLoading">
        Replay
      </h-button>
    </div>

    <div class="profile-preview" :aria-busy="isLoading">
      <h-skeleton :loading="isLoading" animated>
        <template #loadingTemplate>
          <div class="profile-row" aria-hidden="true">
            <h-skeleton-item shape="avatar" />
            <div class="profile-row__copy">
              <div class="skeleton-line skeleton-line--name"><h-skeleton-item shape="text" /></div>
              <div class="skeleton-line"><h-skeleton-item shape="text" /></div>
            </div>
            <h-skeleton-item shape="operate" />
          </div>
        </template>

        <template #default>
          <div class="profile-row">
            <h-avatar size="smedium" src="/demo-assets/avatar-cyan.svg" />
            <div class="profile-row__copy">
              <strong>Mira Chen</strong>
              <span>Product designer · Horizon Studio</span>
            </div>
            <h-button size="small" type="normal">View</h-button>
          </div>
        </template>
      </h-skeleton>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const PREVIEW_DELAY = 1400;
const isLoading = ref(true);
let loadingTimer: ReturnType<typeof setTimeout> | undefined;

function clearLoadingTimer() {
  if (loadingTimer === undefined) return;

  clearTimeout(loadingTimer);
  loadingTimer = undefined;
}

function replayLoading() {
  clearLoadingTimer();
  isLoading.value = true;
  loadingTimer = setTimeout(() => {
    isLoading.value = false;
    loadingTimer = undefined;
  }, PREVIEW_DELAY);
}

onMounted(replayLoading);
onBeforeUnmount(clearLoadingTimer);
</script>

<style scoped>
.skeleton-content-demo {
  display: grid;
  gap: var(--h-spacing-4);
  width: 100%;
}

.skeleton-content-demo__actions,
.profile-row {
  display: flex;
  align-items: center;
}

.skeleton-content-demo__actions {
  justify-content: flex-end;
  gap: var(--h-spacing-3);
}

.skeleton-content-demo__status {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.profile-preview {
  border-radius: var(--h-radius-l);
  padding: var(--h-spacing-5);
  background: var(--h-bg-secondary);
}

.profile-row {
  min-height: 48px;
  gap: var(--h-spacing-4);
}

.profile-row__copy {
  display: grid;
  flex: 1;
  min-width: 0;
  gap: var(--h-spacing-1);
}

.profile-row__copy strong {
  color: var(--h-text-primary);
}

.profile-row__copy span {
  overflow: hidden;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.skeleton-line {
  width: 100%;
}

.skeleton-line--name {
  width: 52%;
}

@media (max-width: 560px) {
  .skeleton-content-demo__actions {
    justify-content: space-between;
    width: 100%;
  }

  .profile-row {
    align-items: flex-start;
  }
}
</style>
