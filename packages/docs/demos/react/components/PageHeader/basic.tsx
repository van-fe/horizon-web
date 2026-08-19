import { useState } from 'react';
import { Button, PageHeader } from '@aurora/horizon-react';

export default function PageHeaderBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [status, setStatus] = useState(en ? 'Ready' : '就绪');

  return (
    <section className="docs-demo">
      <PageHeader
        actions={
          <Button onClick={() => setStatus(en ? 'Review requested' : '已发起评审')}>
            {en ? 'Request review' : '发起评审'}
          </Button>
        }
        content={en ? 'AUD-2048 · Owner: Mira Chen' : 'AUD-2048 · 负责人：Mira Chen'}
        onBack={() => setStatus(en ? 'Back requested' : '已请求返回')}
        tags={<span className="docs-demo__status">{en ? 'In review' : '评审中'}</span>}
        title={en ? 'Accessibility audit' : '无障碍审计'}
      />
      <span aria-live="polite" className="docs-demo__status">
        {status}
      </span>
    </section>
  );
}
