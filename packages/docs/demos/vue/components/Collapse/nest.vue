<template>
  <h-collapse v-model:active-key="outerKeys" filled>
    <h-collapse-item name="profile" title="Workspace profile">
      <p>Horizon Studio · Product design and research workspace.</p>
    </h-collapse-item>
    <h-collapse-item name="notifications" title="Notification rules">
      <h-collapse v-model:active-key="innerKeys">
        <h-collapse-item name="mentions" title="Mentions and replies">
          <p>Notify immediately and include unresolved mentions in the weekly digest.</p>
        </h-collapse-item>
        <h-collapse-item name="reports" title="Weekly reports">
          <p>Send a summary every Monday at 09:00 in the workspace time zone.</p>
        </h-collapse-item>
      </h-collapse>
    </h-collapse-item>
  </h-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const outerKeys = ref(['notifications']);
const innerKeys = ref(['mentions']);
</script>

<style scoped>
p {
  margin: 0;
  color: var(--h-text-secondary);
  line-height: 1.7;
}
</style>
