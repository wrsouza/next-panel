"use client";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

export interface IAuthUser {
  id: string;
  name: string;
  email: string;
  admin: boolean;
  roles: string[];
}

interface IAuthPaylod {
  sub: string;
  name: string;
  email: string;
  admin: boolean;
  roles: string[];
}

interface AuthContextState {
  loading: boolean;
  error: string | null;
}

interface AuthContextActions {
  isAuthenticated: boolean;
  user: IAuthUser | null;
  logout: () => Promise<void>;
}

interface AuthContextType extends AuthContextState, AuthContextActions {}

const AuthContext = createContext<AuthContextType>({
  loading: false,
  error: null,
  user: null,
  isAuthenticated: false,
  logout: () => {},
} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const cookies = useCookies();
  const [state, setState] = useState<AuthContextState>({
    loading: true,
    error: null,
  });
  const [user, setUser] = useState<IAuthUser | null>(null);
  const router = useRouter();

  const getUser = useCallback(() => {
    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
      return;
    }
    const decoded = jwtDecode<IAuthPaylod>(accessToken!);
    setUser({
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      admin: decoded.admin,
      roles: decoded.roles,
    });
  }, [cookies]);

  const logout = useCallback(() => {
    cookies.remove("accessToken");
    router.push("/sign-in");
  }, [cookies]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const contextValues = useMemo(
    () => ({
      ...state,
      user,
      isAuthenticated: !!user,
      logout,
    }),
    [state, user, logout]
  );

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext<AuthContextType>(AuthContext);
}
