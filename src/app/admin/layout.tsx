'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { logoutAdmin } from '../actions/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show the admin layout on the login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="flex flex-col h-screen bg-[#f3f4f6]">
      {/* Responsive Navigation */}
      <div className="bg-[#1e293b] text-white">
        {/* Mobile Header */}
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-sm text-[#cbd5e1] hidden sm:block">Luxury Car Dealership</p>
        </div>
        
        {/* Horizontal Navigation for Mobile */}
        <nav className="overflow-x-auto scrollbar-hide">
          <ul className="flex whitespace-nowrap px-4 pb-2">
            <li className="mr-2">
              <Link 
                href="/admin" 
                className={`inline-block py-2 px-4 rounded-t-md ${
                  pathname === '/admin' ? 'bg-[#2563eb] text-white' : 'text-[#cbd5e1] hover:bg-[#334155]'
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li className="mr-2">
              <Link 
                href="/admin/vehicles" 
                className={`inline-block py-2 px-4 rounded-t-md ${
                  pathname.startsWith('/admin/vehicles') && pathname !== '/admin/vehicles/new' ? 'bg-[#2563eb] text-white' : 'text-[#cbd5e1] hover:bg-[#334155]'
                }`}
              >
                Vehicles
              </Link>
            </li>
            <li className="mr-2">
              <Link 
                href="/admin/vehicles/new" 
                className={`inline-block py-2 px-4 rounded-t-md ${
                  pathname === '/admin/vehicles/new' ? 'bg-[#2563eb] text-white' : 'text-[#cbd5e1] hover:bg-[#334155]'
                }`}
              >
                Add Vehicle
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="inline-block py-2 px-4 rounded-t-md text-[#cbd5e1] hover:bg-[#334155]"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-[#ffffff] shadow">
          <div className="py-4 px-6">
            <h2 className="text-xl font-semibold text-[#1f2937]">
              {pathname === '/admin' && 'Dashboard'}
              {pathname === '/admin/vehicles' && 'Manage Vehicles'}
              {pathname === '/admin/vehicles/new' && 'Add New Vehicle'}
              {pathname.includes('/admin/vehicles/edit') && 'Edit Vehicle'}
            </h2>
          </div>
        </header>
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
      
      {/* Add scrollbar-hide utility styles */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  );
} 