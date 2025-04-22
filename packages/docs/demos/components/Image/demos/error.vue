<template>
  <div class="flex">
    <n-image src="https://not-found" class="mr-2" :width="70" :height="70" />
    <n-image src="https://not-found" class="mr-2" :width="100" :height="100" />
    <n-image src="https://not-found" class="mr-2" :width="150" :height="150" />
    <n-image src="https://not-found" :width="150" :height="150">
      <template #error>
        <div class="flex justify-center align-center" style="height: 100%">Error</div>
      </template>
    </n-image>
  </div>
</template>
