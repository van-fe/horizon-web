<template>
  <div class="main">
    <slot />
  </div>
</template>


<style lang="scss" scoped>
@use '@aurora/horizon-web/es/styles/mixins';

.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    span {
      color: mixins.css-variable('text-disabled');
      font-size: mixins.css-variable('text-sm');
      margin-left: 8px;
      font-weight: 400;
    }
  }
  h2 {
    font-size: 20px;
    margin-bottom: 16px;
  }
  h3 {
    font-size: 16px;
    margin-bottom: 16px;
  }
  code {
    padding: .2em .4em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(175, 184, 193, 0.2);
    border-radius: 4px;
  }
}
</style>
