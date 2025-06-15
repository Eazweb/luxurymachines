'use client';

import { usePathname } from 'next/navigation';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isAdminRoute = pathname.startsWith('/admin');
  
  // Don't add padding for home page or admin routes
  const shouldAddPadding = !isHomePage && !isAdminRoute;
  
  return (
    <div>
      {children}
    </div>
  );
}
