import { useCallback, useRef, useState } from 'react';
import { Anchor, AnchorLink } from '@aurora/horizon-web-react';

export default function AnchorBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState('');
  const resolveTarget = useCallback(() => targetRef.current, []);
  const isEnglish = locale === 'en';
  return (
    <section className="docs-demo">
      <p aria-live="polite">
        {isEnglish ? `Active section: ${active || 'none'}` : `当前章节：${active || '无'}`}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '160px minmax(0, 1fr)', gap: 16 }}>
        <Anchor changeHash={false} onChange={setActive} scrollContainer={resolveTarget}>
          <AnchorLink href="#anchor-intro" title={isEnglish ? 'Introduction' : '介绍'} />
          <AnchorLink href="#anchor-usage" title={isEnglish ? 'Usage' : '用法'}>
            <AnchorLink href="#anchor-api" title="API" />
          </AnchorLink>
        </Anchor>
        <div ref={targetRef} tabIndex={0} style={{ height: 220, overflow: 'auto' }}>
          <section id="anchor-intro" style={{ minHeight: 180 }}>
            <h3>{isEnglish ? 'Introduction' : '介绍'}</h3>
          </section>
          <section id="anchor-usage" style={{ minHeight: 180 }}>
            <h3>{isEnglish ? 'Usage' : '用法'}</h3>
          </section>
          <section id="anchor-api" style={{ minHeight: 180 }}>
            <h3>API</h3>
          </section>
        </div>
      </div>
    </section>
  );
}
