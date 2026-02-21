"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { authApi, type User } from "@/lib/api";

// Uses sessionStorage so the app always starts signed out (clears on tab/browser close)
const STORAGE_KEY = "zs_token";
const getStoredToken = () => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(STORAGE_KEY);
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    loginWithToken: (token: string, user: User) => void;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAdmin: boolean;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const saveSession = useCallback((t: string, u: User) => {
        sessionStorage.setItem(STORAGE_KEY, t);
        setToken(t);
        setUser(u);
    }, []);

    // Rehydrate session from sessionStorage on mount
    useEffect(() => {
        // Clear any legacy localStorage tokens (migration: we switched to sessionStorage)
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("zs_token");
            localStorage.removeItem("user");
        }

        const stored = getStoredToken();
        if (stored) {
            setToken(stored);
            authApi.getMe()
                .then((res) => setUser(res.user))
                .catch(() => {
                    sessionStorage.removeItem(STORAGE_KEY);
                    setToken(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const res = await authApi.login({ email, password });
        saveSession(res.token, res.user);
    };

    // Direct token injection — used by OTP verify flow
    const loginWithToken = (t: string, u: User) => saveSession(t, u);

    const register = async (name: string, email: string, password: string) => {
        const res = await authApi.register({ name, email, password });
        saveSession(res.token, res.user);
    };

    const logout = () => {
        sessionStorage.removeItem(STORAGE_KEY);
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user, token, loading,
            login, loginWithToken, register, logout,
            isAdmin: user?.role === "admin",
            isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
