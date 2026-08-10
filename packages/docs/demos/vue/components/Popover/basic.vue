<template>
  <div class="popover-stage">
    <h-popover placement="auto">
      <template #reference>
        <h-button>查看负责人</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div class="owner-card">
            <h-avatar size="small" type="work" src="林" />
            <div>
              <strong>林晓</strong>
              <span>体验设计负责人</span>
            </div>
          </div>
        </h-pop-content>
      </template>
    </h-popover>
  </div>
</template>

<style scoped>
.popover-stage {
  display: flex;
  justify-content: center;
  padding-block: 24px;
}

.owner-card {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 180px;
}

.owner-card > div {
  display: grid;
  gap: 3px;
}

.owner-card strong {
  color: var(--h-text-primary);
}

.owner-card span {
  color: var(--h-text-secondary);
  font-size: 12px;
}
</style>
