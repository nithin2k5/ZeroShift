"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Loader2, ExternalLink } from "lucide-react";
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
        <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
    );

    if (!isAuthenticated) return (
        <div className="text-center py-24 max-w-sm mx-auto">
            <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
            <h3 className="text-xl font-bold mb-2">Sign in to view orders</h3>
            <p className="text-muted-foreground text-sm mb-6">Access your complete purchase history and track active shipments.</p>
            <Button asChild className="w-full"><Link href="/login">Log In to Account</Link></Button>
        </div>
    );

    if (error) return (
        <div className="p-6 border border-destructive/20 bg-destructive/5 text-destructive rounded-md font-medium text-center">
            <p className="text-base font-semibold mb-1">Unable to load orders</p>
            <p className="text-sm opacity-80">{error}</p>
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Order History</h2>
                <Badge variant="secondary" className="rounded-full px-3 py-0.5 text-xs font-semibold bg-muted text-muted-foreground">
                    {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                </Badge>
            </div>

            {orders.length === 0 ? (
                <div className="bg-background border border-border/40 rounded-lg p-12 text-center flex flex-col items-center justify-center shadow-sm">
                    <div className="w-16 h-16 bg-muted flex items-center justify-center rounded-full mb-6 relative overflow-hidden">
                        <Package className="w-8 h-8 text-muted-foreground relative z-10" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No orders found</h3>
                    <p className="text-muted-foreground text-sm mb-8 max-w-xs">You haven&apos;t placed any orders yet. Start exploring our collections.</p>
                    <Button asChild className="px-8 font-medium">
                        <Link href="/categories">Shop Now</Link>
                    </Button>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            key={order.id}
                            className="bg-background border border-border/40 rounded-lg shadow-sm overflow-hidden"
                        >
                            {/* Order Header */}
                            <div className="p-5 md:p-6 flex flex-col lg:flex-row gap-4 lg:items-center justify-between border-b border-border/40 bg-zinc-50/50 dark:bg-zinc-900/10">
                                <div className="grid grid-cols-2 lg:flex lg:gap-12 gap-y-4 text-sm w-full lg:w-auto">
                                    <div>
                                        <p className="text-muted-foreground mb-1 text-xs font-semibold uppercase tracking-wider">Date Placed</p>
                                        <p className="font-medium text-base">{new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground mb-1 text-xs font-semibold uppercase tracking-wider">Total Amount</p>
                                        <p className="font-medium text-base">₹{Number(order.total_amount).toLocaleString("en-IN")}</p>
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <p className="text-muted-foreground mb-1 text-xs font-semibold uppercase tracking-wider">Order Number</p>
                                        <p className="font-mono text-sm tracking-wide bg-background border border-border/60 rounded px-2 py-0.5 w-fit">#{order.id.slice(0, 8).toUpperCase()}</p>
                                    </div>
                                </div>
                                <div className="flex sm:justify-end mt-4 lg:mt-0">
                                    <Badge variant={order.status === "Delivered" ? "default" : "secondary"} className={`rounded-sm px-3 py-1 text-xs font-semibold shadow-none ${order.status !== 'Delivered' ? 'border-primary/20 text-foreground bg-primary/5' : ''}`}>
                                        {order.status}
                                    </Badge>
                                </div>
                            </div>

                            {/* Order Body */}
                            <div className="p-5 md:p-6">
                                <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
                                    {(order.items || []).map((item, idx) => (
                                        <div key={idx} className="relative w-24 h-32 md:w-28 md:h-36 bg-muted shrink-0 border border-border/40 overflow-hidden rounded-md group">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={item.image || "/images/prod-1.jpg"} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute top-1.5 left-1.5 bg-background/90 backdrop-blur border border-border/40 text-foreground px-1.5 py-0.5 rounded text-[10px] font-bold shadow-sm">
                                                Qty: {item.qty}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end items-center">
                                    <Button variant="outline" size="sm" className="w-full sm:w-auto h-10 shadow-none font-medium text-muted-foreground hover:text-foreground">
                                        View Invoice
                                    </Button>
                                    <Button size="sm" className="w-full sm:w-auto h-10 shadow-none font-medium flex items-center justify-center gap-2 group/btn">
                                        Track Package <ExternalLink className="w-3.5 h-3.5" />
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
