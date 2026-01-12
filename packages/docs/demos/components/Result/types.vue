<template>
  <h-row :gutter="10">
    <h-col :span="12">
      <h-result title="这是一条成功消息" subtitle="这是一段相关的描述文案,这是一段相关的描述文案,这是一段相关的描述文案" type="success" />
    </h-col>
    <h-col :span="12">
      <h-result title="这是一条提示信息" subtitle="这是一段相关的描述文案,这是一段相关的描述文案" type="info" />
    </h-col>
    <h-col :span="12">
      <h-result title="这是一条警示信息" subtitle="这是一段相关的描述文案,这是一段相关的描述文案" type="warning" />
    </h-col>
    <h-col :span="12">
      <h-result title="这是一条错误信息" subtitle="这是一段相关的描述文案,这是一段相关的描述文案" type="error" />
    </h-col>
  </h-row>
</template>
