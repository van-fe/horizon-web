<template>
  <section class="transfer-table-demo">
    <h-transfer
      v-model="selectedKeys"
      class="transfer-table-demo__transfer"
      :data="services"
      :props="{ key: 'id', label: 'service' }"
    >
      <template #leftHeader>
        <span>Available monitors · {{ services.length - selectedKeys.length }}</span>
      </template>
      <template #leftBody="{ data }">
        <h-table height="100%" :data="data" border="inner">
          <h-table-column width="44" align="center" header-align="center">
            <template #default="{ row }">
              <h-checkbox
                :model-value="leftChecked.has(row.id)"
                :aria-label="`Select ${row.service}`"
                @change="checked => toggleChecked(row.id, 'left', checked)"
              />
            </template>
          </h-table-column>
          <h-table-column field="service" title="Service" show-overflow />
          <h-table-column field="region" title="Region" width="92" show-overflow />
        </h-table>
      </template>
      <template #control>
        <h-button
          size="small"
          icon="arrow_left"
          :disabled="rightChecked.size === 0"
          @click="removeSelected"
        >
          Remove
        </h-button>
        <h-button
          size="small"
          icon="arrow_right"
          :disabled="leftChecked.size === 0"
          @click="addSelected"
        >
          Add
        </h-button>
      </template>
      <template #rightHeader>
        <span>Command dashboard · {{ selectedKeys.length }}</span>
      </template>
      <template #rightBody="{ data }">
        <h-table height="100%" :data="data" border="inner">
          <h-table-column width="44" align="center" header-align="center">
            <template #default="{ row }">
              <h-checkbox
                :model-value="rightChecked.has(row.id)"
                :aria-label="`Select ${row.service}`"
                @change="checked => toggleChecked(row.id, 'right', checked)"
              />
            </template>
          </h-table-column>
          <h-table-column field="service" title="Service" show-overflow />
          <h-table-column field="region" title="Region" width="92" show-overflow />
        </h-table>
      </template>
    </h-transfer>
    <p class="transfer-table-demo__status" aria-live="polite">
      {{ selectedKeys.length }} of {{ services.length }} monitors included
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Panel = 'left' | 'right';

const services = [
  { id: 'checkout', service: 'Checkout API', region: 'Global' },
  { id: 'identity', service: 'Identity gateway', region: 'Global' },
  { id: 'catalog', service: 'Product catalog', region: 'US East' },
  { id: 'search', service: 'Search index', region: 'EU West' },
  { id: 'notifications', service: 'Notifications', region: 'Global' },
  { id: 'analytics', service: 'Analytics pipeline', region: 'US West' },
];

const selectedKeys = ref(['checkout', 'identity']);
const leftChecked = ref(new Set<string>());
const rightChecked = ref(new Set<string>());

function toggleChecked(id: string, panel: Panel, checked: boolean) {
  const current = panel === 'left' ? leftChecked : rightChecked;
  const next = new Set(current.value);
  checked ? next.add(id) : next.delete(id);
  current.value = next;
}

function addSelected() {
  selectedKeys.value = [...selectedKeys.value, ...leftChecked.value];
  leftChecked.value = new Set();
}

function removeSelected() {
  selectedKeys.value = selectedKeys.value.filter(id => !rightChecked.value.has(id));
  rightChecked.value = new Set();
}
</script>

<style scoped>
.transfer-table-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.transfer-table-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
}

.transfer-table-demo__transfer {
  flex-direction: column;
  width: 100%;
}

.transfer-table-demo__transfer :deep(.h-transfer__control) {
  flex-direction: row;
  justify-content: center;
  gap: var(--h-spacing-2);
  margin: var(--h-spacing-3) 0;
}

.transfer-table-demo__transfer :deep(.h-transfer__control .h-button + .h-button) {
  margin-top: 0;
}
</style>
