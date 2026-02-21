"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Loader2, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ordersApi, type Order } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function OrdersPage() {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (authLoading) return;
        if (!isAuthenticated) { setLoading(false); return; }
        ordersApi.myOrders()
            .then((res) => setOrders(res.orders))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [isAuthenticated, authLoading]);

    if (loading || authLoading) return (
        <div className="flex items-center justify-center py-32">
            <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
        </div>
    );

    if (!isAuthenticated) return (
        <div className="text-center py-32 max-w-md mx-auto">
            <Package className="w-16 h-16 mx-auto mb-6 text-muted-foreground/30" />
            <h3 className="text-2xl font-black mb-3 tracking-tight">Sign in to view orders</h3>
            <p className="text-muted-foreground mb-8">Access your complete purchase history and track active shipments.</p>
            <Button asChild className="rounded-none h-14 w-full text-base font-bold shadow-none"><Link href="/login">LOG IN TO ACCOUNT</Link></Button>
        </div>
    );

    if (error) return (
        <div className="p-8 border border-destructive/20 bg-destructive/5 text-destructive font-medium flex flex-col items-center text-center">
            <p className="text-lg font-bold mb-2">Unable to load orders</p>
            <p className="text-sm opacity-80">{error}</p>
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-black tracking-tighter uppercase">Order History</h2>
                <Badge variant="outline" className="rounded-full px-4 py-1 text-sm font-semibold tracking-wide bg-background border-border/60">
                    {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                </Badge>
            </div>

            {orders.length === 0 ? (
                <div className="bg-background border border-border/40 p-16 md:p-24 text-center flex flex-col items-center justify-center shadow-sm">
                    <div className="w-24 h-24 bg-muted flex items-center justify-center rounded-full mb-8">
                        <Package className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-3xl font-black mb-4 tracking-tight">Your wardrobe is empty.</h3>
                    <p className="text-muted-foreground text-lg mb-10 max-w-md">You haven&apos;t placed any orders yet. Discover our latest premium collections.</p>
                    <Button asChild className="rounded-none h-14 px-10 text-base font-bold shadow-none group">
                        <Link href="/categories">
                            MENSWEAR COLLECTION <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="space-y-12">
                    {orders.map((order, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            key={order.id}
                            className="bg-background border border-border/40 hover:border-foreground/30 transition-colors shadow-sm group"
                        >
                            {/* Order Header */}
                            <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:items-center justify-between border-b border-border/40 bg-zinc-50/50 dark:bg-zinc-900/20">
                                <div className="grid grid-cols-2 lg:flex lg:gap-16 gap-y-6 text-sm">
                                    <div>
                                        <p className="text-muted-foreground mb-2 text-xs uppercase tracking-[0.15em] font-bold">Placed On</p>
                                        <p className="text-lg font-medium">{new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground mb-2 text-xs uppercase tracking-[0.15em] font-bold">Total Amount</p>
                                        <p className="text-lg font-medium tracking-tight">₹{Number(order.total_amount).toLocaleString("en-IN")}</p>
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <p className="text-muted-foreground mb-2 text-xs uppercase tracking-[0.15em] font-bold">Order ID</p>
                                        <p className="font-mono text-base tracking-wider bg-muted/50 w-fit px-2 py-1">#{order.id.slice(0, 8).toUpperCase()}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:items-end gap-3 self-start lg:self-center">
                                    <Badge variant={order.status === "Delivered" ? "default" : "outline"} className={`rounded-none px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-none ${order.status !== 'Delivered' ? 'border-foreground text-foreground' : ''}`}>
                                        {order.status}
                                    </Badge>
                                </div>
                            </div>

                            {/* Order Body */}
                            <div className="p-6 md:p-8">
                                <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
                                    {(order.items || []).map((item, idx) => (
                                        <div key={idx} className="relative w-32 h-40 md:w-40 md:h-52 bg-muted shrink-0 group-hover:shadow-md transition-all overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={item.image || "/images/prod-1.jpg"} alt={item.name} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">Qty: {item.qty}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
                                    <Button variant="outline" className="rounded-none border-border/60 h-12 px-8 shadow-none font-bold tracking-wide hover:bg-muted transition-colors">
                                        VIEW INVOICE
                                    </Button>
                                    <Button className="rounded-none h-12 px-8 shadow-none font-bold tracking-wide flex items-center gap-2 group/btn">
                                        TRACK ORDER <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
