
// src/lib/auth/roles.ts
export type Role = 'visitor' | 'member' | 'pro' | 'admin';

export function getRoleFromEnv(): Role {
  const r = (process.env.NEXT_PUBLIC_DEFAULT_ROLE || 'visitor').toLowerCase();
  if (r === 'member' || r === 'pro' || r === 'admin') return r as Role;
  return 'visitor';
}

// Defines if a given path is a protected route (requires authentication)
export function isProtectedRoute(pathname: string): boolean {
  // All routes under /me/* are considered protected
  return pathname.startsWith('/me');
}

// Defines if a given path is an admin-only route
export function isAdminRoute(pathname: string): boolean {
  // Example: Only /admin/* routes are admin-only
  return pathname.startsWith('/admin');
}
