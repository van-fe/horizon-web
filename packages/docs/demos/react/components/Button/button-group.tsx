import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu } from '@aurora/horizon-react';
import { useState } from 'react';

export default function ButtonGroupDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [command, setCommand] = useState('—');
  const en = locale === 'en';
  return (
    <div className="docs-demo" style={{ display: 'grid', gap: 12 }}>
      <div className="docs-demo__actions">
        <ButtonGroup aria-label={en ? 'Record navigation' : '记录导航'}>
          <Button icon={<span aria-hidden>←</span>}>{en ? 'Previous' : '上一条'}</Button>
          <Button suffix={<span aria-hidden>→</span>}>{en ? 'Next' : '下一条'}</Button>
        </ButtonGroup>
        <ButtonGroup aria-label={en ? 'Editing tools' : '编辑工具'} variant="normal">
          <Button aria-label={en ? 'Preview' : '预览'} icon={<span aria-hidden>◉</span>} plain />
          <Button aria-label={en ? 'Edit' : '编辑'} icon={<span aria-hidden>✎</span>} plain />
          <Button aria-label={en ? 'Delete' : '删除'} icon={<span aria-hidden>×</span>} plain />
        </ButtonGroup>
        <ButtonGroup aria-label={en ? 'Approval actions' : '审核操作'}>
          <Button onClick={() => setCommand(en ? 'Approved' : '已通过')}>
            {en ? 'Approve' : '通过'}
          </Button>
          <Dropdown
            menu={
              <DropdownMenu>
                <DropdownItem command="notify">
                  {en ? 'Approve and notify' : '通过并通知'}
                </DropdownItem>
                <DropdownItem command="changes">{en ? 'Request changes' : '请求修改'}</DropdownItem>
              </DropdownMenu>
            }
            onCommand={value => setCommand(String(value))}
            trigger="click"
          >
            <Button
              aria-label={en ? 'More approval actions' : '更多审核操作'}
              icon={<span aria-hidden>⌄</span>}
            />
          </Dropdown>
        </ButtonGroup>
      </div>
      <span className="docs-demo__status">{command}</span>
    </div>
  );
}
