<template>
  <section class="controls-theme-demo">
    <article class="contact-row">
      <div class="contact-row__identity">
        <h-avatar size="small" :src="demoAssetUrl('avatar-indigo.svg')" />
        <div>
          <strong>William Li</strong>
          <span>Customer success · Online</span>
        </div>
      </div>
      <h-controls theme="dark" @command="onCommand">
        <h-control
          :icon="starred ? IconStarFilled : IconStar"
          text="Follow"
          label="star"
          :icon-color="starred ? ['var(--h-text-warning-default)'] : undefined"
        />
        <h-control :icon="IconPhone" text="Call" label="call" />
        <h-control :icon="IconMessage" text="Message" label="message" />
      </h-controls>
    </article>

    <footer aria-live="polite">
      <span>{{ starred ? 'Following this contact' : 'Not following' }}</span>
      <strong>{{ status }}</strong>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
import { IconMessage, IconPhone, IconStar, IconStarFilled } from '@aurora/icon';
import { ref } from 'vue';

const starred = ref(false);
const status = ref('Choose a contact action');

function onCommand(type: 'star' | 'call' | 'message') {
  if (type === 'star') {
    starred.value = !starred.value;
    status.value = starred.value ? 'Contact followed' : 'Contact unfollowed';
    return;
  }
  status.value = type === 'call' ? 'Starting a call' : 'Opening messages';
}
</script>

<style scoped>
.controls-theme-demo {
  display: grid;
  gap: var(--h-spacing-5);
}

.contact-row,
.contact-row__identity,
.controls-theme-demo footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--h-spacing-4);
}

.contact-row__identity > div {
  display: grid;
  gap: var(--h-spacing-1);
}

.contact-row__identity span,
.controls-theme-demo footer {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.contact-row {
  padding: var(--h-spacing-5);
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-xl);
  background: var(--h-bg-default);
}

.contact-row__identity {
  justify-content: flex-start;
  min-width: 0;
}

.controls-theme-demo footer strong {
  color: var(--h-text-brand-default);
}

@media (max-width: 560px) {
  .contact-row,
  .controls-theme-demo footer {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
