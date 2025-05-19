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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-slate-300">Luxury Car Dealership</p>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/admin" 
                className={`block py-2 px-4 ${
                  pathname === '/admin' ? 'bg-blue-600' : 'hover:bg-slate-700'
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/vehicles" 
                className={`block py-2 px-4 ${
                  pathname.startsWith('/admin/vehicles') ? 'bg-blue-600' : 'hover:bg-slate-700'
                }`}
              >
                Vehicles
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/vehicles/new" 
                className={`block py-2 px-4 ${
                  pathname === '/admin/vehicles/new' ? 'bg-blue-600' : 'hover:bg-slate-700'
                }`}
              >
                Add Vehicle
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 px-4 hover:bg-slate-700"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="py-4 px-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {pathname === '/admin' && 'Dashboard'}
              {pathname === '/admin/vehicles' && 'Manage Vehicles'}
              {pathname === '/admin/vehicles/new' && 'Add New Vehicle'}
              {pathname.includes('/admin/vehicles/edit') && 'Edit Vehicle'}
            </h2>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 