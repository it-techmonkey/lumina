'use client';

import React, { createContext, useContext, type ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';
import type { ShopifyCustomer } from '@/lib/shopify';

// ============================================
// Types
// ============================================

interface AuthContextType {
  customer: ShopifyCustomer | null;
  isLoading: boolean;
}

// ============================================
// Context
// ============================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ============================================
// Provider
// ============================================

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isLoaded, user } = useUser();
  const primaryEmailAddress =
    user?.primaryEmailAddress?.emailAddress ?? user?.emailAddresses[0]?.emailAddress ?? null;

  const customer: ShopifyCustomer | null = user && primaryEmailAddress ? {
    id: user.id,
    firstName: user.firstName ?? null,
    lastName: user.lastName ?? null,
    email: primaryEmailAddress,
    phone: user.primaryPhoneNumber?.phoneNumber ?? null,
  } : null;

  return (
    <AuthContext.Provider value={{ customer, isLoading: !isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};
