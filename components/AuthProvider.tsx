// Lokasi: components/AuthProvider.tsx

"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Membuat tipe untuk context
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// Membuat context
const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

// Membuat Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener ini akan berjalan setiap kali status otentikasi berubah
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Membersihkan listener saat komponen dilepas
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Membuat custom hook untuk menggunakan context dengan mudah
export const useAuth = () => useContext(AuthContext);