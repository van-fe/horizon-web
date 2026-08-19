import { createElement as h } from 'react';
import { describe, expect, it } from 'vitest';
import { getContainer, render } from '../../../__tests__/harness';
import { useHorizonWebConfig } from '../../../provider';
import { Application } from '..';

function Probe() {
  const config = useHorizonWebConfig();
  return h(
    'output',
    null,
    `${config.namespace}/${config.locale}/${config.size}/${JSON.stringify(config.showTimeZone)}`,
  );
}

describe('React Application', () => {
  it('provides application configuration without adding a DOM wrapper', async () => {
    await render(
      h(
        Application,
        { locale: 'zh-CN', namespace: 'Aurora', showTimeZone: ['timeline'], size: 'small' },
        h(Probe),
      ),
    );
    expect(getContainer().children).toHaveLength(1);
    expect(getContainer().querySelector('output')).toHaveTextContent(
      'Aurora/zh-CN/small/["timeline"]',
    );
  });

  it('inherits parent values and overrides only configured fields', async () => {
    await render(
      h(
        Application,
        { locale: 'en-US', namespace: 'Outer', size: 'large' },
        h(Application, { size: 'small' }, h(Probe)),
      ),
    );
    expect(getContainer().querySelector('output')).toHaveTextContent('Outer/en-US/small/false');
  });
});
