<script setup lang="ts">
import { ref } from 'vue';

interface QueryTab {
  key: string;
  label: string;
}

const activeKey = ref('query-1');
const counter = ref(2);
const status = ref('Right-click a query tab for actions.');
const queries = ref<QueryTab[]>([
  { key: 'query-1', label: 'Active customers' },
  { key: 'query-2', label: 'At-risk renewals' },
]);

function onCommand(tab: QueryTab, command: string) {
  if (command === 'duplicate') {
    counter.value += 1;
    const duplicate = { key: `query-${counter.value}`, label: `${tab.label} copy` };
    queries.value = [...queries.value, duplicate];
    activeKey.value = duplicate.key;
    status.value = `${tab.label} duplicated.`;
    return;
  }

  queries.value = queries.value.filter(query => query.key !== tab.key);
  if (activeKey.value === tab.key) activeKey.value = queries.value[0]?.key ?? '';
  status.value = `${tab.label} closed.`;
}
</script>

<template>
  <div class="tabs-menu-demo">
    <h-tabs v-model:active-key="activeKey">
      <h-tab v-for="query in queries" :key="query.key">
        <template #default>
          <h-dropdown trigger="context-menu" @command="onCommand(query, $event)">
            <span class="tabs-menu-demo__label">{{ query.label }}</span>
            <h-dropdown-menu>
              <h-dropdown-item command="duplicate">Duplicate query</h-dropdown-item>
              <h-dropdown-item command="remove" :disabled="queries.length <= 1">
                Close query
              </h-dropdown-item>
            </h-dropdown-menu>
          </h-dropdown>
        </template>
      </h-tab>
    </h-tabs>
    <p aria-live="polite">{{ status }}</p>
  </div>
</template>

<style scoped>
.tabs-menu-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.tabs-menu-demo__label {
  display: block;
  padding-block: var(--h-spacing-1);
}

.tabs-menu-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
