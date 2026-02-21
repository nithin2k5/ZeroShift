"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
    return (
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">

            {/* Left Image Section */}
            <div className="relative hidden lg:block bg-muted overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/hero.jpg"
                    alt="LuxeCart Identity"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-90"
                />
                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute inset-0 flex flex-col justify-between p-12">
                    <Link href="/" className="text-white hover:opacity-80 transition-opacity flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5" /> Back to store
                    </Link>
                    <div>
                        <h2 className="text-white text-5xl font-black tracking-tight mb-4">Welcome Back</h2>
                        <p className="text-white/80 text-xl font-light max-w-md">Sign in to access your curated wardrobe, track orders, and experience faster checkout.</p>
                    </div>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="flex flex-col justify-center px-8 sm:px-16 md:px-24 py-12 lg:py-0">

                {/* Mobile Back Button */}
                <Link href="/" className="lg:hidden text-foreground hover:opacity-80 transition-opacity flex items-center gap-2 mb-12">
                    <ArrowLeft className="w-5 h-5" /> Back to store
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md mx-auto"
                >
                    <div className="mb-10 lg:hidden">
                        <h1 className="text-4xl font-black tracking-tight mb-2">Welcome Back</h1>
                        <p className="text-muted-foreground">Sign in to access your account.</p>
                    </div>

                    <div className="hidden lg:block mb-10 text-center">
                        <h1 className="text-4xl font-black tracking-tighter mb-2">Log In</h1>
                        <p className="text-muted-foreground text-sm">Enter your details to proceed.</p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Email Address
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className="h-12 rounded-none border-border/60 focus-visible:ring-1 focus-visible:ring-foreground shadow-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Password
                                </label>
                                <Link href="#" className="text-xs text-muted-foreground hover:text-foreground hover:underline transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                className="h-12 rounded-none border-border/60 focus-visible:ring-1 focus-visible:ring-foreground shadow-none"
                            />
                        </div>

                        <Button type="button" className="w-full h-12 rounded-none text-base font-bold shadow-none hover:scale-[1.01] transition-transform bg-primary text-primary-foreground">
                            SIGN IN
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-foreground font-semibold hover:underline">
                            Create one
                        </Link>
                    </div>

                </motion.div>
            </div>
        </main>
    );
}
