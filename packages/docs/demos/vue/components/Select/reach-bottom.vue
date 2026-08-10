<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue';

type Member = { value: string; label: string; description: string };

const firstNames = ['Mia', 'Noah', 'Ava', 'Leo', 'Zoe', 'Ethan'];
const lastNames = ['Chen', 'Li', 'Wang', 'Zhang', 'Wu', 'Lin'];
const teams = ['Platform', 'Design', 'Quality', 'Growth'];
const allMembers: Member[] = Array.from({ length: 36 }, (_, index) => ({
  value: `member-${index + 1}`,
  label: `${firstNames[index % firstNames.length]} ${lastNames[Math.floor(index / 6)]}`,
  description: `${teams[index % teams.length]} · ID ${String(index + 1).padStart(2, '0')}`,
}));
const pageSize = 12;
const value = ref<string>();
const members = ref<Member[]>(allMembers.slice(0, pageSize));
const loading = ref(false);
const status = ref('滚动到面板底部加载下一页');
const hasMore = computed(() => members.value.length < allMembers.length);
let loadTimer: ReturnType<typeof setTimeout> | undefined;

function loadMore() {
  if (loading.value || !hasMore.value) return;
  loading.value = true;
  status.value = '正在加载…';
  loadTimer = setTimeout(() => {
    members.value = allMembers.slice(
      0,
      Math.min(members.value.length + pageSize, allMembers.length),
    );
    loading.value = false;
    status.value = hasMore.value ? `已加载 ${members.value.length} 人` : '全部成员已加载';
  }, 500);
}

onBeforeUnmount(() => {
  if (loadTimer) clearTimeout(loadTimer);
});
</script>

<template>
  <div class="select-demo">
    <h-select
      v-model="value"
      filterable
      clearable
      :loading="loading"
      :to-body="false"
      placeholder="打开面板并滚动到底部"
      @option-list-reach-bottom="loadMore"
    >
      <h-option v-for="member in members" :key="member.value" v-bind="member" />
    </h-select>
    <div class="status-row">
      <p class="docs-demo__status" role="status">{{ status }}</p>
      <h-button size="small" type="normal" :disabled="loading || !hasMore" @click="loadMore">
        模拟触底
      </h-button>
    </div>
  </div>
</template>

<style scoped>
.select-demo {
  display: grid;
  min-width: 0;
  gap: 10px;
}

.select-demo :deep(.h-select) {
  width: 100%;
  min-width: 0;
}

.status-row {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
</style>
