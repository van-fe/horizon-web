<template>
  <h-chat-bubble name="Horizon Assistant" datetime="10:28" max-width="520px">
    <template #avatar>
      <h-avatar type="work" src="AI" size="small" />
    </template>
    支持通过默认插槽放入
    <strong>富内容</strong>
    ，头像、名称、时间和底部区域也可以分别定制。
    <template #footer>
      <h-link>复制</h-link>
      <h-link>重新生成</h-link>
    </template>
  </h-chat-bubble>
</template>
