"use client";

import { motion } from "framer-motion";
import { User, Package, Settings, LogOut, MapPin, CreditCard } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Dummy order data
const orderHistory = [
    {
        id: "#ORD-90812X",
        date: "Oct 12, 2026",
        status: "Delivered",
        total: "₹11,098.00",
        items: [
            { name: "Classic Heavyweight Override Jacket", qty: 1, image: "/images/prod-1.jpg" },
            { name: "Woven Leather Belt", qty: 1, image: "/images/new-4.jpg" }
        ]
    },
    {
        id: "#ORD-83491Z",
        date: "Sep 04, 2026",
        status: "Processing",
        total: "₹4,999.00",
        items: [
            { name: "Linen Blend Overshirt", qty: 1, image: "/images/new-2.jpg" }
        ]
    }
];

export default function AccountPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-4 md:px-8 max-w-6xl">

                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">My Account</h1>
                        <p className="text-muted-foreground">Welcome back, John Doe. Manage your orders and account details here.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12">

                        {/* Sidebar Navigation */}
                        <aside className="w-full md:w-64 shrink-0">
                            <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
                                <Button variant="secondary" className="justify-start h-12 px-4 shadow-none font-semibold rounded-sm bg-muted whitespace-nowrap">
                                    <Package className="w-5 h-5 mr-3" /> Orders
                                </Button>
                                <Button variant="ghost" className="justify-start h-12 px-4 hover:bg-muted font-medium rounded-sm whitespace-nowrap text-muted-foreground hover:text-foreground">
                                    <User className="w-5 h-5 mr-3" /> Profile
                                </Button>
                                <Button variant="ghost" className="justify-start h-12 px-4 hover:bg-muted font-medium rounded-sm whitespace-nowrap text-muted-foreground hover:text-foreground">
                                    <MapPin className="w-5 h-5 mr-3" /> Addresses
                                </Button>
                                <Button variant="ghost" className="justify-start h-12 px-4 hover:bg-muted font-medium rounded-sm whitespace-nowrap text-muted-foreground hover:text-foreground">
                                    <CreditCard className="w-5 h-5 mr-3" /> Payment Methods
                                </Button>
                                <Button variant="ghost" className="justify-start h-12 px-4 hover:bg-muted font-medium rounded-sm whitespace-nowrap text-muted-foreground hover:text-foreground">
                                    <Settings className="w-5 h-5 mr-3" /> Settings
                                </Button>
                                <Separator className="hidden md:block my-2 bg-border/40" />
                                <Button variant="ghost" className="justify-start h-12 px-4 text-destructive hover:bg-destructive/10 hover:text-destructive font-medium rounded-sm whitespace-nowrap">
                                    <LogOut className="w-5 h-5 mr-3" /> Log Out
                                </Button>
                            </nav>
                        </aside>

                        {/* Main Content Area */}
                        <div className="flex-1 min-w-0">

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h2 className="text-2xl font-bold tracking-tight mb-8">Order History</h2>

                                {orderHistory.length === 0 ? (
                                    <div className="bg-muted border border-border/40 rounded-sm p-12 text-center">
                                        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                                        <h3 className="text-lg font-bold mb-2">No orders yet</h3>
                                        <p className="text-muted-foreground mb-6">Looks like you haven&apos;t placed an order yet.</p>
                                        <Button className="rounded-none px-6 shadow-none">Start Shopping</Button>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {orderHistory.map((order) => (
                                            <div key={order.id} className="border border-border/60 rounded-sm overflow-hidden bg-background group hover:border-foreground/30 transition-colors">

                                                {/* Order Header */}
                                                <div className="bg-muted p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-b border-border/40">
                                                    <div className="grid grid-cols-2 sm:flex sm:gap-12 gap-y-4 text-sm">
                                                        <div>
                                                            <p className="text-muted-foreground mb-1 uppercase tracking-wider text-[10px] font-bold">Order Placed</p>
                                                            <p className="font-medium">{order.date}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted-foreground mb-1 uppercase tracking-wider text-[10px] font-bold">Total</p>
                                                            <p className="font-medium">{order.total}</p>
                                                        </div>
                                                        <div className="col-span-2 sm:col-span-1">
                                                            <p className="text-muted-foreground mb-1 uppercase tracking-wider text-[10px] font-bold">Order Number</p>
                                                            <p className="font-mono text-xs mt-1">{order.id}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col sm:items-end gap-2">
                                                        <Badge variant={order.status === "Delivered" ? "default" : "secondary"} className="shadow-none rounded-none px-3 font-semibold w-fit">
                                                            {order.status}
                                                        </Badge>
                                                        <Button variant="link" className="p-0 h-auto text-xs text-muted-foreground hover:text-foreground">View Invoice &rarr;</Button>
                                                    </div>
                                                </div>

                                                {/* Order Body */}
                                                <div className="p-4 sm:p-6">
                                                    <div className="flex overflow-x-auto gap-4 scrollbar-hide">
                                                        {order.items.map((item, idx) => (
                                                            <div key={idx} className="relative w-24 h-32 bg-muted shrink-0 group-hover:scale-[1.02] transition-transform">
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="mt-6 flex gap-4">
                                                        <Button variant="outline" className="flex-1 rounded-none border-border/60 h-10 shadow-none">Track Package</Button>
                                                        <Button className="flex-1 rounded-none h-10 shadow-none">Buy Again</Button>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>

                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
