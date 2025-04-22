<template>
  <n-popover trigger="click">
    <template #reference>
      <n-button>Click</n-button>
    </template>
    <template #popper>
      <n-pop-content>
        <div>Hello World</div>
      </n-pop-content>
    </template>
  </n-popover>
</template>
