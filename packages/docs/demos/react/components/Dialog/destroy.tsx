import { useState } from 'react';
import { Button, Dialog } from '@aurora/horizon-web-react';

function TemporaryDraft({ locale }: { locale: 'en' | 'zh' }) {
  const [revision, setRevision] = useState(0);
  const isEnglish = locale === 'en';
  return (
    <div>
      <p>{isEnglish ? `Temporary revision: ${revision}` : `临时修改次数：${revision}`}</p>
      <Button onClick={() => setRevision(value => value + 1)} size="small">
        {isEnglish ? 'Add temporary change' : '增加临时修改'}
      </Button>
    </div>
  );
}

export default function DialogDestroyDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [open, setOpen] = useState(false);
  const isEnglish = locale === 'en';
  return (
    <section className="docs-demo">
      <p className="docs-demo__description">
        {isEnglish
          ? 'Closing this dialog unmounts its body, so temporary component state starts fresh next time.'
          : '关闭此对话框会卸载正文，因此下次打开时临时组件状态会重新初始化。'}
      </p>
      <div className="docs-demo__actions">
        <Button onClick={() => setOpen(true)}>
          {isEnglish ? 'Open temporary draft' : '打开临时草稿'}
        </Button>
      </div>
      <Dialog
        cancelText={isEnglish ? 'Close and reset' : '关闭并重置'}
        destroyOnClose
        okButtonProps={false}
        onOpenChange={setOpen}
        open={open}
        title={isEnglish ? 'Temporary draft' : '临时草稿'}
      >
        <TemporaryDraft locale={locale} />
      </Dialog>
    </section>
  );
}
