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
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

const NAV_LINKS = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/categories", label: "Categories", icon: LayoutGrid },
    { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
    const { user, isAuthenticated, isAdmin, logout, loading } = useAuth();
    const router = useRouter();
    const { scrollY } = useScroll();

    // Header background opacity based on scroll
    const headerBg = useTransform(
        scrollY,
        [0, 50],
        ["rgba(var(--background), 0)", "rgba(var(--background), 0.95)"]
    );
    const headerBorder = useTransform(
        scrollY,
        [0, 50],
        ["rgba(var(--border), 0)", "rgba(var(--border), 0.5)"]
    );
    const headerShadow = useTransform(
        scrollY,
        [0, 50],
        ["none", "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)"]
    );

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
                backgroundColor: headerBg as any,
                borderBottomColor: headerBorder as any,
                boxShadow: headerShadow as any,
            }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-transparent`}
        >
            <div className={`container mx-auto px-4 sm:px-6 transition-all duration-300 flex items-center justify-between ${scrolled ? 'h-16' : 'h-20'}`}>
                {/* Mobile Menu & Logo */}
                <div className="flex items-center gap-4 lg:hidden flex-none w-1/3">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-muted/50 rounded-full">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px]">
                            <div className="flex items-center gap-2 mb-8 pl-2">
                                <div className="bg-foreground text-background p-1.5 rounded-lg">
                                    <ShoppingBag className="h-5 w-5" />
                                </div>
                                <span className="font-bold text-xl tracking-tighter">Zero<span className="text-primary font-black">Shift</span></span>
                            </div>
                            <nav className="flex flex-col gap-2">
                                {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                                    <Link key={href} href={href} className="text-base font-medium flex items-center gap-4 hover:bg-muted p-3 rounded-xl transition-colors">
                                        <div className="bg-primary/10 text-primary p-2 rounded-lg">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        {label}
                                    </Link>
                                ))}
                                {isAuthenticated ? (
                                    <div className="mt-4 border-t pt-4 border-border/50">
                                        <Link href="/account" className="text-base font-medium flex items-center gap-4 hover:bg-muted p-3 rounded-xl transition-colors">
                                            <div className="bg-primary/10 text-primary p-2 rounded-lg"><User className="w-5 h-5" /></div> My Account
                                        </Link>
                                        {isAdmin && (
                                            <Link href="/admin" className="text-base font-medium flex items-center gap-4 hover:bg-muted p-3 rounded-xl transition-colors">
                                                <div className="bg-primary/10 text-primary p-2 rounded-lg"><Shield className="w-5 h-5" /></div> Admin
                                            </Link>
                                        )}
                                        <button onClick={handleLogout} className="text-base font-medium flex items-center gap-4 hover:bg-destructive/10 text-destructive p-3 rounded-xl transition-colors w-full text-left">
                                            <div className="bg-destructive/10 p-2 rounded-lg"><LogOut className="w-5 h-5" /></div> Log Out
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-4 border-t pt-4 border-border/50 flex flex-col gap-2">
                                        <Button asChild variant="outline" className="w-full justify-start rounded-xl h-12">
                                            <Link href="/login">Log In</Link>
                                        </Button>
                                        <Button asChild className="w-full justify-start rounded-xl h-12">
                                            <Link href="/signup">Sign Up</Link>
                                        </Button>
                                    </div>
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <Link href="/" className="flex items-center gap-2 sm:hidden">
                        <ShoppingBag className="h-6 w-6" />
                    </Link>
                </div>

                {/* Desktop Logo (Left) */}
                <div className="hidden sm:flex lg:w-1/4 items-center justify-start lg:block flex-none">
                    <Link href="/" className="flex items-center gap-2 hover-lift group w-fit">
                        <div className="bg-foreground text-background p-1.5 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                            <ShoppingBag className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-2xl tracking-tighter">Zero<span className="text-primary font-black">Shift</span></span>
                    </Link>
                </div>

                {/* Desktop Navigation (Center) */}
                <nav className="hidden lg:flex flex-1 items-center justify-center gap-1">
                    {NAV_LINKS.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="relative group px-5 py-2 hover:text-foreground text-foreground/70 transition-colors rounded-full font-medium"
                        >
                            <span className="relative z-10">{label}</span>
                            <span className="absolute inset-0 bg-muted/50 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 ease-out" />
                        </Link>
                    ))}
                </nav>

                {/* Search, Cart & User (Right) */}
                <div className="flex flex-none w-[40%] sm:w-1/2 lg:w-1/4 items-center justify-end gap-2 sm:gap-4">
                    <div className="hidden xl:flex relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-[180px] pl-9 bg-muted/40 hover:bg-muted/60 focus-visible:bg-muted border-transparent rounded-full transition-all duration-300 focus:w-[220px] h-9 text-sm"
                        />
                    </div>

                    {/* Mobile/Tablet Search Button */}
                    <Button variant="ghost" size="icon" className="xl:hidden rounded-full hover:bg-muted/50 h-9 w-9">
                        <Search className="h-4 w-4" />
                    </Button>

                    <div className="h-5 w-px bg-border hidden sm:block mx-1"></div>

                    <CartSheet />

                    {/* Auth */}
                    {loading ? (
                        <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
                    ) : isAuthenticated ? (
                        /* ── Logged-in state ── */
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-transparent hover:border-border transition-all bg-muted text-foreground font-bold text-xs overflow-hidden group p-0">
                                    <span>{initials}</span>
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
                                        <User className="w-4 h-4 text-muted-foreground" /> My Account
                                    </Link>
                                </DropdownMenuItem>
                                {isAdmin && (
                                    <DropdownMenuItem asChild>
                                        <Link href="/admin" className="cursor-pointer flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-muted-foreground" /> Admin Dashboard
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
                        <div className="flex items-center gap-2 ml-1">
                            <Button variant="ghost" size="sm" className="rounded-full font-medium hidden sm:flex hover:bg-muted/50 h-9" asChild>
                                <Link href="/login">Log In</Link>
                            </Button>
                            <Button size="sm" className="rounded-full font-medium shadow-none h-9 px-4" asChild>
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </motion.header>
    );
}
