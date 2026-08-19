import { useRef, useState } from 'react';
import { Button, FloatButton, type FloatButtonHandle } from '@aurora/horizon-react';

function PlusIcon() {
  return <span aria-hidden="true">＋</span>;
}

export default function FloatButtonBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const actionRef = useRef<FloatButtonHandle>(null);
  const [count, setCount] = useState(0);
  const isEnglish = locale === 'en';

  return (
    <section className="docs-demo" style={{ minHeight: 180, position: 'relative' }}>
      <p className="docs-demo__description">
        {isEnglish
          ? 'Use ref commands when an application workflow needs to show, hide, or focus the action.'
          : '当业务流程需要显示、隐藏或聚焦操作时，可以使用 ref 命令。'}
      </p>
      <div className="docs-demo__actions">
        <Button onClick={() => actionRef.current?.show()}>{isEnglish ? 'Show' : '显示'}</Button>
        <Button onClick={() => actionRef.current?.hide()}>{isEnglish ? 'Hide' : '隐藏'}</Button>
        <Button onClick={() => actionRef.current?.focus()}>{isEnglish ? 'Focus' : '聚焦'}</Button>
      </div>
      <p aria-live="polite">{isEnglish ? `Activated ${count} times` : `已触发 ${count} 次`}</p>
      <FloatButton
        ariaLabel={isEnglish ? 'Create item' : '新建项目'}
        icon={<PlusIcon />}
        onClick={() => setCount(value => value + 1)}
        ref={actionRef}
        style={{ position: 'absolute' }}
      />
    </section>
  );
}
