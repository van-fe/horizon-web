# Markdown Analyse 使用说明

## 概述

`markdown-analyse` 是一个用于解析和处理组件、指令、方法文档的工具，它提供了以下功能：

1. **Demo 解析**：自动解析 `:::demo` 语法，导入 Vue 组件
2. **代码解析**：解析代码块路径，显示代码高亮
3. **锚点生成**：自动生成标题锚点和右侧导航菜单
4. **API 文档**：根据 JSON 分析文件生成 API 文档表格
5. **插件信息**：显示组件/指令/方法的名称和描述

## 已集成的功能

在 `packages/docs/.vitepress/config/index.mts` 中，已经集成了以下功能：

1. **容器类型**：支持 `tip`、`info`、`warning`、`success`、`error` 容器
2. **代码块配置**：代码块和表格样式配置
3. **Demo 和 Code 容器**：通过 `packages/docs/.vitepress/markdown/containers.ts` 实现

## 使用方式

### 1. 容器语法

```markdown
:::tip 提示信息
这是一个提示
:::

:::warning 警告信息
这是一个警告
:::

:::demo components/Button/basic.vue
:::
```

### 2. 在 Markdown 文件中使用

markdown-analyse 的主要功能（API 文档、插件信息、锚点菜单）需要在特定的上下文中使用。目前，这些功能已经通过 markdown-it 插件集成到 VitePress 的 markdown 处理流程中。

### 3. 直接调用 markdown-analyse

如果需要直接使用 markdown-analyse 处理 markdown 内容，可以这样调用：

```typescript
import markdownAnalyse from './.vitepress/markdown-analyse';

const result = markdownAnalyse(source, filePath, root);
// result 是一个包含 Vue 模板的字符串
```

## 文件结构

```
packages/docs/.vitepress/markdown-analyse/
├── index.ts                          # 主入口文件
├── markdown/
│   ├── index.ts                      # Markdown 渲染器配置
│   ├── containers.ts                 # 容器插件
│   └── fenceConfig.ts                # 代码块配置
└── utils/
    ├── utils.ts                      # 工具函数
    ├── parseDemo.ts                  # 解析 demo 组件
    ├── parseCode.ts                  # 解析代码块
    ├── parseAnchor.ts                # 解析锚点
    ├── appendApi.ts                  # 追加 API 文档
    └── appendPluginInfo.ts           # 追加插件信息
```

## 注意事项

1. **JSON 分析文件**：markdown-analyse 依赖 `packages/doc/build/json/` 目录下的 JSON 文件：
   - `components-analysis.json`
   - `directives-analysis.json`
   - `methods-analysis.json`
   - `others-info.json`

2. **路径解析**：demo 文件路径相对于 `packages/docs/demos/` 目录

3. **VitePress 集成**：由于 VitePress 的 markdown 处理流程，部分功能（如 API 文档、插件信息）可能需要通过其他方式实现，例如：
   - 使用 VitePress 的主题扩展
   - 创建自定义组件
   - 使用 VitePress 的 markdown 钩子
