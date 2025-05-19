/**
 * Verify if the provided credentials match the admin credentials
 */
export function verifyAdminCredentials(username: string, password: string): boolean {
  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
} 