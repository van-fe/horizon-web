<script setup lang="ts">
import type { HCascaderOption } from '@aurora/horizon-web';
import { ref } from 'vue';
import { formatPath } from './options';

const fieldMap = { value: 'id', label: 'tag', stringLabel: 'tagString', children: 'nodes' };
const value = ref<string[]>(['apps', 'portal', 'production']);
const options = [
  {
    id: 'apps',
    tag: 'Applications',
    tagString: 'Applications',
    nodes: [
      {
        id: 'portal',
        tag: 'Customer portal',
        tagString: 'Customer portal',
        nodes: [
          { id: 'production', tag: 'Production', tagString: 'Production' },
          { id: 'staging', tag: 'Staging', tagString: 'Staging' },
        ],
      },
    ],
  },
] as unknown as HCascaderOption[];
</script>

<template>
  <div class="docs-demo">
    <h-cascader
      v-model="value"
      aria-label="Service destination"
      :field-map="fieldMap"
      :options="options"
      :to-body="false"
    />
    <span aria-live="polite">{{ formatPath(value) }}</span>
  </div>
</template>
