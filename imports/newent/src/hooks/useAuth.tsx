
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { isProtectedRoute, isAdminRoute } from '@/lib/auth/roles'; // Ensure this path is correct

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // TEMPORARY: AUTHENTICATION DISABLED FOR TESTING
    // To re-enable authentication, remove this block and uncomment the Firebase onAuthStateChanged logic below.
    const mockUser: FirebaseUser = {
      uid: 'test-uid-123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: '',
      emailVerified: true,
      isAnonymous: false,
      tenantId: null,
      providerData: [],
      refreshToken: '',
      phoneNumber: null,
      providerId: '',
      delete: async () => {},
      getIdToken: async () => 'mock-token',
      getIdTokenResult: async () => ({} as any),
      reload: async () => {},
      toJSON: () => ({}),
    };
    setUser(mockUser);
    setIsAdmin(true); // Assume admin for full testing access
    setLoading(false);
    return;
    // END TEMPORARY BLOCK

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Check admin role here or fetch from backend if necessary
        // For now, let's assume a basic check or fetch on login
        // setIsAdmin(currentUser.email === 'admin@example.com'); // Example admin check

        // Fetch user profile to check onboarding status
        try {
          const idToken = await currentUser.getIdToken();
          const response = await fetch('/api/user/profile', {
            headers: { 'Authorization': `Bearer ${idToken}` }
          });
          const data = await response.json();
          const onboardingComplete = data.ok && data.data?.onboardingComplete;
          const userIsAdmin = data.ok && data.data?.isAdmin;
          setIsAdmin(userIsAdmin);

          // Handle redirection based on onboarding and admin status
          if (!onboardingComplete && pathname !== '/onboarding') {
            router.push('/onboarding');
          } else if (isAdminRoute(pathname) && !userIsAdmin) {
            router.push('/me/workspace'); // Redirect non-admins from admin routes
          }

        } catch (e) {
          console.error("Failed to fetch user profile for auth context", e);
          setIsAdmin(false); // Default to non-admin on error
        }

      } else {
        setUser(null);
        setIsAdmin(false);
        // If user logs out or session expires, redirect them from protected routes to login
        if (isProtectedRoute(pathname) && pathname !== '/login') {
          router.push(`/login?redirect=${pathname}`);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);


  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  const value = { user, loading, isAdmin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
