import { useState } from 'react';
import { Button, Spin } from '@aurora/horizon-web-react';

export default function SpinNestedDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [spinning, setSpinning] = useState(true);
  const isEnglish = locale === 'en';

  return (
    <Spin delay={200} spinning={spinning} tip={isEnglish ? 'Saving' : '正在保存'}>
      <article
        style={{
          background: 'var(--h-bg-secondary)',
          borderRadius: 'var(--h-radius-l)',
          minHeight: 140,
          padding: 20,
        }}
      >
        <h4>{isEnglish ? 'Workspace settings' : '工作区设置'}</h4>
        <p>
          {isEnglish ? 'The regional mask keeps this content mounted.' : '区域遮罩不会卸载内容。'}
        </p>
        <Button size="small" onClick={() => setSpinning(value => !value)}>
          {isEnglish ? 'Toggle loading' : '切换加载'}
        </Button>
      </article>
    </Spin>
  );
}
