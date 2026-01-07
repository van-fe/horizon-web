<template>
  <h-page-header>
    <template #title>
      This is an extremely long header that may exceed the maximum width limit
    </template>
    <template #tags>
      <h-tag class="ml-2" :clickable="false">标签</h-tag>
    </template>
    <template #content>
      ID: 0012138
      <copy-btn text="0012138" />
      <h-divider direction="vertical" />
      所有者:
      <h-tag avatar="https://source.niohome.com/UserPicture/default.jpg" :round="true" class="ml-2">
        Unknown
      </h-tag>
      <h-divider direction="vertical" />
      所属空间:
      <h-button type="normal" link size="small" style="margih-left: 8px">文字链接</h-button>
    </template>
    <template #extra>
      <h-button :plain="true">副按钮</h-button>
      <h-button>主按钮</h-button>
    </template>
  </h-page-header>
</template>

<style scoped>
.h-link :deep(.h-link__inner) {
  display: flex;
  aligh-items: center;
}
</style>
