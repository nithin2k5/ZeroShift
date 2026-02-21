"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ordersApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

// Dummy cart for demo — replace with real cart state/context
const cartItems = [
    { product_id: null, name: "Canvas Field Jacket", image: "/images/new-1.jpg", price: 7499, qty: 1, size: "M", color: "Olive" },
    { product_id: null, name: "Woven Leather Belt", image: "/images/new-4.jpg", price: 2599, qty: 1, size: "", color: "Black" },
];

export default function CheckoutPage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        name: user?.name || "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "India",
        paymentMethod: "Card",
    });

    const subtotal = cartItems.reduce((a, i) => a + i.price * i.qty, 0);
    const shipping = subtotal >= 5000 ? 0 : 199;
    const total = subtotal + shipping;

    const set = (field: string, val: string) => setForm(f => ({ ...f, [field]: val }));

    const handleOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) { router.push("/login"); return; }
        setError(""); setLoading(true);
        try {
            await ordersApi.create({
                items: cartItems,
                shippingAddress: { name: form.name, street: form.street, city: form.city, state: form.state, zip: form.zip, country: form.country },
                paymentMethod: form.paymentMethod,
            });
            router.push("/account?success=1");
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Order failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-4 md:px-8 max-w-5xl">
                    <div className="mb-8">
                        <Link href="/categories" className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2 mb-4 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Continue Shopping
                        </Link>
                        <h1 className="text-4xl font-black tracking-tighter">Checkout</h1>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-sm text-destructive text-sm font-medium">{error}</div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                        {/* Form */}
                        <form onSubmit={handleOrder} className="lg:col-span-3 space-y-8">
                            <div>
                                <h2 className="text-xl font-bold mb-5">Shipping Address</h2>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Full Name</label>
                                        <Input value={form.name} onChange={(e) => set("name", e.target.value)} required
                                            className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Street Address</label>
                                        <Input value={form.street} onChange={(e) => set("street", e.target.value)} required
                                            className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">City</label>
                                            <Input value={form.city} onChange={(e) => set("city", e.target.value)} required
                                                className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">State</label>
                                            <Input value={form.state} onChange={(e) => set("state", e.target.value)} required
                                                className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">PIN Code</label>
                                            <Input value={form.zip} onChange={(e) => set("zip", e.target.value)} required
                                                className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Country</label>
                                            <Input value={form.country} onChange={(e) => set("country", e.target.value)} required
                                                className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-5">Payment</h2>
                                <div className="space-y-3">
                                    {["Card", "UPI", "Net Banking", "COD"].map((method) => (
                                        <label key={method} className={`flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition-colors ${form.paymentMethod === method ? "border-foreground bg-muted" : "border-border/60 hover:bg-muted/40"}`}>
                                            <input type="radio" name="payment" value={method} checked={form.paymentMethod === method} onChange={() => set("paymentMethod", method)} className="accent-foreground" />
                                            <span className="font-medium">{method}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <Button type="submit" disabled={loading} className="w-full h-14 rounded-none text-base font-bold shadow-none hover:scale-[1.01] transition-transform">
                                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Placing Order...</> : `PLACE ORDER — ₹${total.toLocaleString("en-IN")}`}
                            </Button>
                        </form>

                        {/* Order Summary */}
                        <div className="lg:col-span-2">
                            <div className="border border-border/60 rounded-sm p-6 sticky top-24">
                                <h2 className="font-bold text-lg mb-5 flex items-center gap-2"><ShoppingBag className="w-5 h-5" /> Order Summary</h2>
                                <div className="space-y-4 mb-6">
                                    {cartItems.map((item, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex gap-3 items-start">
                                            <div className="w-16 h-20 bg-muted relative shrink-0">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium line-clamp-2 text-sm">{item.name}</p>
                                                {item.size && <p className="text-xs text-muted-foreground mt-1">Size: {item.size}</p>}
                                                <p className="text-sm font-bold mt-2">₹{(item.price * item.qty).toLocaleString("en-IN")}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <Separator className="bg-border/40 mb-4" />
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
                                    <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
                                </div>
                                <Separator className="bg-border/40 my-4" />
                                <div className="flex justify-between font-bold text-base">
                                    <span>Total</span><span>₹{total.toLocaleString("en-IN")}</span>
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
