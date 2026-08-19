import { useCallback, useRef, useState } from 'react';
import { Anchor, type AnchorHandle } from '@aurora/horizon-react';

export default function AnchorAutomaticDemo({ locale }: { locale: 'en' | 'zh' }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<AnchorHandle>(null);
  const [extra, setExtra] = useState(false);
  const resolveTarget = useCallback(() => targetRef.current, []);
  const isEnglish = locale === 'en';
  return (
    <section className="docs-demo">
      <button
        type="button"
        onClick={() => {
          setExtra(true);
          requestAnimationFrame(() => anchorRef.current?.refreshAnchorList());
        }}
      >
        {isEnglish ? 'Add section and rescan' : '增加章节并重新扫描'}
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '160px minmax(0, 1fr)', gap: 16 }}>
        <Anchor
          ref={anchorRef}
          autoRender
          autoRenderRules={['h3', 'h4']}
          changeHash={false}
          scrollContainer={resolveTarget}
        />
        <div ref={targetRef} tabIndex={0} style={{ height: 200, overflow: 'auto' }}>
          <h3 id="auto-start">{isEnglish ? 'Start' : '开始'}</h3>
          <div style={{ minHeight: 160 }} />
          <h4 id="auto-details">{isEnglish ? 'Details' : '详情'}</h4>
          <div style={{ minHeight: 160 }} />
          {extra && <h3 id="auto-extra">{isEnglish ? 'Extra' : '扩展'}</h3>}
        </div>
      </div>
    </section>
  );
}
