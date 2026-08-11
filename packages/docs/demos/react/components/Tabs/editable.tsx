import { useState } from 'react';
import type { TabsKey } from '@aurora/horizon-web-react';
import { Tab, Tabs } from '@aurora/horizon-web-react';

interface DocumentTab {
  key: string;
  label: string;
  closable: boolean;
}

export default function TabsEditableDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [activeKey, setActiveKey] = useState<TabsKey>('overview');
  const [counter, setCounter] = useState(2);
  const [documents, setDocuments] = useState<DocumentTab[]>([
    { key: 'overview', label: en ? 'Overview' : '概览', closable: false },
    { key: 'brief-1', label: en ? 'Research brief' : '研究简报', closable: true },
    { key: 'brief-2', label: en ? 'Launch notes' : '发布记录', closable: true },
  ]);

  function addDocument() {
    const next = counter + 1;
    const document = {
      key: `brief-${next}`,
      label: en ? `Untitled ${next}` : `未命名 ${next}`,
      closable: true,
    };
    setCounter(next);
    setDocuments(current => [...current, document]);
    setActiveKey(document.key);
  }

  function closeDocument(key: TabsKey | undefined) {
    if (key === undefined) return;
    setDocuments(current => current.filter(document => document.key !== key));
  }

  return (
    <section className="docs-demo">
      <Tabs
        draggable
        editable
        onAdd={addDocument}
        onChange={setActiveKey}
        onClose={closeDocument}
        value={activeKey}
        variant="card"
      >
        {documents.map(document => (
          <Tab
            closable={document.closable}
            key={document.key}
            label={document.label}
            value={document.key}
          />
        ))}
      </Tabs>
      <span aria-live="polite" className="docs-demo__status">
        {en ? `${documents.length} documents` : `${documents.length} 个文档`}
      </span>
    </section>
  );
}
