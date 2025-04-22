<template>
  <n-space>
    <n-dropdown size="medium">
      <n-button>Medium</n-button>
      <template #dropdown>
        <n-dropdown-menu>
          <n-dropdown-item>Beijing</n-dropdown-item>
          <n-dropdown-item>Shanghai</n-dropdown-item>
          <n-dropdown-item>Shenzhen</n-dropdown-item>
          <n-dropdown-item>Hangzhou</n-dropdown-item>
          <n-dropdown-item>Chongqing</n-dropdown-item>
        </n-dropdown-menu>
      </template>
    </n-dropdown>
    <n-dropdown size="small">
      <n-button>Small</n-button>
      <n-dropdown-menu>
        <n-dropdown-item>Beijing</n-dropdown-item>
        <n-dropdown-item>Shanghai</n-dropdown-item>
        <n-dropdown-item>Shenzhen</n-dropdown-item>
        <n-dropdown-item>Hangzhou</n-dropdown-item>
        <n-dropdown-item>Chongqing</n-dropdown-item>
      </n-dropdown-menu>
    </n-dropdown>
  </n-space>
</template>
