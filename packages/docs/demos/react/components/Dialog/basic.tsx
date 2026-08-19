import { useRef, useState } from 'react';
import { Button, Dialog, type DialogHandle } from '@aurora/horizon-react';

type Result = 'idle' | 'saved' | 'cancelled';

export default function DialogBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const dialogRef = useRef<DialogHandle>(null);
  const [result, setResult] = useState<Result>('idle');
  const isEnglish = locale === 'en';
  const messages: Record<Result, string> = {
    idle: isEnglish ? 'No action yet' : '尚未执行操作',
    saved: isEnglish ? 'Profile changes saved' : '资料修改已保存',
    cancelled: isEnglish ? 'Changes discarded' : '已放弃本次修改',
  };

  return (
    <section className="docs-demo">
      <p className="docs-demo__description">
        {isEnglish
          ? 'Open the dialog with its ref, then handle the primary and secondary actions explicitly.'
          : '通过 ref 打开对话框，并分别处理主要与次要操作。'}
      </p>
      <div className="docs-demo__actions">
        <Button onClick={() => dialogRef.current?.open()} variant="primary">
          {isEnglish ? 'Edit profile' : '编辑资料'}
        </Button>
      </div>
      <span aria-live="polite" className="docs-demo__status">
        {messages[result]}
      </span>
      <Dialog
        cancelText={isEnglish ? 'Discard' : '放弃'}
        okText={isEnglish ? 'Save changes' : '保存修改'}
        onCancel={() => setResult('cancelled')}
        onOk={() => {
          setResult('saved');
          dialogRef.current?.close();
        }}
        ref={dialogRef}
        title={isEnglish ? 'Edit profile' : '编辑资料'}
      >
        <p>
          {isEnglish
            ? 'Your display name and team role are ready to be updated.'
            : '显示名称和团队角色已准备更新。'}
        </p>
      </Dialog>
    </section>
  );
}
