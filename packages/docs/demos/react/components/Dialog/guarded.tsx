import { useEffect, useRef, useState } from 'react';
import { Button, Dialog } from '@aurora/horizon-web-react';

type GuardStatus = 'idle' | 'checking' | 'allowed';

export default function DialogGuardedDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<GuardStatus>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isEnglish = locale === 'en';
  const messages: Record<GuardStatus, string> = {
    idle: isEnglish ? 'The form has no pending close request.' : '表单当前没有待处理的关闭请求。',
    checking: isEnglish
      ? 'Checking whether the draft is safe to close…'
      : '正在检查草稿是否可以安全关闭…',
    allowed: isEnglish ? 'Draft saved; close authorized.' : '草稿已保存，允许关闭。',
  };

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <section className="docs-demo">
      <p className="docs-demo__description">
        {isEnglish
          ? 'Every close path waits for the callback-style guard to authorize the request.'
          : '所有关闭路径都会等待回调式守卫明确授权。'}
      </p>
      <div className="docs-demo__actions">
        <Button
          onClick={() => {
            setStatus('idle');
            setOpen(true);
          }}
          variant="primary"
        >
          {isEnglish ? 'Open guarded form' : '打开受保护表单'}
        </Button>
      </div>
      <span aria-live="polite" className="docs-demo__status">
        {messages[status]}
      </span>
      <Dialog
        beforeClose={close => {
          setStatus('checking');
          timerRef.current = setTimeout(() => {
            setStatus('allowed');
            close();
          }, 800);
        }}
        cancelText={isEnglish ? 'Save and close' : '保存并关闭'}
        okButtonProps={false}
        onClosePendingChange={pending => pending && setStatus('checking')}
        onOpenChange={setOpen}
        open={open}
        title={isEnglish ? 'Release notes' : '发布说明'}
      >
        <p>
          {isEnglish
            ? 'Closing waits briefly while the draft is saved. Repeated close requests are ignored during the check.'
            : '关闭前会短暂等待草稿保存；检查期间重复发起的关闭请求会被忽略。'}
        </p>
      </Dialog>
    </section>
  );
}
