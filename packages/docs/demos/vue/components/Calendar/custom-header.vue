<script setup lang="ts">
import { computed, ref } from 'vue';

const searchWord = ref('');
const resources = ['Design review', 'Frontend release', 'QA verification', 'Owner sync'];
const resultCount = computed(() => {
  const keyword = searchWord.value.trim().toLowerCase();
  return keyword
    ? resources.filter(item => item.toLowerCase().includes(keyword)).length
    : resources.length;
});
</script>

<template>
  <div class="calendar-header-demo-viewport">
    <h-calendar auto-fit>
      <template #header>
        <div class="calendar-header-demo-search">
          <h-input
            v-model="searchWord"
            placeholder="Search schedule"
            suffix-icon="search"
            clearable
          />
          <span aria-live="polite">{{ resultCount }} matches</span>
        </div>
      </template>
    </h-calendar>
  </div>
</template>

<style scoped>
.calendar-header-demo-viewport {
  min-width: 0;
  height: min(72vh, 640px);
  min-height: 540px;
  overflow: auto;
}

.calendar-header-demo-search {
  box-sizing: border-box;
  display: flex;
  gap: var(--h-spacing-3);
  align-items: center;
  width: min(100%, 440px);
  padding: var(--h-spacing-3);
}

.calendar-header-demo-search .h-input {
  flex: 1;
  min-width: 0;
}

.calendar-header-demo-search span {
  flex: none;
  font-size: var(--h-text-sm);
  color: var(--h-text-secondary);
}

@media (width <= 520px) {
  .calendar-header-demo-viewport {
    height: 520px;
    min-height: 0;
  }

  .calendar-header-demo-search {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
