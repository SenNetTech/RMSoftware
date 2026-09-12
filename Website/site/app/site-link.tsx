import type { ComponentProps } from 'react';

// This site is a static multi-page export. Native document navigation keeps
// visible URLs on HTML pages instead of depending on host-specific RSC routing.
// Keep native hash scrolling, modified clicks, downloads and new-tab behaviour.
export default function SiteLink({ children, ...props }: ComponentProps<'a'>) {
  return <a {...props}>{children}</a>;
}
