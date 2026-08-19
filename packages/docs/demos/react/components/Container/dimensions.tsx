import { Aside, Container, Footer, Main } from '@aurora/horizon-react';

export default function ContainerDimensionsDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';
  return (
    <Container
      direction="horizontal"
      style={{ minHeight: 220, border: '1px solid var(--h-divider-default)' }}
    >
      <Aside width="clamp(140px, 28vw, 240px)" style={{ padding: 20 }}>
        {isEnglish ? 'Flexible sidebar' : '弹性侧栏'}
      </Aside>
      <Container direction="vertical">
        <Main style={{ paddingBlock: 24 }}>
          {isEnglish ? 'The main region fills the remaining space.' : '主区域填充剩余空间。'}
        </Main>
        <Footer height={48} style={{ display: 'flex', alignItems: 'center' }}>
          {isEnglish ? '48 px footer' : '48 像素底栏'}
        </Footer>
      </Container>
    </Container>
  );
}
