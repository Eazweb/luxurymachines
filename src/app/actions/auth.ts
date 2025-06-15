'use server';

import { cookies } from 'next/headers';
import { verifyAdminCredentials } from '@/lib/auth';

export async function loginAdmin(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  
  if (!username || !password) {
    return { success: false, message: 'Username and password are required' };
  }
  
  if (verifyAdminCredentials(username, password)) {
    // Set a cookie to identify the admin session
    (await cookies()).set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
      sameSite: 'lax',
    });
    
    return { success: true };
  }
  
  return { success: false, message: 'Invalid credentials' };
}

export async function logoutAdmin() {
  (await cookies()).delete('admin_session');
  return { success: true };
}

export async function checkAdminSession() {
  const session = (await cookies()).get('admin_session');
  return !!session?.value;
}