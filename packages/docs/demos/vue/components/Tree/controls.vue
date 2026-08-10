<script setup lang="ts">
import { ref } from 'vue';
import { HTree, useTreeExposes, type HTreeNodeData } from '@aurora/horizon-web';
import type { ExtractExposeTypes } from '@aurora/utils';

type TreeInstance = InstanceType<typeof HTree> & ExtractExposeTypes<typeof useTreeExposes>;

const treeRef = ref<TreeInstance | null>(null);
const selectedValues = ref<Array<string | number>>(['gateway']);
const expandValues = ref<Array<string | number>>(['platform']);
const canaryAdded = ref(false);
const status = ref('Use an exposed method to update the service map.');
const serviceTree = ref<HTreeNodeData[]>([
  {
    value: 'platform',
    label: 'Platform services',
    children: [
      { value: 'gateway', label: 'API gateway' },
      { value: 'identity', label: 'Identity service' },
    ],
  },
  {
    value: 'data',
    label: 'Data services',
    children: [
      { value: 'warehouse', label: 'Warehouse' },
      { value: 'streaming', label: 'Event streaming' },
    ],
  },
]);

function openEverything() {
  treeRef.value?.setAllCollapseStatus(true);
  status.value = 'All service groups expanded.';
}

function selectDataServices() {
  treeRef.value?.setSelectedStatus(['warehouse', 'streaming'], true);
  status.value = 'Data services added to the selection.';
}

function addCanaryPolicy() {
  if (canaryAdded.value) return;

  treeRef.value?.addNodeChildrenByValue(
    [{ value: 'canary-policy', label: 'Canary policy' }],
    'gateway',
  );
  canaryAdded.value = true;
  status.value = 'Canary policy added under API gateway.';
}
</script>

<template>
  <div class="tree-controls-demo" aria-label="Service map exposed controls">
    <h-space wrap>
      <h-button size="small" @click="openEverything">Expand all</h-button>
      <h-button size="small" type="normal" @click="selectDataServices">
        Select data services
      </h-button>
      <h-button size="small" type="normal" :disabled="canaryAdded" @click="addCanaryPolicy">
        Add gateway child
      </h-button>
    </h-space>

    <p role="status">{{ status }}</p>

    <h-tree
      ref="treeRef"
      v-model:tree-data="serviceTree"
      v-model:selected-values="selectedValues"
      v-model:expand-values="expandValues"
      multiple
      show-line
    />
  </div>
</template>

<style scoped>
.tree-controls-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.tree-controls-demo p {
  min-height: 24px;
  margin: 0;
  color: var(--h-text-secondary);
}
</style>
