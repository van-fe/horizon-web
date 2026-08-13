import { useMemo, useState } from 'react';
import type { TreeSelectOption, TreeSelectProps } from '@aurora/horizon-web-react';
import { Button, TreeSelect } from '@aurora/horizon-web-react';

export default function TreeSelectControlledConfirmDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<TreeSelectProps['value']>(['design']);
  const [status, setStatus] = useState(en ? 'One permission applied' : '已应用 1 项权限');
  const data = useMemo<TreeSelectOption[]>(
    () => [
      {
        value: 'workspace',
        label: en ? 'Workspace access' : '工作区权限',
        children: [
          { value: 'design', label: en ? 'Design files' : '设计文件' },
          { value: 'reports', label: en ? 'Reports' : '报表' },
          { value: 'settings', label: en ? 'Settings' : '设置' },
        ],
      },
    ],
    [en],
  );

  return (
    <section className="docs-demo" style={{ maxWidth: 500 }}>
      <p className="docs-demo__description">
        {en
          ? 'Selection stays staged while the popup is open. Apply commits the draft; Discard restores the current value.'
          : '面板打开时选择保持为草稿；“应用”提交草稿，“放弃”恢复当前值。'}
      </p>
      <div className="docs-demo__actions">
        <Button onClick={() => setOpen(true)}>{en ? 'Edit permissions' : '编辑权限'}</Button>
        <Button
          plain
          onClick={() => {
            setValue([]);
            setStatus(en ? 'Permissions reset' : '已重置权限');
          }}
        >
          {en ? 'Reset' : '重置'}
        </Button>
      </div>
      <div className="docs-demo__stage">
        <TreeSelect
          cancelText={en ? 'Discard' : '放弃'}
          checkStrictly
          confirmText={en ? 'Apply' : '应用'}
          defaultExpandedValues={['workspace']}
          multiple
          needConfirm
          open={open}
          showCheckbox
          treeData={data}
          value={value}
          onCancel={() => setStatus(en ? 'Draft discarded' : '已放弃草稿')}
          onConfirm={nextValue => {
            const count = Array.isArray(nextValue) ? nextValue.length : nextValue == null ? 0 : 1;
            setStatus(en ? `${count} permissions applied` : `已应用 ${count} 项权限`);
          }}
          onOpenChange={setOpen}
          onValueChange={setValue}
        />
      </div>
      <output aria-live="polite" className="docs-demo__status">
        {status}
      </output>
    </section>
  );
}
