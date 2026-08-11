import { useState } from 'react';
import { Step, Steps, Switch } from '@aurora/horizon-web-react';

export default function StepsGuardDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [current, setCurrent] = useState(0);
  const [approved, setApproved] = useState(false);
  const [message, setMessage] = useState(
    en ? 'Review is required before publishing.' : '发布前需要完成检查。',
  );

  const guard = async (next: number) => {
    await Promise.resolve();
    if (next === 2 && !approved) {
      setMessage(
        en ? 'Publishing remains locked until review is approved.' : '检查通过前不能进入发布步骤。',
      );
      return false;
    }
    setMessage(en ? 'Step changed.' : '步骤已切换。');
    return true;
  };

  return (
    <section className="docs-demo">
      <label className="docs-demo__control">
        <span className="docs-demo__control-label">{en ? 'Review approved' : '检查已通过'}</span>
        <Switch onChange={setApproved} value={approved} />
      </label>

      <div className="docs-demo__stage" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 480 }}>
          <Steps clickable onBeforeChange={guard} onChange={setCurrent} value={current}>
            <Step title={en ? 'Edit' : '编辑'} />
            <Step title={en ? 'Review' : '检查'} />
            <Step title={en ? 'Publish' : '发布'} />
            <Step disabled title={en ? 'Archived' : '已归档'} />
          </Steps>
        </div>
      </div>
      <span aria-live="polite" className="docs-demo__status">
        {message}
      </span>
    </section>
  );
}
