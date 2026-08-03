<template>
  <h-grid :gap="10">
    <h-grid-item :span="12">
      <h-result title="这是一条成功消息" subtitle="这是一段相关的描述文案,这是一段相关的描述文案,这是一段相关的描述文案" type="success" />
    </h-grid-item>
    <h-grid-item :span="12">
      <h-result title="这是一条提示信息" subtitle="这是一段相关的描述文案,这是一段相关的描述文案" type="info" />
    </h-grid-item>
    <h-grid-item :span="12">
      <h-result title="这是一条警示信息" subtitle="这是一段相关的描述文案,这是一段相关的描述文案" type="warning" />
    </h-grid-item>
    <h-grid-item :span="12">
      <h-result title="这是一条错误信息" subtitle="这是一段相关的描述文案,这是一段相关的描述文案" type="error" />
    </h-grid-item>
  </h-grid>
</template>
