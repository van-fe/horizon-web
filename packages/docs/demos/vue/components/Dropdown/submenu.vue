<script setup lang="ts">
import { ref } from 'vue';

const selected = ref('请选择目标团队');
const organization = [
  { label: '产品与设计', teams: ['产品团队', '体验设计组'] },
  { label: '技术中心', teams: ['前端平台组', '质量保障组'] },
];
</script>

<template>
  <div class="dropdown-submenu-demo">
    <h-dropdown trigger="click" @command="selected = `已分配给：${$event}`">
      <h-button>分配任务</h-button>
      <template #dropdown>
        <h-dropdown-menu>
          <h-dropdown-submenu
            v-for="group in organization"
            :key="group.label"
            :title="group.label"
            trigger="click"
          >
            <h-dropdown-item v-for="team in group.teams" :key="team" :command="team">
              {{ team }}
            </h-dropdown-item>
          </h-dropdown-submenu>
        </h-dropdown-menu>
      </template>
    </h-dropdown>
    <p role="status">{{ selected }}</p>
  </div>
</template>

<style scoped>
.dropdown-submenu-demo {
  display: grid;
  justify-items: start;
  gap: 12px;
}

p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: 13px;
}

@media (max-width: 390px) {
  .dropdown-submenu-demo {
    gap: 10px;
  }
}
</style>
