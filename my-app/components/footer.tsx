import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
    return (
        <footer className="bg-foreground text-background pt-24 pb-12">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                    <div className="lg:col-span-4 lg:pr-12">
                        <Link href="/" className="inline-block mb-8">
                            <span className="font-black text-4xl tracking-tighter text-background">LuxeCart</span>
                        </Link>
                        <p className="text-background/70 max-w-sm mb-8 leading-relaxed text-lg font-light">
                            Premium fashion and accessories for the modern aesthetic. Uncompromising quality meets timeless design.
                        </p>
                        <div className="flex items-center gap-5">
                            <Link href="#" className="text-background/60 hover:text-background transition-colors duration-300">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-background/60 hover:text-background transition-colors duration-300">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-background/60 hover:text-background transition-colors duration-300">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-background/60 hover:text-background transition-colors duration-300">
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">YouTube</span>
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="font-semibold text-lg mb-6 tracking-wide uppercase">Shop</h4>
                        <ul className="space-y-4 text-base font-medium text-background/70">
                            <li><Link href="#" className="hover:text-background transition-colors">Men&apos;s Collection</Link></li>
                            <li><Link href="#" className="hover:text-background transition-colors">Women&apos;s Collection</Link></li>
                            <li><Link href="#" className="hover:text-background transition-colors">Accessories</Link></li>
                            <li><Link href="#" className="hover:text-background transition-colors">New Arrivals</Link></li>
                            <li><Link href="#" className="hover:text-background transition-colors">Clearance</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="font-semibold text-lg mb-6 tracking-wide uppercase">Support</h4>
                        <ul className="space-y-4 text-base font-medium text-background/70">
                            <li><Link href="#" className="hover:text-background transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-background transition-colors">Track Order</Link></li>
                            <li><Link href="#" className="hover:text-background transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="#" className="hover:text-background transition-colors">Shipping Info</Link></li>
                            <li><Link href="#" className="hover:text-background transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-4">
                        <h4 className="font-semibold text-lg mb-6 tracking-wide uppercase">Newsletter</h4>
                        <p className="text-base text-background/70 font-light leading-relaxed mb-6">
                            Subscribe to receive exclusive updates, access to limited drops, and insider-only deals.
                        </p>
                        <form className="flex border-b border-background/30 pb-2 transition-colors focus-within:border-background">
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className="bg-transparent border-none px-0 text-background placeholder:text-background/40 focus-visible:ring-0 rounded-none h-12 text-lg shadow-none"
                            />
                            <Button type="submit" variant="ghost" size="icon" className="hover:bg-transparent text-background/60 hover:text-background transition-colors">
                                <Send className="h-5 w-5" />
                            </Button>
                        </form>
                    </div>

                </div>

                <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-medium text-background/50">
                    <p>© 2026 LuxeCart. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-background transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-background transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
