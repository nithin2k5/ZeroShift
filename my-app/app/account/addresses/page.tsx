"use client";

import { motion } from "framer-motion";
import { Plus, Home, Edit2, Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const addresses = [
    {
        id: "1",
        type: "Home",
        isDefault: true,
        name: "John Doe",
        addressLine1: "123 Luxe Avenue",
        addressLine2: "Apt 4B",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
    },
    {
        id: "2",
        type: "Work",
        isDefault: false,
        name: "John Doe",
        addressLine1: "456 Corporate Blvd",
        addressLine2: "Suite 200",
        city: "San Francisco",
        state: "CA",
        zip: "94107",
        country: "United States",
    }
];

export default function AddressesPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Saved Addresses</h2>
                <Button className="rounded-none h-10 px-4 shadow-none gap-2 font-bold hover:scale-[1.02] transition-transform">
                    <Plus className="w-4 h-4" /> ADD NEW
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((addr) => (
                    <div key={addr.id} className="border border-border/60 rounded-sm p-6 relative group bg-background hover:border-foreground/30 transition-colors flex flex-col h-full">

                        {addr.isDefault && (
                            <span className="absolute top-0 right-0 bg-foreground text-background text-xs font-bold px-3 py-1 bg-opacity-90">
                                DEFAULT
                            </span>
                        )}

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                {addr.type === "Home" ? <Home className="w-5 h-5 text-muted-foreground" /> : <MapPin className="w-5 h-5 text-muted-foreground" />}
                            </div>
                            <h3 className="font-bold text-lg">{addr.type}</h3>
                        </div>

                        <div className="text-muted-foreground leading-relaxed flex-1 mb-8">
                            <p className="font-medium text-foreground mb-1">{addr.name}</p>
                            <p>{addr.addressLine1}</p>
                            {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                            <p>{addr.city}, {addr.state} {addr.zip}</p>
                            <p>{addr.country}</p>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-border/40">
                            <Button variant="ghost" className="px-0 h-auto text-muted-foreground hover:bg-transparent hover:text-foreground font-medium flex-1 justify-start gap-2">
                                <Edit2 className="w-4 h-4" /> Edit
                            </Button>
                            {!addr.isDefault && (
                                <Button variant="ghost" className="px-0 h-auto text-muted-foreground hover:bg-transparent hover:text-destructive font-medium gap-2">
                                    <Trash2 className="w-4 h-4" /> Discard
                                </Button>
                            )}
                        </div>
                    </div>
                ))}

                {/* Add New Placeholder Card */}
                <div className="border border-border/40 border-dashed rounded-sm p-6 flex flex-col items-center justify-center min-h-[250px] cursor-pointer hover:bg-muted/50 transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
                        <Plus className="w-6 h-6 text-muted-foreground group-hover:text-background transition-colors" />
                    </div>
                    <p className="font-bold">Add New Address</p>
                    <p className="text-sm text-muted-foreground text-center mt-2 max-w-[200px]">Save additional addresses for a faster checkout.</p>
                </div>

            </div>
        </motion.div>
    );
}
