# Horizon Web

> A modern Vue 3 component library, built to make your work more efficient.

[![GitHub stars](https://img.shields.io/github/stars/van-fe/horizon-web)](https://github.com/van-fe/horizon-web)
[![GitHub issues](https://img.shields.io/github/issues/van-fe/horizon-web)](https://github.com/van-fe/horizon-web/issues)

**English** | [简体中文](./README.zh-CN.md)

`Horizon Web` is an enterprise-grade component library built with Vue 3 and the Composition API, published as the npm package `@aurora/horizon-web`. The library ships 90+ commonly used components covering forms, data display, status feedback, navigation, and other everyday business scenarios. It provides out-of-the-box capabilities such as theme customization, dark mode, internationalization, and on-demand imports, helping business teams build admin applications quickly.

## Features

- 🚀 **Efficient development**: Built strictly to a design-language specification, with highly modular components that work out of the box, reducing communication overhead between design and development.
- 🧩 **Rich components**: 90+ components and directives, covering everything from buttons, forms, and dialogs to tables and other advanced scenarios.
- 🎨 **Theme customization**: A theme system based on SCSS variables and Design Tokens, with dark mode support for fast brand adaptation.
- 🌍 **Internationalization**: Built-in multi-language support, plus standalone `locale` / `locale-vue` packages.
- 📦 **On-demand imports**: Automatic on-demand loading with `unplugin-vue-components`, combined with Tree Shaking to keep bundle size small.
- 🛠 **TypeScript**: Written entirely in TypeScript, with complete type definitions and IDE intellisense.
- 📖 **Complete documentation**: A bilingual documentation site with API references and rich demos for every component.

## Documentation

The docs site is deployed to GitHub Pages:

- [中文文档](https://van-fe.github.io/horizon-web/)
- [English Documentation](https://van-fe.github.io/horizon-web/en/)

The source lives in `packages/docs/zh` (Chinese) and `packages/docs/en` (English). Useful entry points:

- [Why choose Horizon Web](packages/docs/en/guide/why-choose-horizon-web.md)
- [Getting started](packages/docs/en/guide/start.md)
- [On-demand import](packages/docs/en/guide/on-demand-import.md)
- [Theme customization](packages/docs/en/features/theme/doc.md)
- [Internationalization](packages/docs/en/features/locale/doc.md)
- [Namespace](packages/docs/en/guide/namespace.md)
- [Component demos & API](packages/docs/en/demos)
- [FAQ](packages/docs/en/guide/FAQ.md)

Run the docs site locally:

```bash
bun install
bun run dev
```

## Installation

[bun](https://bun.sh) is recommended (the repository's default package manager); other package managers are also supported:

```bash
# bun (recommended)
bun add @aurora/horizon-web

# yarn
yarn add @aurora/horizon-web

# npm
npm install @aurora/horizon-web
```

> Requirements: Node.js >= 20, bun >= 1.0 (for development).

## Quick Start

Full import:

```ts
import { createApp } from 'vue';
import App from './App.vue';
import HorizonWeb from '@aurora/horizon-web';
import '@aurora/horizon-web/es/styles/index.css';

createApp(App).use(HorizonWeb).mount('#app');
```

For production projects, on-demand import (via `unplugin-vue-components` and the resolver shipped with this repo) is recommended. See the [on-demand import docs](packages/docs/en/guide/on-demand-import.md).

You can also load the library directly in the browser via `<script>` / `<link>` tags (IIFE / UMD). See the [quick start docs](packages/docs/en/guide/start.md).

## Project Structure

The repository is a monorepo managed with bun workspaces:

```
├── packages
│   ├── horizon-web        # Component library main project (@aurora/horizon-web)
│   ├── docs               # VitePress documentation site (zh / en)
│   ├── icon               # Icon library
│   ├── locale             # Localization library (pure JS)
│   ├── locale-vue         # Localization library (Vue support)
│   ├── colors             # Colors / Design Tokens
│   ├── utils              # Utility library
│   ├── unplugin-resolver  # Resolver for on-demand imports
│   └── ...                # Other helper packages
└── scripts                # Build, release, and template-generation scripts
```

## Contributing

Contributions of any kind are welcome, including filing issues, improving documentation, and submitting code. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first; it covers issue guidelines, local development, component development conventions (feature design, `useProps`, styles, and documentation), Commit / PR conventions, and the release process.

## Roadmap

- [ ] WebComponents support

## License

This project is licensed under the MIT License.
