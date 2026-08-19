import { Aside, Container, Header, Main } from '@aurora/horizon-react';

export default function ContainerSidebarDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';
  return (
    <Container style={{ height: 300, border: '1px solid var(--h-divider-default)' }}>
      <Header
        style={{ display: 'flex', alignItems: 'center', background: 'var(--h-bg-secondary)' }}
      >
        <strong>{isEnglish ? 'Operations center' : '运营中心'}</strong>
      </Header>
      <Container>
        <Aside
          aria-label={isEnglish ? 'Workspace navigation' : '工作区导航'}
          width={180}
          style={{ padding: 20, background: 'var(--h-bg-secondary)' }}
        >
          {isEnglish ? 'Navigation' : '导航'}
        </Aside>
        <Main style={{ paddingBlock: 24 }}>
          {isEnglish ? 'Dashboard workspace' : '仪表盘工作区'}
        </Main>
      </Container>
    </Container>
  );
}
