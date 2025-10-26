"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { app, db } from "@/lib/firebase"; // Assuming firebase is initialized in this file

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  workspace?: {
    activatedTools?: string[];
  };
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  signOut: () => void;
  updateUserWorkspace: (data: { activatedTools: string[] }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  
  useEffect(() => {
    // --- AUTH DISABLED FOR DEVELOPMENT ---
    // This mock user allows you to access the workspace without logging in.
    const mockUser: UserData = {
      uid: 'dev-user-123',
      email: 'dev@entrestate.com',
      displayName: 'Dev User',
      workspace: {
        activatedTools: ['lead-intel', 'listing-intel', 'whatsmap-agent']
      },
    };
    setUser(mockUser);
    setLoading(false);
    // --- END ---
  }, []);

  const signOut = () => firebaseSignOut(auth);

  const updateUserWorkspace = async (data: { activatedTools: string[] }) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { workspace: data }, { merge: true });
    }
  };

  const value = { user, loading, signOut, updateUserWorkspace };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};