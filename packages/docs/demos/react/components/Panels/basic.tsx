import { useState } from 'react';
import { Button, Panel, Panels, Space } from '@aurora/horizon-web-react';

export default function PanelsBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [value, setValue] = useState('scope');

  return (
    <section className="docs-demo">
      <Space>
        {['scope', 'quality', 'rollout'].map(key => (
          <Button
            key={key}
            onClick={() => setValue(key)}
            variant={value === key ? 'primary' : 'normal'}
          >
            {key}
          </Button>
        ))}
      </Space>
      <Panels animated value={value}>
        <Panel name="scope">{en ? 'Define the release scope.' : '明确本次发布范围。'}</Panel>
        <Panel name="quality">{en ? 'Run every quality gate.' : '执行全部质量门禁。'}</Panel>
        <Panel name="rollout">
          {en ? 'Release in observable stages.' : '分阶段、可观测地发布。'}
        </Panel>
      </Panels>
    </section>
  );
}
