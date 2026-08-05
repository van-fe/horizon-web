<template>
  <section class="transfer-people-demo">
    <h-transfer
      v-model="selectedKeys"
      class="transfer-people-demo__transfer"
      :data="people"
      :filterable="filterPerson"
      :props="{ label: 'name' }"
      :titles="['Directory', 'Review group']"
      placeholder="Search name or team"
    >
      <template #item="{ item }">
        <span class="transfer-people-demo__person">
          <h-avatar size="small" :src="item.avatar" />
          <span class="transfer-people-demo__copy">
            <strong>{{ item.name }}</strong>
            <span>{{ item.team }}</span>
          </span>
        </span>
      </template>
      <template #rightHeader>
        <span class="transfer-people-demo__right-summary">
          <span>{{ selectedKeys.length }} reviewers</span>
          <h-button v-if="selectedKeys.length" link size="small" @click="selectedKeys = []">
            Clear
          </h-button>
        </span>
      </template>
    </h-transfer>
    <p class="transfer-people-demo__status" aria-live="polite">
      {{ coverageStatus }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Person {
  key: string;
  name: string;
  team: string;
  avatar: string;
  disabled?: boolean;
}

const people: Person[] = [
  {
    key: 'anna',
    name: 'Anna Silva',
    team: 'Product design',
    avatar: '/demo-assets/avatar-indigo.svg',
  },
  {
    key: 'eli',
    name: 'Eli Brooks',
    team: 'Accessibility engineering',
    avatar: '/demo-assets/avatar-cyan.svg',
  },
  {
    key: 'hana',
    name: 'Hana Ito',
    team: 'Localization',
    avatar: '/demo-assets/avatar-indigo.svg',
  },
  {
    key: 'marcus',
    name: 'Marcus Green',
    team: 'Customer support',
    avatar: '/demo-assets/avatar-cyan.svg',
  },
  {
    key: 'nora',
    name: 'Nora Patel',
    team: 'Research · unavailable this week',
    avatar: '/demo-assets/avatar-indigo.svg',
    disabled: true,
  },
];

const selectedKeys = ref(['anna', 'eli']);
const filterPerson = (query: string, person: Person) => {
  const normalizedQuery = query.trim().toLowerCase();
  return `${person.name} ${person.team}`.toLowerCase().includes(normalizedQuery);
};
const coverageStatus = computed(() => {
  const teams = people
    .filter(person => selectedKeys.value.includes(person.key))
    .map(person => person.team.split(' · ')[0]);
  return teams.length ? `Coverage: ${teams.join(' · ')}` : 'Select at least one review discipline.';
});
</script>

<style scoped>
.transfer-people-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.transfer-people-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
}

.transfer-people-demo__transfer {
  width: 100%;
}

.transfer-people-demo__person,
.transfer-people-demo__right-summary {
  display: flex;
  align-items: center;
  min-width: 0;
}

.transfer-people-demo__person {
  gap: var(--h-spacing-2);
}

.transfer-people-demo__copy {
  display: grid;
  min-width: 0;
}

.transfer-people-demo__copy strong,
.transfer-people-demo__copy span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.transfer-people-demo__copy span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.transfer-people-demo__right-summary {
  justify-content: space-between;
  width: 100%;
  gap: var(--h-spacing-2);
}

@media (max-width: 520px) {
  .transfer-people-demo__transfer {
    flex-direction: column;
  }
}
</style>
