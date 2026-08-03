<template>
  <section class="transfer-radio-demo">
    <h-transfer
      v-model="selectedKeys"
      class="transfer-radio-demo__transfer"
      :data="people"
      :props="{ label: 'name' }"
      :titles="['Available responders', 'Incident commander']"
      filterable
      placeholder="Search responder"
    >
      <template #leftBody="{ data }">
        <h-radio-group v-model="selectedOwner" class="transfer-radio-demo__list">
          <h-radio
            v-for="person in data"
            :key="person.key"
            class="transfer-radio-demo__radio"
            :value="person.key"
            :disabled="person.disabled"
          >
            <span class="transfer-radio-demo__person">
              <h-avatar size="small" :src="person.avatar" />
              <span class="transfer-radio-demo__copy">
                <strong>{{ person.name }}</strong>
                <span>{{ person.role }}</span>
              </span>
            </span>
          </h-radio>
        </h-radio-group>
      </template>
      <template #item="{ item }">
        <span class="transfer-radio-demo__person">
          <h-avatar size="small" :src="item.avatar" />
          <span class="transfer-radio-demo__copy">
            <strong>{{ item.name }}</strong>
            <span>{{ item.role }}</span>
          </span>
        </span>
      </template>
      <template #rightHeader>
        <span class="transfer-radio-demo__right-summary">
          <span>Assigned responder</span>
          <h-button v-if="selectedKeys.length" link size="small" @click="selectedKeys = []">
            Clear
          </h-button>
        </span>
      </template>
    </h-transfer>
    <p class="transfer-radio-demo__status" aria-live="polite">{{ assignmentStatus }}</p>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const people = [
  {
    key: 'maya',
    name: 'Maya Chen',
    role: 'Site reliability · primary rotation',
    avatar: '/demo-assets/avatar-indigo.svg',
  },
  {
    key: 'jonas',
    name: 'Jonas Reed',
    role: 'Web platform · backup rotation',
    avatar: '/demo-assets/avatar-cyan.svg',
  },
  {
    key: 'priya',
    name: 'Priya Nair',
    role: 'Release operations · primary rotation',
    avatar: '/demo-assets/avatar-indigo.svg',
  },
  {
    key: 'leo',
    name: 'Leo Martin',
    role: 'On leave · unavailable',
    avatar: '/demo-assets/avatar-cyan.svg',
    disabled: true,
  },
];

const selectedKeys = ref<string[]>(['maya']);
const selectedOwner = computed({
  get: () => selectedKeys.value[0] ?? '',
  set: (key: string) => {
    selectedKeys.value = key ? [key] : [];
  },
});
const assignmentStatus = computed(() => {
  const owner = people.find(person => person.key === selectedKeys.value[0]);
  return owner
    ? `${owner.name} is ready to coordinate the incident.`
    : 'No commander assigned yet.';
});
</script>

<style scoped>
.transfer-radio-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.transfer-radio-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
}

.transfer-radio-demo__transfer {
  width: 100%;
}

.transfer-radio-demo__list {
  display: grid;
}

.transfer-radio-demo__radio {
  width: 100%;
  padding: var(--h-spacing-2) var(--h-spacing-4);
}

.transfer-radio-demo__person,
.transfer-radio-demo__right-summary {
  display: flex;
  align-items: center;
  min-width: 0;
}

.transfer-radio-demo__person {
  gap: var(--h-spacing-2);
}

.transfer-radio-demo__copy {
  display: grid;
  min-width: 0;
}

.transfer-radio-demo__copy strong,
.transfer-radio-demo__copy span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.transfer-radio-demo__copy span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.transfer-radio-demo__right-summary {
  justify-content: space-between;
  width: 100%;
  gap: var(--h-spacing-2);
}

@media (max-width: 520px) {
  .transfer-radio-demo__transfer {
    flex-direction: column;
  }
}
</style>
