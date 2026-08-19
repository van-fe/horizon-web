import { useCallback, useRef } from 'react';
import { Affix, type AffixHandle } from '@aurora/horizon-react';

export default function AffixTargetDemo({ locale }: { locale: 'en' | 'zh' }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const affixRef = useRef<AffixHandle>(null);
  const resolveTarget = useCallback(() => targetRef.current, []);
  const isEnglish = locale === 'en';
  return (
    <section className="docs-demo">
      <button type="button" onClick={() => affixRef.current?.updatePosition()}>
        {isEnglish ? 'Recalculate' : '重新计算'}
      </button>
      <div ref={targetRef} tabIndex={0} style={{ height: 180, overflow: 'auto', marginTop: 12 }}>
        <div style={{ minHeight: 480 }}>
          <Affix ref={affixRef} offset={8} target={resolveTarget}>
            <div style={{ padding: 12, background: 'var(--h-bg-secondary)' }}>
              {isEnglish ? 'Container toolbar' : '容器工具栏'}
            </div>
          </Affix>
        </div>
      </div>
    </section>
  );
}
