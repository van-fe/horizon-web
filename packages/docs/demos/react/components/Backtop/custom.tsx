import { useCallback, useRef } from 'react';
import { Backtop, type BacktopHandle } from '@aurora/horizon-web-react';

export default function BacktopCustomDemo({ locale }: { locale: 'en' | 'zh' }) {
  const actionRef = useRef<BacktopHandle>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const isEnglish = locale === 'en';
  const resolveTarget = useCallback(() => targetRef.current, []);

  return (
    <section className="docs-demo" style={{ minHeight: 220, position: 'relative' }}>
      <div className="docs-demo__actions">
        <button type="button" onClick={() => actionRef.current?.scrollToTop()}>
          {isEnglish ? 'Return with ref' : '通过 ref 返回'}
        </button>
      </div>
      <div ref={targetRef} tabIndex={0} style={{ height: 150, overflow: 'auto' }}>
        <div style={{ minHeight: 520, padding: 16 }}>
          {isEnglish ? 'The action uses custom visible content.' : '返回操作使用自定义可见内容。'}
        </div>
      </div>
      <Backtop
        ariaLabel={isEnglish ? 'Return to content start' : '返回内容起点'}
        bottom={20}
        ref={actionRef}
        right={20}
        style={{ position: 'absolute' }}
        target={resolveTarget}
        visibilityHeight={40}
      >
        <span aria-hidden="true">↑ Top</span>
      </Backtop>
    </section>
  );
}
