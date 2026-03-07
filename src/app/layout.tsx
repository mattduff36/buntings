import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/custom.css';

import classNames from 'classnames';
import { fonts } from '@/resources/once-ui.config';

export const metadata = {
  title: 'Buntings Agri — Demo Showcase',
  description: 'Three frontend demo directions for Buntings Agri Ltd.',
  robots: 'noindex,nofollow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
      data-theme="light"
      data-neutral="slate"
      data-brand="green"
      data-accent="emerald"
      data-solid="contrast"
      data-solid-style="flat"
      data-border="conservative"
      data-surface="filled"
      data-transition="all"
      data-scaling="100"
    >
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
