# @aurora/mcp

`@aurora/mcp` is a read-only local [Model Context Protocol](https://modelcontextprotocol.io/)
server for AI clients that need authoritative Aurora component metadata.

It reads the framework-neutral component manifests from `@aurora/core` and exposes:

- `list_components` for component discovery;
- `get_component_api` for one component's props, events, content regions, commands,
  semantics, and accessibility metadata;
- `search_component_api` for API-field search;
- `aurora://components` and `aurora://components/{name}` resources.

The server does not access the network or modify the user's project.

## Install and configure

```bash
npm install --save-dev @aurora/mcp
```

Point an MCP client at the installed binary:

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

## Library API

The server factory can be embedded in another Node.js MCP host:

```ts
import { createAuroraMcpServer } from '@aurora/mcp';

const server = createAuroraMcpServer();
```

The returned manifests describe the shared Aurora contract. Renderer-native names and
extensions should still be verified against the Vue or React package documentation.
