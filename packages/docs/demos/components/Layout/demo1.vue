<template>
  <div class="track-demo">
    <section>
      <div class="track-demo__label">
        <span>Full width</span>
        <code>span 24</code>
      </div>
      <h-grid :cols="24" :gap="12">
        <h-grid-item :span="24"><div class="track track--strong">24</div></h-grid-item>
      </h-grid>
    </section>

    <section>
      <div class="track-demo__label">
        <span>Equal columns</span>
        <code>span 12 × 2</code>
      </div>
      <h-grid :cols="24" :gap="12">
        <h-grid-item :span="12"><div class="track">12</div></h-grid-item>
        <h-grid-item :span="12"><div class="track">12</div></h-grid-item>
      </h-grid>
    </section>

    <section>
      <div class="track-demo__label">
        <span>Three columns</span>
        <code>span 8 × 3</code>
      </div>
      <h-grid :cols="24" :gap="12">
        <h-grid-item v-for="index in 3" :key="index" :span="8">
          <div class="track" :class="{ 'track--soft': index === 2 }">8</div>
        </h-grid-item>
      </h-grid>
    </section>

    <section>
      <div class="track-demo__label">
        <span>Asymmetric</span>
        <code>span 6 + 18</code>
      </div>
      <h-grid :cols="24" :gap="12">
        <h-grid-item :span="6"><div class="track track--soft">6</div></h-grid-item>
        <h-grid-item :span="18"><div class="track track--strong">18</div></h-grid-item>
      </h-grid>
    </section>
  </div>
</template>

<style scoped>
.track-demo {
  display: grid;
  gap: 20px;
}

.track-demo__label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  color: var(--h-text-secondary);
  font-size: 13px;
}

.track-demo__label code {
  padding: 2px 7px;
  border-radius: 5px;
  color: var(--h-text-brand-default);
  background: var(--h-bg-secondary);
  font-size: 12px;
}

.track {
  display: grid;
  place-items: center;
  min-height: 44px;
  border: 1px solid var(--h-border-brand-default);
  border-radius: 8px;
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-activated);
  font-weight: 600;
}

.track--strong {
  color: var(--h-text-inverse);
  background: var(--h-bg-brand-default);
}

.track--soft {
  border-color: var(--h-border-default);
  color: var(--h-text-secondary);
  background: var(--h-bg-secondary);
}
</style>
