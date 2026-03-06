import { Column } from '@once-ui-system/core';
import { LayoutProvider } from '@once-ui-system/core';
import { ThemeSetter } from '@/components/shared/ThemeSetter';
import { DemoProvider } from '@/components/shared/DemoContext';
import { Header } from '@/components/demo3/Header';
import { Footer } from '@/components/shared/Footer';
import { themes } from '@/resources/once-ui.config';

export const metadata = {
  title: 'Demo 3 — Classic Earth | Buntings Agri',
};

export default function Demo3Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <DemoProvider basePath="/demo3" demoId="demo3">
        <ThemeSetter theme={themes.demo3} />
        <Column minHeight="100vh" background="page">
          <Header />
          <Column as="main" flex={1}>
            {children}
          </Column>
          <Footer />
        </Column>
      </DemoProvider>
    </LayoutProvider>
  );
}
