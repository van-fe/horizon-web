import { Client, InMemoryTransport } from '@modelcontextprotocol/client';
import { describe, expect, it } from 'vitest';

import { AURORA_MCP_VERSION, createAuroraMcpServer } from '../server.js';

describe('Aurora MCP server', () => {
  it('creates an MCP server with the public default identity', () => {
    const server = createAuroraMcpServer();
    expect(server).toBeDefined();
    expect(AURORA_MCP_VERSION).toBe('1.0.0');
  });

  it('accepts an overridden identity for embedding', () => {
    const server = createAuroraMcpServer({ name: 'embedded-aurora', version: '2.0.0' });
    expect(server).toBeDefined();
  });

  it('serves tools and resources through the MCP protocol', async () => {
    const server = createAuroraMcpServer();
    const client = new Client({ name: 'aurora-mcp-test', version: '1.0.0' });
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);

    try {
      const { tools } = await client.listTools();
      expect(tools.map(tool => tool.name)).toEqual([
        'list_components',
        'get_component_api',
        'search_component_api',
      ]);

      const list = await client.callTool({
        name: 'list_components',
        arguments: { query: 'button', category: 'basic', locale: 'zh', limit: 5 },
      });
      expect(list.structuredContent).toEqual(
        expect.objectContaining({
          components: expect.arrayContaining([expect.objectContaining({ name: 'Button' })]),
        }),
      );

      const result = await client.callTool({
        name: 'get_component_api',
        arguments: { component: 'Button', locale: 'en' },
      });
      expect(result.isError).not.toBe(true);
      expect(result.structuredContent).toMatchObject({ name: 'Button' });

      const missing = await client.callTool({
        name: 'get_component_api',
        arguments: { component: 'NotReal' },
      });
      expect(missing.isError).toBe(true);

      const search = await client.callTool({
        name: 'search_component_api',
        arguments: { query: 'disabled', component: 'Button', kind: 'props' },
      });
      expect(search.structuredContent).toMatchObject({
        fields: [expect.objectContaining({ component: 'Button', name: 'disabled' })],
      });

      const { resources } = await client.listResources();
      expect(resources.some(resource => resource.uri === 'aurora://components')).toBe(true);
      expect(resources.some(resource => resource.uri === 'aurora://components/Button')).toBe(true);

      const catalog = await client.readResource({ uri: 'aurora://components' });
      expect(catalog.contents[0]).toMatchObject({
        uri: 'aurora://components',
        mimeType: 'application/json',
      });

      const component = await client.readResource({ uri: 'aurora://components/Button' });
      expect(component.contents[0]).toMatchObject({
        uri: 'aurora://components/Button',
        mimeType: 'application/json',
      });
    } finally {
      await client.close();
      await server.close();
    }
  });
});
