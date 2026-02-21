"use client";

import { useState } from "react";
import { ShoppingCart, X, Minus, Plus, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";

export function CartSheet() {
    const router = useRouter();
    const { items: cartItems, removeItem, updateQuantity, isCartOpen, setCartOpen } = useCart();

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 10000 || subtotal === 0 ? 0 : 250;
    const total = subtotal + shipping;

    // Formatting for INR
    const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);

    return (
        <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-transparent text-foreground/70 hover:text-foreground transition-colors group">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItems.length > 0 && (
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                    )}
                    <span className="sr-only">Toggle cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l border-border/40">

                <SheetHeader className="p-6 border-b border-border/40 text-left">
                    <SheetTitle className="text-2xl font-black tracking-tighter">Your Cart ({cartItems.length})</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                                <ShoppingCart className="h-10 w-10 text-muted-foreground opacity-50" />
                            </div>
                            <h3 className="text-xl font-bold">Your cart is empty</h3>
                            <p className="text-muted-foreground max-w-[250px]">Looks like you haven&apos;t added anything to your cart yet.</p>
                            <Button className="rounded-none mt-4 px-8 py-6 uppercase tracking-wider text-xs font-bold">START SHOPPING</Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-8">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="relative aspect-[3/4] w-24 bg-muted overflow-hidden shrink-0">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                    </div>
                                    <div className="flex flex-col flex-1 justify-between">
                                        <div>
                                            <div className="flex justify-between items-start gap-2 mb-1">
                                                <h4 className="font-semibold text-sm leading-tight line-clamp-2 pr-6">{item.name}</h4>
                                                <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors -mr-2 -mt-2 p-2">
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-2">{item.color} | Size: {item.size}</p>
                                        </div>

                                        <div className="flex items-end justify-between">
                                            <div className="flex items-center border border-border/60">
                                                <button onClick={() => updateQuantity(item.id, -1)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                {item.originalPrice && (
                                                    <p className="text-xs text-muted-foreground line-through mb-1">{formatPrice(item.originalPrice)}</p>
                                                )}
                                                <p className="font-semibold text-sm">{formatPrice(item.price)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="border-t border-border/40 p-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
                        {/* Promo Code placeholder */}
                        <div className="flex gap-2 mb-6">
                            <Input placeholder="Discount code" className="rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                            <Button variant="outline" className="rounded-none border-border/60 hover:bg-foreground hover:text-background">APPLY</Button>
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
                            <div className="flex justify-between text-lg font-bold pt-3 border-t border-border/40">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>

                        {shipping > 0 && (
                            <div className="w-full bg-muted border border-border/40 rounded-sm p-3 mb-6 text-center text-sm">
                                You are <span className="font-semibold">{formatPrice(10000 - subtotal)}</span> away from <strong>Free Shipping</strong>.
                            </div>
                        )}

                        <Button onClick={() => { setCartOpen(false); router.push("/checkout"); }} className="w-full h-14 rounded-none text-base font-bold shadow-none flex items-center justify-between px-6 hover:scale-[1.01] transition-transform">
                            <span>CHECKOUT</span>
                            <div className="flex items-center gap-2">
                                <span>{formatPrice(total)}</span>
                                <ArrowRight className="h-4 w-4" />
                            </div>
                        </Button>

                        <p className="text-center text-xs text-muted-foreground mt-4">Taxes and shipping calculated at checkout</p>
                    </div>
                )}

            </SheetContent>
        </Sheet>
    );
}
