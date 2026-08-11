import { useState } from 'react';
import { Button, Popconfirm } from '@aurora/horizon-web-react';

type GuardOutcome = 'allow' | 'prevent' | 'error';
type GuardStatus = 'idle' | 'checking' | 'confirmed' | 'prevented' | 'error';

const wait = (duration: number) => new Promise(resolve => setTimeout(resolve, duration));

export default function PopconfirmControlledDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [open, setOpen] = useState(false);
  const [outcome, setOutcome] = useState<GuardOutcome>('allow');
  const [status, setStatus] = useState<GuardStatus>('idle');
  const isEnglish = locale === 'en';
  const labels: Record<GuardStatus, string> = {
    idle: isEnglish
      ? 'Choose a guard result, then open the confirmation.'
      : '选择守卫结果，然后打开确认浮层。',
    checking: isEnglish ? 'Checking permissions…' : '正在检查权限…',
    confirmed: isEnglish ? 'Access revoked' : '访问权限已撤销',
    prevented: isEnglish
      ? 'Guard prevented the action; the confirmation remains open.'
      : '守卫阻止了操作，确认浮层保持打开。',
    error: isEnglish
      ? 'The guard failed; review the error and retry.'
      : '守卫执行失败，请检查错误后重试。',
  };

  const guard = async () => {
    setStatus('checking');
    await wait(600);
    if (outcome === 'prevent') {
      setStatus('prevented');
      return false;
    }
    if (outcome === 'error') throw new Error('Permission service unavailable');
    return true;
  };

  return (
    <div className="docs-demo">
      <p className="docs-demo__description">
        {isEnglish
          ? 'The application owns visibility while an asynchronous guard decides whether confirmation may finish.'
          : '由应用控制浮层显隐，并通过异步守卫决定确认操作能否完成。'}
      </p>
      <div className="docs-demo__actions">
        {(['allow', 'prevent', 'error'] as const).map(value => (
          <Button active={outcome === value} key={value} onClick={() => setOutcome(value)} plain>
            {
              {
                allow: isEnglish ? 'Allow' : '允许',
                prevent: isEnglish ? 'Prevent' : '阻止',
                error: isEnglish ? 'Error' : '失败',
              }[value]
            }
          </Button>
        ))}
        <Popconfirm
          beforeConfirm={guard}
          cancelText={isEnglish ? 'Cancel' : '取消'}
          confirmText={isEnglish ? 'Revoke' : '撤销'}
          onConfirm={() => setStatus('confirmed')}
          onConfirmError={() => setStatus('error')}
          onOpenChange={nextOpen => {
            setOpen(nextOpen);
            if (nextOpen) setStatus('idle');
          }}
          open={open}
          title={isEnglish ? 'Revoke this member’s access?' : '确定撤销该成员的访问权限吗？'}
        >
          <Button variant="danger">{isEnglish ? 'Review revocation' : '确认撤权'}</Button>
        </Popconfirm>
      </div>
      <span aria-live="polite" className="docs-demo__status">
        {labels[status]}
      </span>
    </div>
  );
}
