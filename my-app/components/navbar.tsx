"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Menu, Home, Package, LayoutGrid, Info, LogOut, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { CartSheet } from "@/components/cart-sheet";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/categories", label: "Categories", icon: LayoutGrid },
    { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
    const { user, isAuthenticated, isAdmin, logout, loading } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    // Avatar initials from user name
    const initials = user?.name
        ? user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
        : "?";

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-4 left-0 right-0 z-50 w-[95%] max-w-7xl mx-auto rounded-full glass border shadow-lg transition-all duration-300"
        >
            <div className="px-5 sm:px-8 h-16 flex items-center justify-between">
                {/* Mobile Menu & Logo */}
                <div className="flex items-center gap-4 lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px]">
                            <nav className="flex flex-col gap-4 mt-8">
                                {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                                    <Link key={href} href={href} className="text-lg font-medium flex items-center gap-2">
                                        <Icon className="w-5 h-5" /> {label}
                                    </Link>
                                ))}
                                {isAuthenticated && (
                                    <>
                                        <div className="h-px bg-border my-2" />
                                        <Link href="/account" className="text-lg font-medium flex items-center gap-2">
                                            <User className="w-5 h-5" /> My Account
                                        </Link>
                                        {isAdmin && (
                                            <Link href="/admin" className="text-lg font-medium flex items-center gap-2">
                                                <Shield className="w-5 h-5" /> Admin
                                            </Link>
                                        )}
                                        <button onClick={handleLogout} className="text-lg font-medium flex items-center gap-2 text-destructive">
                                            <LogOut className="w-5 h-5" /> Log Out
                                        </button>
                                    </>
                                )}
                                {!isAuthenticated && (
                                    <>
                                        <div className="h-px bg-border my-2" />
                                        <Link href="/login" className="text-lg font-medium">Log In</Link>
                                        <Link href="/signup" className="text-lg font-medium">Sign Up</Link>
                                    </>
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                            <ShoppingBag className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-xl tracking-tight hidden sm:inline-block text-gradient">ZeroShift</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-2 mr-6 hover-lift">
                        <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                            <ShoppingBag className="h-6 w-6" />
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-gradient">ZeroShift</span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm font-medium">
                        {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                            <Link key={href} href={href} className="relative group transition-colors hover:text-primary text-muted-foreground flex items-center gap-1.5">
                                <Icon className="w-4 h-4" /> {label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Search, Cart & User */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex relative group">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-[150px] lg:w-[250px] pl-9 bg-muted/50 focus-visible:ring-primary border-transparent rounded-full transition-all focus:w-[200px] lg:focus:w-[300px]"
                        />
                    </div>
                    <CartSheet />

                    {/* Auth: show skeleton while loading */}
                    {loading ? (
                        <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
                    ) : isAuthenticated ? (
                        /* ── Logged-in state ── */
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-primary/30 hover:ring-primary/60 transition-all bg-primary text-primary-foreground font-bold text-sm">
                                    {initials}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-semibold">{user?.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/account" className="cursor-pointer flex items-center gap-2">
                                        <User className="w-4 h-4" /> My Account
                                    </Link>
                                </DropdownMenuItem>
                                {isAdmin && (
                                    <DropdownMenuItem asChild>
                                        <Link href="/admin" className="cursor-pointer flex items-center gap-2">
                                            <Shield className="w-4 h-4" /> Admin Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive flex items-center gap-2">
                                    <LogOut className="w-4 h-4" /> Log Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        /* ── Signed-out state ── */
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="rounded-full font-medium" asChild>
                                <Link href="/login">Log In</Link>
                            </Button>
                            <Button size="sm" className="rounded-full font-medium shadow-none" asChild>
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </motion.header>
    );
}
