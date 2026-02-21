"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); setLoading(true);
        try {
            await login(email, password);
            router.push("/");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Invalid email or password");
        } finally { setLoading(false); }
    };

    return (
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
            {/* Left — Visual */}
            <div className="hidden lg:block relative bg-muted overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/20" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/hero.jpg" alt="ZeroShift" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <h2 className="text-5xl font-black tracking-tighter text-background leading-none mb-3">Welcome<br />Back.</h2>
                    <p className="text-background/70 text-sm max-w-xs">Log in to access your orders, profile, and exclusive member offers.</p>
                </div>
            </div>

            {/* Right — Form */}
            <div className="flex flex-col justify-center px-8 py-16 lg:px-16 relative">
                <Link href="/" className="absolute top-8 left-8 text-foreground hover:opacity-70 transition-opacity flex items-center gap-2 text-sm">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>

                <div className="max-w-sm w-full mx-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <KeyRound className="w-6 h-6" />
                        <h1 className="text-4xl font-black tracking-tighter">Log In</h1>
                    </div>
                    <p className="text-muted-foreground text-sm mb-10">Enter your email and password to access your account.</p>

                    {error && <div className="mb-6 p-3 bg-destructive/10 border border-destructive/30 rounded-sm text-destructive text-sm font-medium">{error}</div>}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com" required autoFocus
                                className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium">Password</label>
                                <Link href="/forgot-password" className="text-xs font-semibold text-muted-foreground hover:text-foreground">Forgot password?</Link>
                            </div>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••" required
                                className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                        </div>
                        <Button type="submit" disabled={loading} className="w-full h-12 rounded-none text-base font-bold shadow-none mt-2">
                            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing in...</> : "LOG IN →"}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-foreground font-semibold hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
