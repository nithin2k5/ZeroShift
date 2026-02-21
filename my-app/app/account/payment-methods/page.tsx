"use client";

import { motion } from "framer-motion";
import { Plus, CreditCard, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const payments = [
    {
        id: "1",
        brand: "Visa",
        last4: "4242",
        expiry: "04/28",
        isDefault: true,
    },
    {
        id: "2",
        brand: "Mastercard",
        last4: "8888",
        expiry: "11/27",
        isDefault: false,
    }
];

export default function PaymentMethodsPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Payment Methods</h2>
                <Button className="rounded-none h-10 px-4 shadow-none gap-2 font-bold hover:scale-[1.02] transition-transform">
                    <Plus className="w-4 h-4" /> ADD NEW
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {payments.map((card) => (
                    <div key={card.id} className="border border-border/60 rounded-sm p-6 relative group bg-background hover:border-foreground/30 transition-colors flex flex-col items-start h-full">

                        {card.isDefault && (
                            <span className="absolute top-0 right-0 bg-foreground text-background text-xs font-bold px-3 py-1 bg-opacity-90">
                                DEFAULT
                            </span>
                        )}

                        <div className="w-12 h-8 rounded bg-muted/50 border border-border/60 flex items-center justify-center mb-6">
                            <CreditCard className="w-6 h-6 text-foreground" />
                        </div>

                        <div className="flex-1 mb-8">
                            <p className="font-bold text-lg mb-1 tracking-widest">•••• •••• •••• {card.last4}</p>
                            <p className="text-muted-foreground text-sm uppercase tracking-wider font-medium">{card.brand} • Expires {card.expiry}</p>
                        </div>

                        <div className="flex gap-4 w-full pt-4 border-t border-border/40">
                            {!card.isDefault && (
                                <Button variant="ghost" className="px-0 h-auto text-muted-foreground hover:bg-transparent hover:text-foreground font-medium flex-1 justify-start">
                                    Set as Default
                                </Button>
                            )}
                            <Button variant="ghost" className={`px-0 h-auto text-muted-foreground hover:bg-transparent hover:text-destructive font-medium ${card.isDefault ? 'w-full justify-start' : 'justify-end'} gap-2`}>
                                <Trash2 className="w-4 h-4" /> Remove
                            </Button>
                        </div>
                    </div>
                ))}

                {/* Add New Placeholder Card */}
                <div className="border border-border/40 border-dashed rounded-sm p-6 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:bg-muted/50 transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
                        <Plus className="w-6 h-6 text-muted-foreground group-hover:text-background transition-colors" />
                    </div>
                    <p className="font-bold">Add Payment Method</p>
                    <p className="text-sm text-muted-foreground text-center mt-2 max-w-[200px]">Securely save your card for a faster checkout experience.</p>
                </div>

            </div>
        </motion.div>
    );
}
