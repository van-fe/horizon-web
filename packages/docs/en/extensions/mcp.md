# MCP Server

`@aurora/mcp` lets MCP-compatible AI clients discover Aurora components and inspect their
framework-neutral API contracts without scraping the documentation site.

## Install

```bash
npm install --save-dev @aurora/mcp
```

Configure the client to start the local stdio server:

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

## Available capabilities

- `list_components` searches component names, categories, and semantics.
- `get_component_api` returns props, events, content regions, commands, accessibility
  notes, and test vectors for one component.
- `search_component_api` searches fields across component contracts.
- `aurora://components` and `aurora://components/{name}` expose the catalog as resources.

All capabilities are local and read-only. The metadata comes from `@aurora/core`, which is
the source of truth for shared component contracts. Check the Vue or React component page
for renderer-specific names and extensions.
