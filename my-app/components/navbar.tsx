"use client";

import Link from "next/link";
import { Search, ShoppingBag, Menu, Home, Package, LayoutGrid, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export function Navbar() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="sticky top-4 z-50 w-[95%] max-w-7xl mx-auto rounded-full glass border shadow-lg transition-all duration-300"
        >
            <div className="px-5 sm:px-8 h-16 flex items-center justify-between">
                {/* Mobile Menu & Logo */}
                <div className="flex items-center gap-4 lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <nav className="flex flex-col gap-4 mt-8">
                                <Link href="/" className="text-lg font-medium flex items-center gap-2"><Home className="w-5 h-5" /> Home</Link>
                                <Link href="/products" className="text-lg font-medium flex items-center gap-2"><Package className="w-5 h-5" /> Products</Link>
                                <Link href="/categories" className="text-lg font-medium flex items-center gap-2"><LayoutGrid className="w-5 h-5" /> Categories</Link>
                                <Link href="/about" className="text-lg font-medium flex items-center gap-2"><Info className="w-5 h-5" /> About Us</Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                            <ShoppingBag className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-xl tracking-tight hidden sm:inline-block text-gradient">LuxeCart</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-2 mr-6 hover-lift">
                        <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                            <ShoppingBag className="h-6 w-6" />
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-gradient">LuxeCart</span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm font-medium">
                        <Link href="/" className="relative group transition-colors hover:text-primary flex items-center gap-1.5">
                            <Home className="w-4 h-4" /> Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </Link>
                        <Link href="/products" className="relative group transition-colors hover:text-primary text-muted-foreground flex items-center gap-1.5">
                            <Package className="w-4 h-4" /> Products
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </Link>
                        <Link href="/categories" className="relative group transition-colors hover:text-primary text-muted-foreground flex items-center gap-1.5">
                            <LayoutGrid className="w-4 h-4" /> Categories
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </Link>
                        <Link href="/about" className="relative group transition-colors hover:text-primary text-muted-foreground flex items-center gap-1.5">
                            <Info className="w-4 h-4" /> About Us
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </Link>
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-transparent transition-all hover:ring-primary/20">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">John Doe</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        john.doe@example.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Orders</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </motion.header>
    );
}
