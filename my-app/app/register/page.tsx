"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
    return (
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">

            {/* Left Form Section */}
            <div className="flex flex-col justify-center px-8 sm:px-16 md:px-24 py-12 lg:py-0 order-2 lg:order-1">

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
                        <h1 className="text-4xl font-black tracking-tight mb-2">Join LuxeCart</h1>
                        <p className="text-muted-foreground">Create an account to elevate your experience.</p>
                    </div>

                    <div className="hidden lg:block mb-10 text-center">
                        <Link href="/" className="absolute top-12 left-12 text-foreground hover:opacity-80 transition-opacity flex items-center gap-2">
                            <ArrowLeft className="w-5 h-5" /> Back to store
                        </Link>
                        <h1 className="text-4xl font-black tracking-tighter mb-2">Create Account</h1>
                        <p className="text-muted-foreground text-sm">Fill in your details to get started.</p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium leading-none">First Name</label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="John"
                                    className="h-12 rounded-none border-border/60 focus-visible:ring-1 focus-visible:ring-foreground shadow-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium leading-none">Last Name</label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    className="h-12 rounded-none border-border/60 focus-visible:ring-1 focus-visible:ring-foreground shadow-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none">Email Address</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className="h-12 rounded-none border-border/60 focus-visible:ring-1 focus-visible:ring-foreground shadow-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium leading-none">Password</label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Min. 8 characters"
                                className="h-12 rounded-none border-border/60 focus-visible:ring-1 focus-visible:ring-foreground shadow-none"
                            />
                        </div>

                        <Button type="button" className="w-full h-12 rounded-none text-base font-bold shadow-none hover:scale-[1.01] transition-transform bg-primary text-primary-foreground">
                            CREATE ACCOUNT
                        </Button>
                    </form>

                    <p className="mt-6 text-xs text-muted-foreground text-center">
                        By creating an account, you agree to our <Link href="#" className="underline hover:text-foreground">Terms of Service</Link> and <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>.
                    </p>

                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-foreground font-semibold hover:underline">
                            Log in
                        </Link>
                    </div>

                </motion.div>
            </div>

            {/* Right Image Section */}
            <div className="relative hidden lg:block bg-muted overflow-hidden order-1 lg:order-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/cat-1.jpg"
                    alt="LuxeCart Identity"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-90"
                />
                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <div>
                        <h2 className="text-white text-5xl font-black tracking-tight mb-4">Elevate Your Standard</h2>
                        <p className="text-white/80 text-xl font-light max-w-md">Join an exclusive community of individuals who appreciate uncompromising quality and timeless design.</p>
                    </div>
                </div>
            </div>

        </main>
    );
}
