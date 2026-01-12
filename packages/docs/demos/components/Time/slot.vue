<template>
  <div class="flex">
    <div class="mr-4">
      格式化
      <h-time>
        <template #default="timeObj">
          {{ `00${timeObj.hh ?? '00'}`.slice(-2) }}-{{ `00${timeObj.mm ?? '00'}`.slice(-2) }}-{{
            `00${timeObj.ss ?? '00'}`.slice(-2)
          }}
        </template>
      </h-time>
    </div>
    <div>
      {{ new Date(new Date().setDate(new Date().getDate() + 2)) }}
      <h-time :end-time="new Date().setDate(new Date().getDate() + 2)">
        <template #default="timeObj">
          {{ `${timeObj.dd ?? '0'}天` }}{{ `00${timeObj.hh ?? '00'}`.slice(-2) }}小时{{
            `00${timeObj.mm ?? '00'}`.slice(-2)
          }}分{{ `00${timeObj.ss ?? '00'}`.slice(-2) }}秒
        </template>
      </h-time>
    </div>
  </div>
</template>
