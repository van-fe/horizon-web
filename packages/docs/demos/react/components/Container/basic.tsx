import { Container, Footer, Header, Main } from '@aurora/horizon-react';

export default function ContainerBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';
  return (
    <Container
      aria-label={isEnglish ? 'Project workspace' : '项目工作区'}
      style={{ height: 280, border: '1px solid var(--h-divider-default)' }}
    >
      <Header
        style={{ display: 'flex', alignItems: 'center', background: 'var(--h-bg-secondary)' }}
      >
        <strong>{isEnglish ? 'Project console' : '项目控制台'}</strong>
      </Header>
      <Main style={{ paddingBlock: 24 }}>
        {isEnglish ? 'Primary workspace content' : '主要工作区内容'}
      </Main>
      <Footer
        style={{ display: 'flex', alignItems: 'center', background: 'var(--h-bg-secondary)' }}
      >
        {isEnglish ? 'Last saved just now' : '刚刚完成保存'}
      </Footer>
    </Container>
  );
}
