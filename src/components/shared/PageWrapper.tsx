import { Column } from '@once-ui-system/core';
import { AnimatedPageWrapper } from './AnimatedPageWrapper';

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <AnimatedPageWrapper>
      {children}
    </AnimatedPageWrapper>
  );
}
