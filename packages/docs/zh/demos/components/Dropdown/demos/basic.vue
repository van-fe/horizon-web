<template>
  <h-row>
    <h-col :span="24">
      <h-dropdown>
        <h-button>使用 #dropdown 插槽</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item>北京</h-dropdown-item>
            <h-dropdown-item divided>上海</h-dropdown-item>
            <h-dropdown-item>深圳</h-dropdown-item>
            <h-dropdown-item>杭州</h-dropdown-item>
            <h-dropdown-item>重庆</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
      <h-dropdown>
        <h-button>不使用 #dropdown 插槽</h-button>
        <h-dropdown-menu>
          <h-dropdown-item>北京</h-dropdown-item>
          <h-dropdown-item>上海</h-dropdown-item>
          <h-dropdown-item>深圳</h-dropdown-item>
          <h-dropdown-item>杭州</h-dropdown-item>
          <h-dropdown-item>重庆</h-dropdown-item>
        </h-dropdown-menu>
      </h-dropdown>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
</script>

<style scoped>
.h-dropdown {
  display: inline-flex;
}

.h-dropdown + .h-dropdown {
  margin-left: 12px;
}
</style>
