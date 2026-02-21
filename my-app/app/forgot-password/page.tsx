"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Mail, KeyRound, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/api";

export default function ForgotPasswordPage() {
    const router = useRouter();

    const [step, setStep] = useState<"email" | "reset" | "success">("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRequestOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); setLoading(true);
        try {
            await authApi.forgotPassword(email);
            setStep("reset");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to send code");
        } finally { setLoading(false); }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (newPassword !== confirmPassword) {
            return setError("Passwords do not match");
        }
        if (newPassword.length < 6) {
            return setError("Password must be at least 6 characters");
        }

        setLoading(true);
        try {
            await authApi.resetPassword(email, otp, newPassword);
            setStep("success");
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to reset password");
        } finally { setLoading(false); }
    };

    return (
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
            {/* Left — Visual */}
            <div className="hidden lg:block relative bg-muted overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/20" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/hero.jpg" alt="ZeroShift" className="w-full h-full object-cover opacity-70 grayscale" />
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <h2 className="text-5xl font-black tracking-tighter text-background leading-none mb-3">Reset<br />Password.</h2>
                    <p className="text-background/70 text-sm max-w-xs">Get back into your account securely.</p>
                </div>
            </div>

            {/* Right — Form */}
            <div className="flex flex-col justify-center px-8 py-16 lg:px-16 relative">
                <Link href="/login" className="absolute top-8 left-8 text-foreground hover:opacity-70 transition-opacity flex items-center gap-2 text-sm">
                    <ArrowLeft className="w-4 h-4" /> Back to Login
                </Link>

                <div className="max-w-sm w-full mx-auto">
                    {/* Step indicator */}
                    {step !== "success" && (
                        <div className="flex items-center gap-3 mb-8">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === "email" ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>1</div>
                            <div className={`h-px flex-1 ${step === "reset" ? "bg-foreground" : "bg-border"}`} />
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === "reset" ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>2</div>
                        </div>
                    )}

                    {step === "email" && (
                        <>
                            <div className="flex items-center gap-3 mb-2">
                                <Mail className="w-6 h-6" />
                                <h1 className="text-3xl font-black tracking-tighter">Forgot Password</h1>
                            </div>
                            <p className="text-muted-foreground text-sm mb-10">Enter your email and we&apos;ll send you a 6-digit code to reset your password.</p>

                            {error && <div className="mb-6 p-3 bg-destructive/10 border border-destructive/30 rounded-sm text-destructive text-sm font-medium">{error}</div>}

                            <form onSubmit={handleRequestOTP} className="space-y-5">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com" required autoFocus
                                        className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                </div>
                                <Button type="submit" disabled={loading} className="w-full h-12 rounded-none text-base font-bold shadow-none">
                                    {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending code...</> : "SEND RESET CODE →"}
                                </Button>
                            </form>
                        </>
                    )}

                    {step === "reset" && (
                        <>
                            <div className="flex items-center gap-3 mb-2">
                                <KeyRound className="w-6 h-6" />
                                <h1 className="text-3xl font-black tracking-tighter">Reset Password</h1>
                            </div>
                            <p className="text-muted-foreground text-sm mb-2">We sent a 6-digit code to</p>
                            <p className="font-semibold mb-8">{email}</p>

                            {error && <div className="mb-6 p-3 bg-destructive/10 border border-destructive/30 rounded-sm text-destructive text-sm font-medium">{error}</div>}

                            <form onSubmit={handleResetPassword} className="space-y-5">
                                <div className="space-y-2">
                                    <label htmlFor="otp" className="text-sm font-medium">6-Digit Code</label>
                                    <Input id="otp" type="text" inputMode="numeric" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                        placeholder="000000" required autoFocus
                                        className="h-14 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground text-3xl font-black tracking-[0.5em] text-center" />
                                </div>
                                <div className="space-y-2 pt-2">
                                    <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
                                    <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Min 6 characters" required
                                        className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                                    <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Repeat new password" required
                                        className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                </div>
                                <Button type="submit" disabled={loading || otp.length !== 6 || !newPassword || !confirmPassword} className="w-full h-12 rounded-none text-base font-bold shadow-none mt-4">
                                    {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Resetting...</> : "RESET PASSWORD"}
                                </Button>
                            </form>

                            <button onClick={() => { setStep("email"); setOtp(""); setError(""); setNewPassword(""); setConfirmPassword(""); }}
                                className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                                ← Use a different email
                            </button>
                        </>
                    )}

                    {step === "success" && (
                        <div className="text-center py-8">
                            <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-green-600" />
                            <h2 className="text-2xl font-black mb-2">Password Reset!</h2>
                            <p className="text-muted-foreground text-sm mb-8">Your password has been successfully updated. You can now log in with your new password.</p>
                            <p className="text-xs text-muted-foreground animate-pulse">Redirecting to login...</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
