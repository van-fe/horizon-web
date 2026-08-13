import { useMemo, useState } from 'react';
import type { TreeOption } from '@aurora/horizon-web-react';
import { Tree } from '@aurora/horizon-web-react';

type WorkspaceNode = TreeOption & {
  owner?: string;
};

export default function TreeDragRenderDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const initialData = useMemo<WorkspaceNode[]>(
    () => [
      {
        value: 'active',
        label: en ? 'Active work' : '进行中的工作',
        children: [
          { value: 'navigation', label: en ? 'Navigation refresh' : '导航改版', owner: 'Mika' },
          {
            value: 'accessibility',
            label: en ? 'Accessibility audit' : '无障碍审计',
            owner: 'Noah',
          },
        ],
      },
      { value: 'backlog', label: en ? 'Backlog' : '待办列表', owner: 'Team' },
    ],
    [en],
  );
  const [treeData, setTreeData] = useState<readonly WorkspaceNode[]>(initialData);
  const [status, setStatus] = useState(
    en ? 'Drag a row to reorder work' : '拖动节点以调整工作顺序',
  );

  return (
    <section className="docs-demo" style={{ maxWidth: 520 }}>
      <p className="docs-demo__description">
        {en
          ? 'Rows can be reordered, and the renderer adds a compact owner label without changing the source data model.'
          : '节点可以重新排序；渲染函数会加入简洁的负责人信息，而不会改变数据模型。'}
      </p>
      <div className="docs-demo__stage">
        <Tree
          defaultExpandedValues={['active']}
          dragOnHandler={false}
          draggable
          onNodeClick={(_, __, node) =>
            setStatus(`${en ? 'Opened' : '已打开'}: ${String(node.label)}`)
          }
          onTreeDataChange={nextData => {
            setTreeData(nextData as readonly WorkspaceNode[]);
            setStatus(en ? 'Work order updated' : '工作顺序已更新');
          }}
          renderNode={({ node, checked }) => {
            const item = node.originOption as WorkspaceNode;
            return (
              <span style={{ display: 'flex', flex: 1, justifyContent: 'space-between', gap: 12 }}>
                <span>{node.label}</span>
                <small style={{ color: checked ? 'currentColor' : 'var(--h-text-secondary)' }}>
                  {item.owner ?? (en ? 'Group' : '分组')}
                </small>
              </span>
            );
          }}
          treeData={treeData}
        />
      </div>
      <output aria-live="polite" className="docs-demo__status">
        {status}
      </output>
    </section>
  );
}
