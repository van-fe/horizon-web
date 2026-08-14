import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import {
  isDocumentNavigation,
  legacyVueDocsRedirectPlugin,
  redirectEntries,
  redirectHtml,
} from './legacyVueDocsRedirectPlugin';

describe('legacy Vue documentation redirects', () => {
  it('creates redirects for Chinese and English Vue pages', () => {
    const docsRoot = path.resolve(__dirname, '../..');
    const entries = redirectEntries(docsRoot);

    expect(entries).toContainEqual({
      fileName: 'demos/components/Button.html',
      target: '/vue/components/Button',
    });
    expect(entries).toContainEqual({
      fileName: 'en/demos/components/Button.html',
      target: '/en/vue/components/Button',
    });
  });

  it('preserves the configured base in development redirects', () => {
    const plugin = legacyVueDocsRedirectPlugin('/horizon/');
    let middleware:
      | ((
          request: { headers: { accept?: string }; method?: string; url?: string },
          response: {
            statusCode: number;
            setHeader: ReturnType<typeof vi.fn>;
            end: ReturnType<typeof vi.fn>;
          },
          next: ReturnType<typeof vi.fn>,
        ) => void)
      | undefined;
    const server = {
      middlewares: {
        use(handler: typeof middleware) {
          middleware = handler;
        },
      },
    };
    (plugin.configureServer as (server: unknown) => void)(server);

    const response = { statusCode: 0, setHeader: vi.fn(), end: vi.fn() };
    middleware?.(
      {
        headers: { accept: 'text/html,application/xhtml+xml' },
        method: 'GET',
        url: '/horizon/en/demos/components/Button?size=small',
      },
      response,
      vi.fn(),
    );

    expect(response.statusCode).toBe(302);
    expect(response.setHeader).toHaveBeenCalledWith(
      'Location',
      '/horizon/en/vue/components/Button?size=small',
    );
    expect(response.end).toHaveBeenCalled();
  });

  it('does not redirect Vite module requests under the demos source path', () => {
    expect(
      isDocumentNavigation({
        headers: { accept: '*/*' },
        method: 'GET',
        url: '/demos/vue/components/Icon/all.vue',
      }),
    ).toBe(false);
    expect(
      isDocumentNavigation({
        headers: { accept: 'text/html' },
        method: 'GET',
        url: '/demos/components/Button',
      }),
    ).toBe(true);
  });

  it('uses a client redirect that preserves query strings and hashes', () => {
    const html = redirectHtml('/horizon/vue/components/Button');

    expect(html).toContain('location.search+location.hash');
    expect(html).toContain('href="/horizon/vue/components/Button"');
  });
});
