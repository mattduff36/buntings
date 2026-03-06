import { Column } from '@once-ui-system/core';
import { LayoutProvider } from '@once-ui-system/core';
import { ThemeSetter } from '@/components/shared/ThemeSetter';
import { DemoProvider } from '@/components/shared/DemoContext';
import { Header } from '@/components/demo2/Header';
import { Footer } from '@/components/shared/Footer';
import { themes } from '@/resources/once-ui.config';

export const metadata = {
  title: 'Demo 2 — Dark Machinery | Buntings Agri',
};

export default function Demo2Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <DemoProvider basePath="/demo2" demoId="demo2">
        <ThemeSetter theme={themes.demo2} />
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
