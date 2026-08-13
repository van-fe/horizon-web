import { useMemo, useState } from 'react';
import type { CascaderOption } from '@aurora/horizon-web-react';
import { Cascader } from '@aurora/horizon-web-react';

function selectionCount(value: unknown): number {
  if (!Array.isArray(value) || value.length === 0) return 0;
  return Array.isArray(value[0]) ? value.length : 1;
}

export default function CascaderMultipleDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [committedCount, setCommittedCount] = useState(0);
  const [message, setMessage] = useState(
    en ? 'No notification groups applied' : '尚未应用通知分组',
  );
  const options = useMemo<CascaderOption[]>(
    () => [
      {
        value: 'product',
        label: en ? 'Product updates' : '产品动态',
        children: [
          { value: 'releases', label: en ? 'Release notes' : '版本发布' },
          { value: 'research', label: en ? 'Research previews' : '研究预览' },
        ],
      },
      {
        value: 'operations',
        label: en ? 'Operations' : '运营通知',
        children: [
          { value: 'incidents', label: en ? 'Service incidents' : '服务事件' },
          { value: 'maintenance', label: en ? 'Planned maintenance' : '计划维护' },
        ],
      },
      {
        value: 'community',
        label: en ? 'Community' : '社区活动',
        children: [
          { value: 'events', label: en ? 'Events' : '线下活动' },
          { value: 'digest', label: en ? 'Monthly digest' : '月度摘要' },
        ],
      },
    ],
    [en],
  );

  return (
    <section className="docs-demo" style={{ maxWidth: 440 }}>
      <p className="docs-demo__description">
        {en
          ? 'Selections remain a draft until Apply is pressed. At most three groups may be chosen.'
          : '选项在点击“应用”前保持为草稿，最多可以选择三个分组。'}
      </p>
      <div className="docs-demo__stage">
        <Cascader
          cancelText={en ? 'Discard' : '放弃'}
          confirmText={en ? 'Apply' : '应用'}
          multiple
          multipleLimit={3}
          needConfirm
          options={options}
          placeholder={en ? 'Choose notification groups' : '选择通知分组'}
          onCancel={() => setMessage(en ? 'Draft changes discarded' : '已放弃草稿修改')}
          onConfirm={value => {
            const count = selectionCount(value);
            setCommittedCount(count);
            setMessage(en ? `${count} groups applied` : `已应用 ${count} 个分组`);
          }}
          onValueChange={value => setCommittedCount(selectionCount(value))}
        />
      </div>
      <output aria-live="polite" className="docs-demo__status">
        {message} · {en ? `Committed: ${committedCount}` : `已提交：${committedCount}`}
      </output>
    </section>
  );
}
