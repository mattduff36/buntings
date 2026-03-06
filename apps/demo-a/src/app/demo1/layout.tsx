import { Column } from '@once-ui-system/core';
import { LayoutProvider } from '@once-ui-system/core';
import { ThemeSetter } from '@/components/shared/ThemeSetter';
import { DemoProvider } from '@/components/shared/DemoContext';
import { Header } from '@/components/demo1/Header';
import { Footer } from '@/components/shared/Footer';
import { themes } from '@/resources/once-ui.config';

export const metadata = {
  title: 'Demo 1 — Modern Minimal | Buntings Agri',
};

export default function Demo1Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <DemoProvider basePath="/demo1" demoId="demo1">
        <ThemeSetter theme={themes.demo1} />
        <Column minHeight="100vh" background="page">
          <Header />
          <Column as="main" padding="l" maxWidth="xl" style={{ margin: '0 auto', width: '100%' }} flex={1}>
            {children}
          </Column>
          <Footer />
        </Column>
      </DemoProvider>
    </LayoutProvider>
  );
}
