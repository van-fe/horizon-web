<template>
  <h-space direction="vertical" block>
    <h-space>
      <div>使用 separator 属性</div>
      <h-space separator size="2">
        <h-button text :icon="IconRefresh" type="normal" />
        <h-button text :icon="IconCollect" type="normal" />
        <h-button text :icon="IconDownload" type="normal" />
      </h-space>
    </h-space>

    <h-space>
      <div>使用自定义分隔符</div>
      <h-space size="small">
        <template #separator>
          <div>🤣</div>
        </template>
        <h-button :icon="IconRefresh" type="normal">刷新</h-button>
        <h-button :icon="IconCollect" type="normal">收藏</h-button>
        <h-button :icon="IconDownload" type="normal">下载</h-button>
      </h-space>
    </h-space>

    <h-space>
      <div>自定义 h-divider</div>
      <h-space size="0">
        <template #separator>
          <h-divider vertical-margin="20" direction="vertical" />
        </template>
        <h-button :icon="IconRefresh" type="normal">刷新</h-button>
        <h-button :icon="IconCollect" type="normal">收藏</h-button>
        <h-button :icon="IconDownload" type="normal">下载</h-button>
      </h-space>
    </h-space>
  </h-space>
</template>

<script setup>
import { IconCollect, IconDownload, IconRefresh } from '@aurora/icon';
</script>
