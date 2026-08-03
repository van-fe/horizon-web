<template>
  <section class="skeleton-content-demo">
    <header class="skeleton-content-demo__toolbar">
      <div>
        <span class="skeleton-content-demo__eyebrow">CUSTOM TEMPLATE</span>
        <strong>Profile preview</strong>
      </div>
      <div class="skeleton-content-demo__actions">
        <span
          class="skeleton-content-demo__status"
          :class="{ 'is-ready': !isLoading }"
          aria-live="polite"
        >
          <i aria-hidden="true"></i>
          {{ isLoading ? 'loading' : 'content' }}
        </span>
        <h-button type="normal" size="small" :disabled="isLoading" @click="replayLoading">
          Replay
        </h-button>
      </div>
    </header>

    <article class="profile-preview" :aria-busy="isLoading">
      <h-skeleton :loading="isLoading" animated>
        <template #loadingTemplate>
          <div class="profile-card profile-card--loading" aria-hidden="true">
            <header class="profile-card__identity">
              <h-skeleton-item shape="avatar" />
              <div class="profile-card__identity-copy">
                <div class="skeleton-line skeleton-line--role">
                  <h-skeleton-item shape="text" />
                </div>
              </div>
              <div class="skeleton-line skeleton-line--availability">
                <h-skeleton-item shape="text" />
              </div>
            </header>

            <div class="profile-card__divider"></div>

            <div class="profile-card__summary">
              <div class="skeleton-line"><h-skeleton-item shape="text" /></div>
              <div class="skeleton-line skeleton-line--summary">
                <h-skeleton-item shape="text" />
              </div>
            </div>

            <footer class="profile-card__footer">
              <div class="profile-card__stats profile-card__stats--loading">
                <div class="skeleton-line"><h-skeleton-item shape="text" /></div>
              </div>
              <h-skeleton-item shape="operate" />
            </footer>
          </div>
        </template>

        <template #default>
          <div class="profile-card">
            <header class="profile-card__identity">
              <h-avatar size="smedium" src="/demo-assets/avatar-cyan.svg" />
              <div class="profile-card__identity-copy">
                <strong>Mira Chen</strong>
                <span>Product designer · Horizon Studio</span>
              </div>
              <span class="profile-card__availability">Available</span>
            </header>

            <div class="profile-card__divider"></div>

            <p class="profile-card__summary">
              Designing calm, focused workflows for teams that turn complex ideas into useful
              products.
            </p>

            <footer class="profile-card__footer">
              <div class="profile-card__stats">
                <span>
                  <strong>18</strong>
                  projects
                </span>
                <span>
                  <strong>6</strong>
                  teams
                </span>
              </div>
              <h-button size="medium">View profile</h-button>
            </footer>
          </div>
        </template>
      </h-skeleton>
    </article>
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
  gap: var(--h-spacing-5);
  width: 100%;
}

.skeleton-content-demo__toolbar,
.skeleton-content-demo__actions,
.profile-card__identity,
.profile-card__footer,
.profile-card__stats {
  display: flex;
  align-items: center;
}

.skeleton-content-demo__toolbar {
  justify-content: space-between;
  gap: var(--h-spacing-5);
}

.skeleton-content-demo__toolbar > div:first-child {
  display: grid;
  gap: var(--h-spacing-1);
}

.skeleton-content-demo__toolbar strong,
.profile-card__identity-copy strong {
  color: var(--h-text-primary);
  font-size: var(--h-text-base);
}

.skeleton-content-demo__eyebrow {
  color: var(--h-text-brand-default);
  font-size: var(--h-text-sm);
  font-weight: var(--h-weight-strong);
  letter-spacing: 0.08em;
}

.skeleton-content-demo__actions {
  gap: var(--h-spacing-3);
}

.skeleton-content-demo__status {
  display: inline-flex;
  align-items: center;
  gap: var(--h-spacing-2);
  padding: var(--h-spacing-1) var(--h-spacing-3);
  border-radius: var(--h-radius-pill);
  color: var(--h-text-secondary);
  background: var(--h-bg-secondary);
  font-size: var(--h-text-sm);
}

.skeleton-content-demo__status i {
  width: 6px;
  height: 6px;
  border-radius: var(--h-radius-circle);
  background: var(--h-border-default);
}

.skeleton-content-demo__status.is-ready {
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-activated);
}

.skeleton-content-demo__status.is-ready i {
  background: var(--h-bg-brand-default);
}

.profile-preview {
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-xl);
  background: var(--h-bg-default);
  box-shadow: var(--h-shadow-basic);
}

.profile-card {
  min-height: 260px;
  padding: var(--h-spacing-7);
  box-sizing: border-box;
}

.profile-card__identity {
  gap: var(--h-spacing-4);
}

.profile-card__identity-copy {
  display: grid;
  flex: 1;
  min-width: 0;
  gap: var(--h-spacing-1);
}

.profile-card__identity-copy span {
  overflow: hidden;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-card__availability {
  padding: var(--h-spacing-1) var(--h-spacing-3);
  border-radius: var(--h-radius-pill);
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-activated);
  font-size: var(--h-text-sm);
}

.profile-card__divider {
  height: 1px;
  margin: var(--h-spacing-6) 0;
  background: var(--h-border-default);
}

.profile-card__summary {
  min-height: 52px;
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-base);
  line-height: 1.8;
}

.profile-card__footer {
  justify-content: space-between;
  gap: var(--h-spacing-5);
  margin-top: var(--h-spacing-6);
}

.profile-card__stats {
  flex: 1;
  flex-wrap: wrap;
  gap: var(--h-spacing-5);
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.profile-card__stats strong {
  color: var(--h-text-primary);
}

.profile-card--loading .profile-card__identity-copy {
  gap: 0;
}

.profile-card--loading .profile-card__summary {
  display: grid;
  align-content: start;
  min-height: 52px;
}

.skeleton-line {
  width: 100%;
}

.skeleton-line--role {
  width: 58%;
  min-width: 172px;
}

.skeleton-line--availability {
  width: 76px;
}

.skeleton-line--summary {
  width: 72%;
}

.profile-card__stats--loading {
  max-width: 180px;
  gap: var(--h-spacing-3);
}

@media (max-width: 560px) {
  .skeleton-content-demo__toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .skeleton-content-demo__actions {
    justify-content: space-between;
    width: 100%;
  }

  .profile-card {
    min-height: 294px;
    padding: var(--h-spacing-5);
  }

  .profile-card__identity {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .profile-card__identity-copy {
    flex-basis: calc(100% - var(--h-spacing-12));
  }

  .profile-card__availability,
  .skeleton-line--availability {
    margin-left: calc(var(--h-spacing-9) + var(--h-spacing-4));
  }
}
</style>
