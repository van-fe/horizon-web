<template>
  <n-row>
    <n-col :span="24">
      <n-dropdown>
        <n-button>使用 #dropdown 插槽</n-button>
        <template #dropdown>
          <n-dropdown-menu>
            <n-dropdown-item>北京</n-dropdown-item>
            <n-dropdown-item divided>上海</n-dropdown-item>
            <n-dropdown-item>深圳</n-dropdown-item>
            <n-dropdown-item>杭州</n-dropdown-item>
            <n-dropdown-item>重庆</n-dropdown-item>
          </n-dropdown-menu>
        </template>
      </n-dropdown>
      <n-dropdown>
        <n-button>不使用 #dropdown 插槽</n-button>
        <n-dropdown-menu>
          <n-dropdown-item>北京</n-dropdown-item>
          <n-dropdown-item>上海</n-dropdown-item>
          <n-dropdown-item>深圳</n-dropdown-item>
          <n-dropdown-item>杭州</n-dropdown-item>
          <n-dropdown-item>重庆</n-dropdown-item>
        </n-dropdown-menu>
      </n-dropdown>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
</script>

<style scoped>
.n-dropdown {
  display: inline-flex;
}

.n-dropdown + .n-dropdown {
  margin-left: 12px;
}
</style>
