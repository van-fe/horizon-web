import { McpServer, ResourceTemplate } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';

import {
  componentManifests,
  getComponentApi,
  listComponents,
  searchComponentApi,
  type AuroraLocale,
} from './catalog.js';

export const AURORA_MCP_VERSION = '1.0.0';

export interface AuroraMcpServerOptions {
  name?: string;
  version?: string;
}

const localeSchema = z.enum(['en', 'zh']).default('en');
const categorySchema = z.enum(['basic', 'form', 'feedback', 'navigation', 'overlay']);
const apiKindSchema = z.enum(['props', 'emits', 'slots', 'exposes']);
const limitSchema = z.number().int().min(1).max(200).default(50);
const readOnlyAnnotations = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

function jsonResult(value: unknown) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(value, null, 2) }],
    structuredContent: value,
  };
}

function errorResult(message: string) {
  return {
    content: [{ type: 'text' as const, text: message }],
    isError: true,
  };
}

export function createAuroraMcpServer(options: AuroraMcpServerOptions = {}): McpServer {
  const server = new McpServer({
    name: options.name ?? 'aurora-components',
    version: options.version ?? AURORA_MCP_VERSION,
  });

  server.registerTool(
    'list_components',
    {
      title: 'List Aurora components',
      description:
        'List Aurora components by category or semantic search text before choosing a component.',
      inputSchema: z.object({
        query: z.string().trim().optional().describe('Optional name or semantic search text.'),
        category: categorySchema.optional().describe('Optional component category.'),
        locale: localeSchema.describe('Language used for descriptions.'),
        limit: limitSchema.describe('Maximum number of matches.'),
      }),
      annotations: readOnlyAnnotations,
    },
    async ({ query, category, locale, limit }) =>
      jsonResult({
        components: listComponents({ query, category, locale, limit }),
      }),
  );

  server.registerTool(
    'get_component_api',
    {
      title: 'Get an Aurora component API',
      description:
        'Get the authoritative framework-neutral props, events, content regions, commands, semantics, and accessibility metadata for one Aurora component.',
      inputSchema: z.object({
        component: z.string().trim().min(1).describe('Component name, matched case-insensitively.'),
        locale: localeSchema.describe('Language used for descriptions.'),
      }),
      annotations: readOnlyAnnotations,
    },
    async ({ component, locale }) => {
      const manifest = getComponentApi(component, locale);
      return manifest
        ? jsonResult(manifest)
        : errorResult(`Unknown Aurora component: ${component}`);
    },
  );

  server.registerTool(
    'search_component_api',
    {
      title: 'Search Aurora component API fields',
      description:
        'Search props, events, content regions, and commands across Aurora component manifests.',
      inputSchema: z.object({
        query: z.string().trim().describe('Field name, type, description, or component text.'),
        component: z.string().trim().min(1).optional().describe('Optional component name.'),
        kind: apiKindSchema.optional().describe('Optional API section to search.'),
        locale: localeSchema.describe('Language used for descriptions.'),
        limit: limitSchema.describe('Maximum number of matches.'),
      }),
      annotations: readOnlyAnnotations,
    },
    async ({ query, component, kind, locale, limit }) =>
      jsonResult({
        fields: searchComponentApi({ query, component, kind, locale, limit }),
      }),
  );

  server.registerResource(
    'aurora-component-catalog',
    'aurora://components',
    {
      title: 'Aurora component catalog',
      description: 'The complete framework-neutral Aurora component manifest catalog.',
      mimeType: 'application/json',
    },
    async uri => ({
      contents: [
        {
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(componentManifests),
        },
      ],
    }),
  );

  server.registerResource(
    'aurora-component',
    new ResourceTemplate('aurora://components/{name}', {
      list: async () => ({
        resources: componentManifests.map(manifest => ({
          name: manifest.name,
          title: `${manifest.name} component API`,
          uri: `aurora://components/${encodeURIComponent(manifest.name)}`,
          description: manifest.description.en,
          mimeType: 'application/json',
        })),
      }),
    }),
    {
      title: 'Aurora component API',
      description: 'The framework-neutral API manifest for one Aurora component.',
      mimeType: 'application/json',
    },
    async (uri, variables) => {
      const rawName = variables.name;
      const name = decodeURIComponent(Array.isArray(rawName) ? rawName[0] : rawName);
      const manifest = getComponentApi(name, 'en' satisfies AuroraLocale);
      if (!manifest) throw new Error(`Unknown Aurora component: ${name}`);
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify(manifest),
          },
        ],
      };
    },
  );

  return server;
}
