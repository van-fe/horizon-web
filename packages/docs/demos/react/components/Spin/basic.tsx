import { useState } from 'react';
import { Button, Spin } from '@aurora/horizon-react';

export default function SpinBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [spinning, setSpinning] = useState(true);
  const isEnglish = locale === 'en';

  return (
    <section className="docs-demo">
      <Button onClick={() => setSpinning(value => !value)}>
        {spinning
          ? isEnglish
            ? 'Stop loading'
            : '结束加载'
          : isEnglish
            ? 'Start loading'
            : '开始加载'}
      </Button>
      <div style={{ marginTop: 20 }}>
        <Spin spinning={spinning} tip={isEnglish ? 'Loading workspace' : '正在加载工作区'} />
      </div>
    </section>
  );
}
