<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const accepted = ref(false);
const paragraphs = [
  '为了提供账号、同步和客户支持服务，我们仅收集完成对应功能所需的信息。',
  '当您使用位置、相机或通知能力时，系统会在实际需要时请求授权。',
  '信息用于交付您主动使用的服务、保障账号安全及处理故障。',
  '若用途发生实质变化，我们会在处理前再次说明并征得同意。',
  '我们采用访问控制、传输加密和安全审计等措施保护信息。',
  '保存期限届满后，信息将被删除或匿名化，法律法规另有要求的除外。',
  '您可以查询、更正、导出或删除个人信息，也可以注销账号。',
  '重大政策变更会通过站内通知或弹窗提前告知。',
];

function accept() {
  accepted.value = true;
  visible.value = false;
}
</script>

<template>
  <section class="dialog-overflow-demo">
    <h-button @click="visible = true">阅读完整说明</h-button>
    <p role="status">{{ accepted ? '已同意最新说明' : '等待确认' }}</p>

    <h-dialog
      v-model:visible="visible"
      title="隐私说明更新"
      size="medium"
      ok-text="同意并继续"
      @ok="accept"
    >
      <div class="policy-content">
        <p v-for="paragraph in paragraphs" :key="paragraph">{{ paragraph }}</p>
      </div>
    </h-dialog>
  </section>
</template>

<style scoped>
.dialog-overflow-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
}

.dialog-overflow-demo > p,
.policy-content {
  color: var(--h-text-secondary);
}

.dialog-overflow-demo > p,
.policy-content p {
  margin: 0;
}

.policy-content {
  display: grid;
  gap: var(--h-spacing-3);
  line-height: 1.75;
}

@media (max-width: 390px) {
  .dialog-overflow-demo {
    inline-size: 100%;
  }
}
</style>
