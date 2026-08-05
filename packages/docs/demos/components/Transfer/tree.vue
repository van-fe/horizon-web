<template>
  <section class="transfer-tree-demo">
    <h-transfer
      v-model="selectedKeys"
      class="transfer-tree-demo__transfer"
      :data="organization"
      :titles="['Organization', 'Launch channel']"
      breadcrumb="Northstar"
      filterable
      placeholder="Search this level"
    >
      <template #item="{ item }">
        <span class="transfer-tree-demo__item">
          <h-avatar size="small" :src="item.avatar" />
          <span class="transfer-tree-demo__copy">
            <strong>{{ item.label }}</strong>
            <span>{{ item.children?.length ? `${item.children.length} entries` : item.role }}</span>
          </span>
        </span>
      </template>
    </h-transfer>
    <p class="transfer-tree-demo__status" aria-live="polite">{{ selectionStatus }}</p>
  </section>
</template>

<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
import { computed, ref } from 'vue';

interface OrganizationEntry {
  key: string;
  label: string;
  avatar: string;
  role?: string;
  children?: OrganizationEntry[];
}

const organization: OrganizationEntry[] = [
  {
    key: 'product',
    label: 'Product & design',
    avatar: demoAssetUrl('avatar-cyan.svg'),
    children: [
      {
        key: 'design-systems',
        label: 'Design systems',
        avatar: demoAssetUrl('avatar-cyan.svg'),
        children: [
          {
            key: 'mia',
            label: 'Mia Torres',
            avatar: demoAssetUrl('avatar-indigo.svg'),
            role: 'Product designer',
          },
          {
            key: 'owen',
            label: 'Owen Kim',
            avatar: demoAssetUrl('avatar-indigo.svg'),
            role: 'Frontend engineer',
          },
        ],
      },
      {
        key: 'research',
        label: 'Research',
        avatar: demoAssetUrl('avatar-cyan.svg'),
        children: [
          {
            key: 'sana',
            label: 'Sana Ali',
            avatar: demoAssetUrl('avatar-indigo.svg'),
            role: 'Staff researcher',
          },
        ],
      },
    ],
  },
  {
    key: 'engineering',
    label: 'Engineering',
    avatar: demoAssetUrl('avatar-cyan.svg'),
    children: [
      {
        key: 'web-platform',
        label: 'Web platform',
        avatar: demoAssetUrl('avatar-cyan.svg'),
        children: [
          {
            key: 'liam',
            label: 'Liam Scott',
            avatar: demoAssetUrl('avatar-indigo.svg'),
            role: 'Tech lead',
          },
        ],
      },
      {
        key: 'reliability',
        label: 'Reliability',
        avatar: demoAssetUrl('avatar-cyan.svg'),
        children: [
          {
            key: 'zoe',
            label: 'Zoe Evans',
            avatar: demoAssetUrl('avatar-indigo.svg'),
            role: 'Incident commander',
          },
        ],
      },
    ],
  },
];

const selectedKeys = ref(['design-systems', 'zoe']);

function flatten(entries: OrganizationEntry[]): OrganizationEntry[] {
  return entries.flatMap(entry => [entry, ...(entry.children ? flatten(entry.children) : [])]);
}

const selectionStatus = computed(() => {
  const selected = flatten(organization).filter(entry => selectedKeys.value.includes(entry.key));
  const teams = selected.filter(entry => entry.children?.length).length;
  const people = selected.length - teams;
  return `${teams} team${teams === 1 ? '' : 's'} and ${people} person${people === 1 ? '' : 's'} selected`;
});
</script>

<style scoped>
.transfer-tree-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.transfer-tree-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
}

.transfer-tree-demo__transfer {
  width: 100%;
}

.transfer-tree-demo__item {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: var(--h-spacing-2);
}

.transfer-tree-demo__copy {
  display: grid;
  min-width: 0;
}

.transfer-tree-demo__copy strong,
.transfer-tree-demo__copy span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.transfer-tree-demo__copy span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

@media (max-width: 520px) {
  .transfer-tree-demo__transfer {
    flex-direction: column;
  }
}
</style>
