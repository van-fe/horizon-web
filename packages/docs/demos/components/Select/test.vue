<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue';

type MemberOption = { value: string; label: string; description: string };

const catalog: MemberOption[] = [
  { value: 'mia', label: 'Mia Chen', description: 'Product · Shanghai' },
  { value: 'noah', label: 'Noah Li', description: 'Frontend · Singapore' },
  { value: 'ava', label: 'Ava Wang', description: 'Design · Shanghai' },
  { value: 'leo', label: 'Leo Zhang', description: 'Quality · Beijing' },
  { value: 'zoe', label: 'Zoe Wu', description: 'Data · Frankfurt' },
  { value: 'ethan', label: 'Ethan Lin', description: 'Security · Singapore' },
];
const visible = ref(false);
const committedMembers = ref<string[]>(['mia', 'noah']);
const draftMembers = ref<string[]>([]);
const options = ref<MemberOption[]>(catalog);
const loading = ref(false);
const status = ref('已配置 2 位评审成员');
const fieldState = ref('等待操作');
const committedLabels = computed(() =>
  committedMembers.value.map(value => catalog.find(item => item.value === value)?.label ?? value),
);
let searchTimer: ReturnType<typeof setTimeout> | undefined;
let requestId = 0;

function openDrawer() {
  draftMembers.value = [...committedMembers.value];
  options.value = catalog;
  fieldState.value = '可搜索或创建成员';
  visible.value = true;
}

function searchMembers(input: string) {
  requestId += 1;
  const currentRequest = requestId;
  if (searchTimer) clearTimeout(searchTimer);
  if (!input.trim()) {
    options.value = catalog;
    loading.value = false;
    fieldState.value = '已恢复全部成员';
    return;
  }
  loading.value = true;
  fieldState.value = `正在搜索 “${input}”…`;
  searchTimer = setTimeout(() => {
    if (currentRequest !== requestId) return;
    const keyword = input.toLowerCase();
    options.value = catalog.filter(
      item =>
        item.label.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword),
    );
    loading.value = false;
    fieldState.value = `找到 ${options.value.length} 位成员`;
  }, 400);
}

function saveMembers() {
  committedMembers.value = [...draftMembers.value];
  status.value = `已保存 ${committedMembers.value.length} 位成员`;
  visible.value = false;
}

function cancelEdit() {
  draftMembers.value = [...committedMembers.value];
  status.value = '已取消修改';
  visible.value = false;
}

onBeforeUnmount(() => {
  requestId += 1;
  if (searchTimer) clearTimeout(searchTimer);
});
</script>

<template>
  <div class="drawer-demo">
    <h-button @click="openDrawer">编辑成员</h-button>
    <p class="docs-demo__status" role="status">{{ status }} · {{ committedLabels.join('、') }}</p>

    <h-drawer
      v-model:visible="visible"
      title="配置发布评审成员"
      placement="right"
      @ok="saveMembers"
      @cancel="cancelEdit"
    >
      <div class="drawer-form">
        <h-select
          v-model="draftMembers"
          multiple
          show-search
          allow-create
          clearable
          collapse-tags
          collapse-tags-tooltip
          :loading="loading"
          :to-body="false"
          placeholder="搜索或创建成员"
          @search="searchMembers"
        >
          <h-option v-for="option in options" :key="option.value" v-bind="option" />
        </h-select>
        <p class="docs-demo__status" role="status">
          {{ fieldState }} · 已选 {{ draftMembers.length }} 人
        </p>
      </div>
    </h-drawer>
  </div>
</template>

<style scoped>
.drawer-demo,
.drawer-form {
  display: grid;
  min-width: 0;
  justify-items: start;
  gap: 10px;
}

.drawer-form {
  justify-items: stretch;
}

.drawer-form :deep(.h-select) {
  width: 100%;
  min-width: 0;
}
</style>
