"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, ShieldCheck, CreditCard } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ordersApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function PaymentPage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const { items: cartItems, clearCart } = useCart();

    // Shipping data fetched from sessionStorage
    const [shippingData, setShippingData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState("");

    const [cardDetails, setCardDetails] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: ""
    });

    useEffect(() => {
        const data = sessionStorage.getItem("zeroshift_checkout");
        if (!data || cartItems.length === 0) {
            router.push("/checkout");
        } else {
            setShippingData(JSON.parse(data));
            setPageLoading(false);
        }
    }, [router, cartItems]);

    if (pageLoading) {
        return <div className="min-h-screen flex items-center justify-center pt-24"><p className="text-muted-foreground animate-pulse font-medium">Loading secure connection...</p></div>;
    }

    const subtotal = cartItems.reduce((a, i) => a + i.price * i.quantity, 0);
    const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 199;
    const total = subtotal + shipping;

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) { router.push("/login"); return; }

        setError(""); setLoading(true);
        try {
            // Map Context cartItems to match API fields
            const mappedItems = cartItems.map(item => ({
                product_id: item.productId,
                name: item.name,
                image: item.image,
                price: item.price,
                qty: item.quantity,
                size: item.size,
                color: item.color
            }));

            // Make the final checkout call which triggers the Email backend
            await ordersApi.create({
                items: mappedItems,
                shippingAddress: {
                    name: shippingData.name,
                    street: shippingData.street,
                    city: shippingData.city,
                    state: shippingData.state,
                    zip: shippingData.zip,
                    country: shippingData.country
                },
                paymentMethod: shippingData.paymentMethod || "Card",
            });

            // Clean up states
            clearCart();
            sessionStorage.removeItem("zeroshift_checkout");

            // Redirect to orders page with success flag
            router.push("/account?success=1");
        } catch (e: unknown) {
            setError("Payment failed. Please check your details and try again.");
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                    <div className="mb-8 text-center max-w-2xl mx-auto">
                        <h1 className="text-4xl font-black tracking-tighter mb-4">Secure Payment</h1>
                        <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-green-600" />
                            256-bit SSL encrypted checkout
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-sm text-destructive text-sm font-medium max-w-2xl mx-auto">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">

                        {/* Payment Form */}
                        <div className="border border-border/60 rounded-sm p-8 bg-card shadow-sm">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                Payment Details
                            </h2>

                            <form onSubmit={handlePayment} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Card Number</label>
                                    <Input
                                        placeholder="0000 0000 0000 0000"
                                        value={cardDetails.number}
                                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                        required
                                        maxLength={16}
                                        className="h-12 rounded-none border-border/60 shadow-none font-mono"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Name on Card</label>
                                    <Input
                                        placeholder="JOHN DOE"
                                        value={cardDetails.name}
                                        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                        required
                                        className="h-12 rounded-none border-border/60 shadow-none uppercase"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Expiry (MM/YY)</label>
                                        <Input
                                            placeholder="MM/YY"
                                            value={cardDetails.expiry}
                                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                            required
                                            maxLength={5}
                                            className="h-12 rounded-none border-border/60 shadow-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">CVV</label>
                                        <Input
                                            placeholder="123"
                                            type="password"
                                            value={cardDetails.cvv}
                                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                            required
                                            maxLength={4}
                                            className="h-12 rounded-none border-border/60 shadow-none text-center tracking-widest"
                                        />
                                    </div>
                                </div>

                                <Button type="submit" disabled={loading} className="w-full h-14 mt-4 rounded-none text-base font-bold shadow-none hover:scale-[1.01] transition-transform">
                                    {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Authorizing...</> : `PAY ₹${total.toLocaleString("en-IN")}`}
                                </Button>

                                <div className="text-center mt-4">
                                    <Link href="/checkout" className="text-xs text-muted-foreground hover:text-foreground hover:underline transition-colors flex items-center justify-center gap-1">
                                        <ArrowLeft className="w-3 h-3" /> Return to shipping
                                    </Link>
                                </div>
                            </form>
                        </div>

                        {/* Order Confirmation Summary */}
                        <div className="space-y-6">
                            <div className="border border-border/60 rounded-sm p-6 bg-muted/30">
                                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                                <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                                    {cartItems.map((item, i) => (
                                        <div key={i} className="flex gap-3 justify-between">
                                            <div className="flex gap-3">
                                                <div className="w-12 h-16 bg-muted relative shrink-0">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="font-medium text-sm">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                                        </div>
                                    ))}
                                </div>
                                <Separator className="bg-border/40 mb-4" />
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
                                    <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
                                </div>
                                <Separator className="bg-border/40 my-4" />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span><span>₹{total.toLocaleString("en-IN")}</span>
                                </div>
                            </div>

                            <div className="border border-border/60 rounded-sm p-6 bg-muted/30">
                                <h3 className="font-bold text-sm mb-3">Shipping To</h3>
                                {shippingData && (
                                    <div className="text-sm text-muted-foreground leading-relaxed">
                                        <p className="font-medium text-foreground">{shippingData.name}</p>
                                        <p>{shippingData.street}</p>
                                        <p>{shippingData.city}, {shippingData.state} {shippingData.zip}</p>
                                        <p>{shippingData.country}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
