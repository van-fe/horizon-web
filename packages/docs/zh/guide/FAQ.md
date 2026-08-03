# FAQ

在此会列出经常遇到的问题以及其解答
  
## 1. 构建好项目后，使用指令时出现 `TypeError: Cannot read properties of undefined (reading 'deep')` 的报错： {#version-same}

`@aurora/horizon-web` 和 `@aurora/horizon-web-unplugin-resolver` 的版本号一定要保持一致

## 2. `vue-cli` 构建项目报错，提示 `?.` 不识别 {#babel}
使用 `vue-cli` 构建项目，一般情况下会出现不支持 `optional-chaning` 等ES7语法的情况，所以需要按照如下配置：

  1. 安装 `babel @vue/cli-plugin-babel` 包
  ```shell
  $ bun add babel-loader @vue/cli-plugin-babel -D
  ```
  2. 在 `vue.config.js` 中，增加以下语句，使 `babel-loader` 也转译 `@aurora/xx` 的包
  ```ts
  module.exports = {
    // ...
    transpileDependencies: [
      /@aurora/
    ]
  };
  ```
  3. 在 `babel.config.js` 中，按照如下设置：
  ```js
  module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
  };
  ```

   另，推荐使用 `vite`、`create-vue` 构建项目，`vue-cli` 官方已不再维护
   
## 3.