<template>
  <n-alert :closable="true" show-icon description="用于传达加载、帮助、指南信息，文案可配有文字链接用于传达加载、帮助、指南信息，文案可配有文字链接用于传达加载、帮助、指南信息，文案可配有文字链接用于传达加载、帮助、指南信息，文案可配有文字链接" type="info" />
  <n-alert :closable="true" show-icon description="展示成功、正向反馈的信息" type="success" />
  <n-alert :closable="false" show-icon description="展示反馈提醒、警示的信息，比较常用" type="warning" />
  <n-alert :closable="false" show-icon description="展示反馈失败、操作错误的信息，比较常用" type="error"/>
  <n-alert :closable="false" show-icon :description="'超长提示'.repeat(20)" type="error"/>

</template>

<style scoped>
.n-alert {
  margin: 20px 0 0;
}
.n-alert:first-child {
  margin: 0;
}
</style>
