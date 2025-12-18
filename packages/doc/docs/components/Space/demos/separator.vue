<template>
  <n-space direction="vertical" block>
    <n-space>
      <div>使用 separator 属性</div>
      <n-space separator size="2">
        <n-button text :icon="IconRefresh" type="normal" />
        <n-button text :icon="IconCollect" type="normal" />
        <n-button text :icon="IconDownload" type="normal" />
      </n-space>
    </n-space>

    <n-space>
      <div>使用自定义分隔符</div>
      <n-space size="small">
        <template #separator>
          <div>🤣</div>
        </template>
        <n-button :icon="IconRefresh" type="normal">刷新</n-button>
        <n-button :icon="IconCollect" type="normal">收藏</n-button>
        <n-button :icon="IconDownload" type="normal">下载</n-button>
      </n-space>
    </n-space>

    <n-space>
      <div>自定义 n-divider</div>
      <n-space size="0">
        <template #separator>
          <n-divider vertical-margin="20" direction="vertical" />
        </template>
        <n-button :icon="IconRefresh" type="normal">刷新</n-button>
        <n-button :icon="IconCollect" type="normal">收藏</n-button>
        <n-button :icon="IconDownload" type="normal">下载</n-button>
      </n-space>
    </n-space>
  </n-space>
</template>

<script setup>
import { IconCollect, IconDownload, IconRefresh } from '@aurora/icon';
</script>
