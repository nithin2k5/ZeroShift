"use client";

import Link from "next/link";
import { Lock, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const checkoutItems = [
    {
        id: "1",
        name: "Classic Heavyweight Override Jacket",
        price: 8499,
        image: "/images/prod-1.jpg",
        color: "Forest Green",
        size: "M",
        quantity: 1,
    },
    {
        id: "2",
        name: "Woven Leather Belt",
        price: 2599,
        image: "/images/new-4.jpg",
        color: "Black",
        size: "One Size",
        quantity: 2,
    }
];

export default function CheckoutPage() {
    const subtotal = checkoutItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 0; // Free shipping threshold met
    const total = subtotal + shipping;

    const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">

                    {/* Header */}
                    <div className="mb-10 block lg:hidden">
                        <h1 className="text-4xl font-black tracking-tighter">Checkout</h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                        {/* Left: Form Sections */}
                        <div className="flex-1 order-2 lg:order-1">

                            {/* Breadcrumbs */}
                            <nav className="flex items-center text-sm font-medium text-muted-foreground mb-12">
                                <Link href="/cart" className="hover:text-foreground transition-colors">Cart</Link>
                                <ChevronRight className="w-4 h-4 mx-2" />
                                <span className="text-foreground">Information</span>
                                <ChevronRight className="w-4 h-4 mx-2" />
                                <span>Shipping</span>
                                <ChevronRight className="w-4 h-4 mx-2" />
                                <span>Payment</span>
                            </nav>

                            <form onSubmit={(e) => e.preventDefault()}>
                                {/* Contact Info */}
                                <section className="mb-12">
                                    <div className="flex justify-between items-end mb-6">
                                        <h2 className="text-2xl font-bold tracking-tight">Contact Information</h2>
                                        <span className="text-sm text-muted-foreground">Already have an account? <Link href="/login" className="text-foreground underline">Log in</Link></span>
                                    </div>
                                    <div className="space-y-4">
                                        <Input type="email" placeholder="Email Address" className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                        <div className="flex items-center space-x-2 mt-2">
                                            <input type="checkbox" id="newsletter" className="rounded-sm border-border/60 accent-primary w-4 h-4" />
                                            <label htmlFor="newsletter" className="text-sm text-muted-foreground">Email me with news and offers</label>
                                        </div>
                                    </div>
                                </section>

                                {/* Delivery Info */}
                                <section className="mb-12">
                                    <h2 className="text-2xl font-bold tracking-tight mb-6">Delivery Address</h2>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <Input placeholder="First Name" className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                        <Input placeholder="Last Name" className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                    </div>
                                    <Input placeholder="Company (optional)" className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground mb-4" />
                                    <Input placeholder="Address" className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground mb-4" />
                                    <Input placeholder="Apartment, suite, etc. (optional)" className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground mb-4" />
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <Input placeholder="City" className="col-span-1 h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                        <Input placeholder="State" className="col-span-1 h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                        <Input placeholder="PIN Code" className="col-span-1 h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                    </div>
                                    <Input placeholder="Phone" type="tel" className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                </section>

                                {/* Payment placeholder block */}
                                <section className="mb-12">
                                    <h2 className="text-2xl font-bold tracking-tight mb-6">Payment</h2>
                                    <div className="bg-muted p-6 rounded-sm border border-border/40 text-center">
                                        <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                                        <h3 className="font-semibold mb-1">Secure Checkout</h3>
                                        <p className="text-sm text-muted-foreground mb-4">This is a demo. Payment gateway integration will happen here.</p>
                                        <Button type="button" className="w-full h-14 rounded-none text-base font-bold shadow-none hover:scale-[1.01] transition-transform bg-primary text-primary-foreground">
                                            PAY {formatPrice(total)}
                                        </Button>
                                    </div>
                                </section>

                                <div className="flex justify-between items-center py-4 border-t border-border/40">
                                    <Link href="/" className="text-sm font-medium flex items-center text-muted-foreground hover:text-foreground transition-colors">
                                        <ArrowLeft className="w-4 h-4 mr-2" /> Return to store
                                    </Link>
                                    <p className="text-xs text-muted-foreground">Termsof Service · Privacy Policy</p>
                                </div>
                            </form>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="lg:w-[450px] shrink-0 order-1 lg:order-2">
                            <div className="bg-muted/30 p-8 rounded-sm lg:sticky lg:top-28 border border-border/20">
                                <h2 className="text-2xl font-bold tracking-tight mb-8 hidden lg:block">Order Summary</h2>

                                <div className="flex flex-col gap-6 mb-8">
                                    {checkoutItems.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="relative w-16 h-20 bg-muted overflow-hidden shrink-0 border border-border/40">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                                <div className="absolute -top-2 -right-2 bg-foreground text-background text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full z-10">
                                                    {item.quantity}
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center flex-1">
                                                <h4 className="font-semibold text-sm leading-tight mb-1 pr-4">{item.name}</h4>
                                                <p className="text-xs text-muted-foreground">{item.color} / {item.size}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <p className="font-semibold text-sm">{formatPrice(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="mb-6 bg-border/40" />

                                <div className="flex gap-2 mb-6">
                                    <Input placeholder="Discount code" className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground bg-white dark:bg-black" />
                                    <Button variant="outline" className="h-12 rounded-none border-border/60 hover:bg-foreground hover:text-background px-6 font-bold">APPLY</Button>
                                </div>

                                <Separator className="mb-6 bg-border/40" />

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-baseline pt-6 border-t border-border/60">
                                    <span className="text-lg font-bold">Total</span>
                                    <div className="text-right">
                                        <span className="text-xs text-muted-foreground mr-2 font-medium">INR</span>
                                        <span className="text-3xl font-black">{formatPrice(total)}</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
