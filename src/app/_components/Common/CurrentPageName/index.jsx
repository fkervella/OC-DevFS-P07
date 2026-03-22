'use client';

import { usePathname } from 'next/navigation';

function CurrentPageName() {
  const pathname = usePathname();
  const pageName = pathname.split('/').filter(Boolean).pop();

  return pageName;
}

export default CurrentPageName;
