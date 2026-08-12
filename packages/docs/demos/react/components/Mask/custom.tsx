import { useState } from 'react';
import { Button, Mask, Switch } from '@aurora/horizon-web-react';

export default function MaskCustomDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [fuzzified, setFuzzified] = useState(true);
  const isEnglish = locale === 'en';

  return (
    <section className="docs-demo">
      <label style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
        <Switch value={fuzzified} onChange={setFuzzified} />
        <span>{isEnglish ? 'Blur the background' : '模糊背景'}</span>
      </label>
      <div
        style={{
          background: 'var(--h-bg-secondary)',
          borderRadius: 'var(--h-radius-l)',
          marginTop: 16,
          minHeight: 180,
          overflow: 'hidden',
          padding: 24,
          position: 'relative',
        }}
      >
        <strong>{isEnglish ? 'Deployment summary' : '发布摘要'}</strong>
        <p>
          {isEnglish ? '12 checks passed and the release is ready.' : '12 项检查已通过，可以发布。'}
        </p>
        <Mask absolute color="rgb(43 51 63 / 36%)" fuzzified={fuzzified}>
          <Button size="small">{isEnglish ? 'Review release' : '检查发布'}</Button>
        </Mask>
      </div>
    </section>
  );
}
