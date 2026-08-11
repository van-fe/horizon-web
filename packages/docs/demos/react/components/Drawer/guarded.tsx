import { useState } from 'react';
import { Button, Drawer, Segmented, SegmentedItem } from '@aurora/horizon-web-react';

type GuardOutcome = 'allow' | 'veto';
type GuardStatus = 'idle' | 'checking' | 'allowed' | 'vetoed';

const wait = (duration: number) => new Promise(resolve => setTimeout(resolve, duration));

export default function DrawerGuardedDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [open, setOpen] = useState(false);
  const [outcome, setOutcome] = useState<GuardOutcome>('allow');
  const [status, setStatus] = useState<GuardStatus>('idle');
  const isEnglish = locale === 'en';
  const messages: Record<GuardStatus, string> = {
    idle: isEnglish
      ? 'Choose a guard result, then open the editor.'
      : '选择守卫结果，然后打开编辑器。',
    checking: isEnglish ? 'Checking for unsaved changes…' : '正在检查未保存的修改…',
    allowed: isEnglish ? 'Draft saved; close allowed.' : '草稿已保存，允许关闭。',
    vetoed: isEnglish
      ? 'Close prevented; the editor remains open.'
      : '关闭已被阻止，编辑器保持打开。',
  };

  return (
    <section className="docs-demo">
      <div className="docs-demo__controls">
        <div className="docs-demo__control">
          <span className="docs-demo__control-label">
            {isEnglish ? 'Async guard result' : '异步守卫结果'}
          </span>
          <Segmented
            onChange={value => setOutcome(value as GuardOutcome)}
            size="small"
            value={outcome}
          >
            <SegmentedItem value="allow">{isEnglish ? 'Allow' : '允许'}</SegmentedItem>
            <SegmentedItem value="veto">{isEnglish ? 'Prevent' : '阻止'}</SegmentedItem>
          </Segmented>
        </div>
      </div>
      <div className="docs-demo__actions">
        <Button
          onClick={() => {
            setStatus('idle');
            setOpen(true);
          }}
          variant="primary"
        >
          {isEnglish ? 'Open guarded editor' : '打开受保护编辑器'}
        </Button>
      </div>
      <span aria-live="polite" className="docs-demo__status">
        {messages[status]}
      </span>
      <Drawer
        beforeClose={async () => {
          setStatus('checking');
          await wait(700);
          const allowed = outcome === 'allow';
          setStatus(allowed ? 'allowed' : 'vetoed');
          return allowed;
        }}
        cancelButtonText={isEnglish ? 'Save and close' : '保存并关闭'}
        okButton={false}
        onClosePendingChange={pending => pending && setStatus('checking')}
        onOpenChange={setOpen}
        open={open}
        title={isEnglish ? 'Automation rule' : '自动化规则'}
      >
        <p>
          {isEnglish
            ? 'Every close path waits for the asynchronous result. Repeated requests are ignored while checking.'
            : '所有关闭路径都会等待异步结果；检查期间重复发起的请求会被忽略。'}
        </p>
      </Drawer>
    </section>
  );
}
