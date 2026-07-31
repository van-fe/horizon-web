import { Readable } from 'node:stream';
import { describe, expect, it, vi } from 'vitest';
import { liveDemoPlugin } from './liveDemoPlugin';

describe('liveDemoPlugin', () => {
  it('stores edited SFC source next to the original demo for Vite compilation', async () => {
    const plugin = liveDemoPlugin();
    let middleware: ((request: Readable, response: ResponseMock) => Promise<void>) | undefined;
    const invalidateModule = vi.fn();

    const server = {
      middlewares: {
        use(_route: string, handler: typeof middleware) {
          middleware = handler;
        },
      },
      moduleGraph: { getModuleById: vi.fn(), invalidateModule },
    };
    (plugin.configureServer as (server: unknown) => void)(server);

    const request = Readable.from([
      JSON.stringify({
        id: 'button-demo',
        path: 'demos/components/Button/basic.vue',
        source: '<template><h-button>Edited</h-button></template>',
      }),
    ]);
    Object.assign(request, { method: 'POST' });
    const response = createResponse();
    await middleware?.(request, response);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).url).toMatch('/@horizon-live-demo/button-demo.vue?t=');

    const resolvedId = (plugin.resolveId as (id: string) => string)(
      '/@horizon-live-demo/button-demo.vue',
    );
    expect(resolvedId).toMatch(/Button\/__horizon_live_button-demo\.vue$/);
    expect((plugin.load as (id: string) => string)(resolvedId)).toContain('Edited');
  });

  it('rejects paths outside the documentation root', async () => {
    const plugin = liveDemoPlugin();
    let middleware: ((request: Readable, response: ResponseMock) => Promise<void>) | undefined;
    const server = {
      middlewares: {
        use: (_route: string, handler: typeof middleware) => {
          middleware = handler;
        },
      },
      moduleGraph: { getModuleById: vi.fn(), invalidateModule: vi.fn() },
    };
    (plugin.configureServer as (server: unknown) => void)(server);

    const request = Readable.from([
      JSON.stringify({
        id: 'unsafe',
        path: '../../outside.vue',
        source: '<template />',
      }),
    ]);
    Object.assign(request, { method: 'POST' });
    const response = createResponse();
    await middleware?.(request, response);

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).error).toBe('Invalid demo path');
  });
});

interface ResponseMock {
  body: string;
  statusCode: number;
  setHeader: ReturnType<typeof vi.fn>;
  end(value: string): void;
}

function createResponse(): ResponseMock {
  return {
    body: '',
    statusCode: 0,
    setHeader: vi.fn(),
    end(value: string) {
      this.body = value;
    },
  };
}
