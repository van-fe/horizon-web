# FAQ

在此会列出经常遇到的问题以及其解答

## 1. 提示 `request to https://registry.npmjs.org/@aurora%21flego failed` {#registry}

是因为没有设置源 (`registry`)，目前 `@aurora/horizon-web` 相关包只发布在了公司内网，请选用以下任一方式设置：

- 使用 [NRM](https://www.npmjs.com/package/nrm):

    安装：
    ```shell
    $ sudo npm install -g nrm
    ```
    安装好后输入命令：
    ```shell
    $ nrm add nio https://npmmirror.nioint.com/
    ```
    再启用：
    ```shell
    $ nrm use nio
    ```
- 或者替换全局设置 **(推荐 :thumbsup: )**：
    ```shell
    $ npm config set registry https://npmmirror.nioint.com/
    ```
- 或者安装时特别指定：
    ```shell
    $ npm i @aurora/horizon-web --registry https://npmmirror.nioint.com/
    ```
  
## 2. 构建好项目后，使用指令时出现 `TypeError: Cannot read properties of undefined (reading 'deep')` 的报错： {#version-same}

`@aurora/horizon-web` 和 `@aurora/unplugin-resolver` 的版本号一定要保持一致

## 3. `vue-cli` 构建项目报错，提示 `?.` 不识别 {#babel}
使用 `vue-cli` 构建项目，一般情况下会出现不支持 `optional-chaning` 等ES7语法的情况，所以需要按照如下配置：

  1. 安装 `babel @vue/cli-plugin-babel` 包
  ```shell
  $ npm install babel-loader @vue/cli-plugin-babel -D
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
   
## 4.