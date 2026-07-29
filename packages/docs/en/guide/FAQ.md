# FAQ

This will list frequently encountered problems and their solutions
  
## 1. After building the project, when using directives, an error `TypeError: Cannot read properties of undefined (reading 'deep')` appears: {#version-same}

The version numbers of `@aurora/horizon-web` and `@aurora/horizon-web-unplugin-resolver` must be consistent

## 2. `vue-cli` build project error, prompting `?.` is not recognized {#babel}
When using `vue-cli` to build a project, it generally does not support ES7 syntax such as `optional-chaning`, so you need to configure as follows:

  1. Install `babel @vue/cli-plugin-babel` packages
  ```shell
  $ bun add babel-loader @vue/cli-plugin-babel -D
  ```
  2. In `vue.config.js`, add the following statement to make `babel-loader` also transpile `@aurora/xx` packages
  ```ts
  module.exports = {
    // ...
    transpileDependencies: [
      /@aurora/
    ]
  };
  ```
  3. In `babel.config.js`, configure as follows:
  ```js
  module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
  };
  ```

   Also, it is recommended to use `vite` or `create-vue` to build projects, `vue-cli` is no longer maintained by the official

   
## 3.
