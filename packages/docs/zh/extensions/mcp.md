# MCP 服务

`@aurora/mcp` 让兼容 MCP 的 AI 客户端无需抓取文档站，即可发现 Aurora 组件并查询其框架无关 API 契约。

## 安装

```bash
npm install --save-dev @aurora/mcp
```

将客户端配置为启动本地 stdio 服务：

```json
{
  "mcpServers": {
    "aurora": {
      "command": "npx",
      "args": ["-y", "@aurora/mcp"]
    }
  }
}
```

## 可用能力

- `list_components`：按名称、分类和语义搜索组件。
- `get_component_api`：查询单个组件的 props、事件、内容区域、命令、无障碍说明与测试向量。
- `search_component_api`：跨组件契约搜索 API 字段。
- `aurora://components` 与 `aurora://components/{name}`：以资源形式读取目录和单组件元数据。

全部能力均在本地只读运行。元数据直接来自共享组件契约的唯一事实源 `@aurora/core`；renderer 特有的命名和扩展仍应以 Vue 或 React 组件文档为准。
