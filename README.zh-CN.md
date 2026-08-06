# Horizon Web

> Vue3 现代组件库，致力于为你的工作提效。

[![GitHub stars](https://img.shields.io/github/stars/van-fe/horizon-web)](https://github.com/van-fe/horizon-web)
[![GitHub issues](https://img.shields.io/github/issues/van-fe/horizon-web)](https://github.com/van-fe/horizon-web/issues)

[English](./README.md) | **简体中文**

`Horizon Web` 是基于 Vue 3 与 Composition API 构建的企业级组件库，通过 npm 包 `@aurora/horizon-web` 发布。组件库内置 90+ 常用组件，覆盖表单、数据展示、状态反馈、导航等常见业务场景，并提供主题定制、暗黑模式、国际化与按需引入等开箱即用的能力，帮助业务团队快速搭建中后台应用。

## 特性

- 🚀 **高效开发**：严格按照设计语言规范开发，组件高度模块化，开箱即用，减少设计与开发之间的沟通成本。
- 🧩 **组件丰富**：90+ 组件与指令，涵盖按钮、表单、弹窗、表格等基础到高级的各类场景。
- 🎨 **主题定制**：基于 SCSS 变量与 Design Token 的主题体系，支持暗黑模式，快速适配品牌视觉。
- 🌍 **国际化**：内置多语言支持，并提供独立的 `locale` / `locale-vue` 包。
- 📦 **按需引入**：支持 `unplugin-vue-components` 自动按需加载，配合 Tree Shaking 精简打包体积。
- 🛠 **TypeScript**：全量 TypeScript 编写，提供完整的类型定义与 IDE 智能提示。
- 📖 **完善的文档**：中英文文档站，每个组件均包含 API 说明与丰富的 Demo 示例。

## 安装

推荐使用 [bun](https://bun.sh)（仓库默认包管理器），也支持其他包管理器：

```bash
# bun（推荐）
bun add @aurora/horizon-web

# yarn
yarn add @aurora/horizon-web

# npm
npm install @aurora/horizon-web
```

> 环境要求：Node.js >= 20，bun >= 1.0（开发环境）。

## 快速上手

全量引入：

```ts
import { createApp } from 'vue';
import App from './App.vue';
import HorizonWeb from '@aurora/horizon-web';
import '@aurora/horizon-web/es/styles/index.css';

createApp(App).use(HorizonWeb).mount('#app');
```

推荐在生产项目中使用按需引入（配合 `unplugin-vue-components` 与仓库提供的 resolver），详见[按需引入文档](packages/docs/zh/guide/on-demand-import.md)。

也可以通过 `<script>` / `<link>` 标签在浏览器中直接引入（IIFE / UMD），详见[快速开始文档](packages/docs/zh/guide/start.md)。

## 文档

文档站已部署到 GitHub Pages：

- [中文文档](https://van-fe.github.io/horizon-web/)
- [English Documentation](https://van-fe.github.io/horizon-web/en/)

文档站源码位于 `packages/docs/zh`，英文位于 `packages/docs/en`，常用入口：

- [为什么选用 Horizon Web](packages/docs/zh/guide/why-choose-horizon-web.md)
- [快速开始](packages/docs/zh/guide/start.md)
- [按需引入](packages/docs/zh/guide/on-demand-import.md)
- [主题定制](packages/docs/zh/features/theme/doc.md)
- [国际化](packages/docs/zh/features/locale/doc.md)
- [命名空间](packages/docs/zh/guide/namespace.md)
- [组件 API 与示例](packages/docs/zh/demos)
- [FAQ](packages/docs/zh/guide/FAQ.md)

本地启动文档站：

```bash
bun install
bun run dev
```

## 目录结构

仓库采用 bun workspaces 管理的 monorepo 结构：

```
├── packages
│   ├── horizon-web        # 组件库主项目（@aurora/horizon-web）
│   ├── docs               # VitePress 文档站（zh / en）
│   ├── icon               # 图标库
│   ├── locale             # 多语言库（纯 JS）
│   ├── locale-vue         # 多语言库（Vue 支持）
│   ├── colors             # 颜色 / Design Token
│   ├── utils              # 工具库
│   ├── unplugin-resolver  # 按需引入 resolver
│   └── ...                # 其他辅助包
└── scripts                # 构建、发布、模板生成等脚本
```

## 贡献指南

欢迎任何形式的贡献，包括提交 Issue、完善文档与提交代码。请先阅读 [CONTRIBUTING.zh-CN.md](./CONTRIBUTING.zh-CN.md)，其中涵盖 Issue 规范、本地开发、组件开发约定（功能设计、useProps、样式与文档规范）、Commit / PR 规范以及发布流程。

## Roadmap

- [ ] WebComponents 支持

## 开源协议

本项目基于 MIT 协议开源。
