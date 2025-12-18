<template>
  <n-row :gutter="10">
    <n-col :span="12">
      <n-result title="这是一条成功消息" subtitle="这是一段相关的描述文案,这是一段相关的描述文案,这是一段相关的描述文案" type="success" />
    </n-col>
    <n-col :span="12">
      <n-result title="这是一条提示信息" subtitle="这是一段相关的描述文案,这是一段相关的描述文案" type="info" />
    </n-col>
    <n-col :span="12">
      <n-result title="这是一条警示信息" subtitle="这是一段相关的描述文案,这是一段相关的描述文案" type="warning" />
    </n-col>
    <n-col :span="12">
      <n-result title="这是一条错误信息" subtitle="这是一段相关的描述文案,这是一段相关的描述文案" type="error" />
    </n-col>
  </n-row>
</template>
