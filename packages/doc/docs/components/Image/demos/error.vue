<template>
  <div class="flex">
    <h-image src="https://not-found" class="mr-2" :width="70" :height="70" />
    <h-image src="https://not-found" class="mr-2" :width="100" :height="100" />
    <h-image src="https://not-found" class="mr-2" :width="150" :height="150" />
    <h-image src="https://not-found" :width="150" :height="150">
      <template #error>
        <div class="flex justify-center aligh-center" style="height: 100%">Error</div>
      </template>
    </h-image>
  </div>
</template>
