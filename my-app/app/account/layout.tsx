"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Package, Settings, LogOut, MapPin, CreditCard, Loader2, Home } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const navItems = [
    { name: "Orders", href: "/account", icon: Package },
    { name: "Profile", href: "/account/profile", icon: User },
    { name: "Addresses", href: "/account/addresses", icon: MapPin },
    { name: "Payment Methods", href: "/account/payment-methods", icon: CreditCard },
    { name: "Settings", href: "/account/settings", icon: Settings },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated, loading, logout } = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) router.push("/login");
    }, [loading, isAuthenticated, router]);

    const handleLogout = () => { logout(); router.push("/"); };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
    );

    if (!isAuthenticated) return null;

    return (
        <main className="min-h-screen bg-muted/20 flex flex-col">
            {/* Minimal Dashboard Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
                <div className="flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
                    <Link href="/" className="font-black text-xl tracking-tight flex items-center gap-2">
                        <div className="w-7 h-7 bg-foreground text-background rounded-sm flex items-center justify-center flex-shrink-0">
                            <span className="text-base font-bold leading-none translate-y-[1px]">Z</span>
                        </div>
                        <span className="hidden sm:inline-block">ZERO<span className="text-muted-foreground">SHIFT</span></span>
                    </Link>
                    <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
                        <Home className="w-4 h-4" /> <span className="hidden sm:inline">Back to Store</span>
                    </Link>
                </div>
            </header>

            <div className="flex-1 py-10 lg:py-12">
                <div className="w-full px-4 md:px-8 max-w-6xl mx-auto">
                    <div className="mb-8 lg:mb-10 border-b border-border/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">My Account</h1>
                            <p className="text-muted-foreground text-base">
                                Welcome back, <span className="font-medium text-foreground">{user?.name}</span>.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Sidebar Navigation */}
                        <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24 h-fit">
                            <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`flex items-center h-10 md:h-11 px-4 rounded-md transition-all duration-200 whitespace-nowrap group ${isActive
                                                ? 'bg-muted text-foreground font-semibold shadow-sm'
                                                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground font-medium'
                                                }`}
                                        >
                                            <Icon className={`w-4 h-4 mr-3 transition-transform ${isActive ? '' : 'group-hover:scale-110'}`} />
                                            <span className="text-sm tracking-wide">{item.name}</span>
                                        </Link>
                                    );
                                })}
                                <div className="hidden lg:block w-full h-px bg-border/40 my-3" />
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center h-10 md:h-11 px-4 text-destructive hover:bg-destructive/10 hover:text-destructive font-medium transition-colors whitespace-nowrap rounded-md w-full group text-sm"
                                >
                                    <LogOut className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                                    <span className="tracking-wide">Log Out</span>
                                </button>
                            </nav>
                        </aside>

                        {/* Main Content Area */}
                        <div className="flex-1 min-w-0 bg-background lg:bg-transparent rounded-lg p-4 lg:p-0 shadow-sm lg:shadow-none border lg:border-none border-border/40">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

