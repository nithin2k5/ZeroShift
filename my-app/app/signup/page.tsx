"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            await register(name, email, password);
            router.push("/account");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">

            {/* Left — Visual */}
            <div className="hidden lg:block relative bg-muted overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/20" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/hero-bg.jpg" alt="ZeroShift" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <h2 className="text-5xl font-black tracking-tighter text-background leading-none mb-3">Join<br />ZeroShift.</h2>
                    <p className="text-background/70 text-sm max-w-xs">Create your account to unlock exclusive member discounts and order tracking.</p>
                </div>
            </div>

            {/* Right — Form */}
            <div className="flex flex-col justify-center px-8 py-16 lg:px-16 relative">
                <Link href="/" className="absolute top-8 left-8 text-foreground hover:opacity-70 transition-opacity flex items-center gap-2 text-sm">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>

                <div className="max-w-sm w-full mx-auto">
                    <h1 className="text-4xl font-black tracking-tighter mb-2">Sign Up</h1>
                    <p className="text-muted-foreground text-sm mb-10">Fill in your details to get started.</p>

                    {error && (
                        <div className="mb-6 p-3 bg-destructive/10 border border-destructive/30 rounded-sm text-destructive text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe" required
                                className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com" required
                                className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">Password</label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min. 6 characters" required
                                className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="confirm" className="text-sm font-medium">Confirm Password</label>
                            <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
                                placeholder="••••••••" required
                                className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                        </div>

                        <Button type="submit" disabled={loading}
                            className="w-full h-12 rounded-none text-base font-bold shadow-none hover:scale-[1.01] transition-transform">
                            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating account...</> : "SIGN UP"}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-foreground font-semibold hover:underline">Log in</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
