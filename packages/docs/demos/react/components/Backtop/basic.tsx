import { useCallback, useRef, useState } from 'react';
import { Backtop } from '@aurora/horizon-web-react';

export default function BacktopBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const isEnglish = locale === 'en';
  const resolveTarget = useCallback(() => targetRef.current, []);

  return (
    <section className="docs-demo" style={{ minHeight: 220, position: 'relative' }}>
      <p className="docs-demo__description">
        {isEnglish
          ? 'Scroll the panel until the return action appears.'
          : '向下滚动面板，达到阈值后会出现返回操作。'}
      </p>
      <div
        ref={targetRef}
        tabIndex={0}
        style={{ height: 150, overflow: 'auto', border: '1px solid var(--h-border-default)' }}
      >
        <div style={{ minHeight: 520, padding: 16 }}>
          {isEnglish ? 'Scrollable content' : '可滚动内容'}
        </div>
      </div>
      <Backtop
        ariaLabel={isEnglish ? 'Back to panel top' : '返回面板顶部'}
        bottom={20}
        onClick={() => setCount(value => value + 1)}
        right={20}
        style={{ position: 'absolute' }}
        target={resolveTarget}
        visibilityHeight={80}
      />
      <p aria-live="polite">{isEnglish ? `Activated ${count} times` : `已触发 ${count} 次`}</p>
    </section>
  );
}
