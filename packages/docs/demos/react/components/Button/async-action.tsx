import { Button } from '@aurora/horizon-react';
import { useEffect, useRef, useState } from 'react';

export default function ButtonAsyncDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [asyncState, setAsyncState] = useState<'disabled' | 'loading' | 'none'>('disabled');
  const [completed, setCompleted] = useState(0);
  const [status, setStatus] = useState(locale === 'en' ? 'Ready' : '准备就绪');
  const timers = useRef(new Set<number>());

  useEffect(
    () => () => {
      timers.current.forEach(timer => window.clearTimeout(timer));
      timers.current.clear();
    },
    [],
  );

  function save() {
    setStatus(locale === 'en' ? 'Saving…' : '正在保存…');
    return new Promise<void>(resolve => {
      const timer = window.setTimeout(() => {
        timers.current.delete(timer);
        setCompleted(value => value + 1);
        setStatus(locale === 'en' ? 'Saved' : '保存完成');
        resolve();
      }, 800);
      timers.current.add(timer);
    });
  }

  return (
    <div className="docs-demo">
      <div className="docs-demo__actions">
        {(['disabled', 'loading', 'none'] as const).map(value => (
          <Button
            active={asyncState === value}
            key={value}
            onClick={() => setAsyncState(value)}
            plain
          >
            {value}
          </Button>
        ))}
        <Button asyncAction={save} asyncState={asyncState}>
          {locale === 'en' ? 'Guarded save' : '防重复保存'}
        </Button>
      </div>
      <span aria-live="polite" className="docs-demo__status">
        {status} · {completed}
      </span>
    </div>
  );
}
