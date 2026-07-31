<template>
  <h-empty :size="120">
    <template #image>
      <div class="my-img">
        <img
          src="/demo-assets/empty-state.svg"
          alt="img"
        />
      </div>
    </template>
  </h-empty>
</template>

<style lang="scss">
.my-img {
  width: 100%;
  border-radius: 50%;
  overflow: hidden;
}
</style>
