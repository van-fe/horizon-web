import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'path';
import { parse } from '@vue/compiler-sfc';

const COMPILE_ENDPOINT = '/__horizon_live_demo';
const VIRTUAL_PREFIX = '/@horizon-live-demo/';
const MAX_SOURCE_SIZE = 1024 * 1024;

interface CompileRequest {
  id?: unknown;
  path?: unknown;
  source?: unknown;
}

interface LiveDemoServer {
  middlewares: {
    use(
      route: string,
      handler: (request: IncomingMessage, response: ServerResponse) => void | Promise<void>,
    ): void;
  };
  moduleGraph: {
    getModuleById(id: string): object | undefined;
    invalidateModule(module: object): void;
  };
}

function readRequest(request: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';

    request.setEncoding('utf8');
    request.on('data', chunk => {
      body += chunk;
      if (body.length > MAX_SOURCE_SIZE) reject(new Error('Demo source is too large'));
    });
    request.on('end', () => resolve(body));
    request.on('error', reject);
  });
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  )
    return error.message;
  return String(error);
}

function assertValidSfcSyntax(source: string, filename: string) {
  const { errors } = parse(source, { filename });
  if (!errors.length) return;
  throw new Error(errors.map(getErrorMessage).join('\n'));
}

export function liveDemoPlugin() {
  const docsRoot = path.resolve(__dirname, '../..');
  const sources = new Map<string, { resolvedId: string; source: string }>();
  const sourcesByResolvedId = new Map<string, string>();

  return {
    name: 'horizon-live-demo',
    enforce: 'pre' as const,
    configureServer(devServer: LiveDemoServer) {
      devServer.middlewares.use(COMPILE_ENDPOINT, async (request, response) => {
        response.setHeader('Content-Type', 'application/json; charset=utf-8');

        if (request.method !== 'POST') {
          response.statusCode = 405;
          response.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        try {
          const payload = JSON.parse(await readRequest(request)) as CompileRequest;
          if (typeof payload.id !== 'string' || !/^[\w-]+$/.test(payload.id)) {
            throw new Error('Invalid demo id');
          }
          if (typeof payload.path !== 'string') throw new Error('Invalid demo path');
          if (typeof payload.source !== 'string') throw new Error('Invalid demo source');

          const originalPath = path.resolve(docsRoot, payload.path);
          if (!originalPath.startsWith(`${docsRoot}${path.sep}`))
            throw new Error('Invalid demo path');
          assertValidSfcSyntax(payload.source, originalPath);
          const resolvedId = path.join(
            path.dirname(originalPath),
            `__horizon_live_${payload.id}.vue`,
          );
          sources.set(payload.id, { resolvedId, source: payload.source });
          sourcesByResolvedId.set(resolvedId, payload.source);
          const module = devServer.moduleGraph.getModuleById(resolvedId);
          if (module) devServer.moduleGraph.invalidateModule(module);

          response.statusCode = 200;
          response.end(
            JSON.stringify({
              url: `${VIRTUAL_PREFIX}${payload.id}.vue?t=${Date.now()}`,
            }),
          );
        } catch (error) {
          response.statusCode = 400;
          response.end(
            JSON.stringify({
              error: getErrorMessage(error),
            }),
          );
        }
      });
    },
    resolveId(id: string) {
      if (!id.startsWith(VIRTUAL_PREFIX)) return;
      const demoId = path.basename(id.split('?')[0], '.vue');
      return sources.get(demoId)?.resolvedId;
    },
    load(id: string) {
      return sourcesByResolvedId.get(id);
    },
  };
}
