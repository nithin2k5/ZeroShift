"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 200, damping: 20 }
    }
};

export function FeaturedProducts() {
    const products = [
        {
            id: 1,
            name: "Minimalist Chronograph",
            price: "₹12,499.00",
            rating: 4.8,
            reviews: 124,
            image: "/images/prod-1.jpg",
            badge: "Best Seller",
        },
        {
            id: 2,
            name: "Premium Leather Backpack",
            price: "₹8,999.00",
            rating: 4.9,
            reviews: 86,
            image: "/images/prod-2.jpg",
            badge: "New",
        },
        {
            id: 3,
            name: "Wireless Noise-Canceling Earbuds",
            price: "₹15,999.00",
            rating: 4.7,
            reviews: 210,
            image: "/images/prod-3.jpg",
        },
        {
            id: 4,
            name: "Matte Black Sunglasses",
            price: "₹6,499.00",
            rating: 4.6,
            reviews: 45,
            image: "/images/prod-4.jpg",
            badge: "Limited",
        },
    ];

    return (
        <section className="min-h-screen flex flex-col justify-center bg-muted/30 relative py-16">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-end justify-between mb-16"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-gradient">Featured Products</h2>
                        <p className="text-muted-foreground text-xl">Our most highly rated and sought-after items, handpicked just for you.</p>
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {products.map((product) => (
                        <motion.div variants={itemVariants} key={product.id}>
                            <Card className="overflow-hidden bg-transparent border-none shadow-none flex flex-col group h-full rounded-sm p-0 gap-0">
                                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                                    {product.badge && (
                                        <Badge className="absolute top-2 left-2 z-20 shadow-none font-medium px-2 py-0.5 rounded-sm bg-background/80 text-foreground backdrop-blur-none" variant="secondary">
                                            {product.badge}
                                        </Badge>
                                    )}
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute top-2 right-2 z-20 bg-transparent hover:bg-transparent text-foreground/70 hover:text-foreground transition-colors"
                                    >
                                        <Heart className="h-6 w-6 stroke-[1.5]" />
                                    </Button>
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        src={product.image}
                                        alt={product.name}
                                        className="object-cover w-full h-full cursor-pointer"
                                    />
                                </div>

                                <CardHeader className="p-3 px-1 pb-2 gap-1">
                                    <CardTitle className="font-normal text-base hover:text-primary transition-colors cursor-pointer line-clamp-1">
                                        {product.name}
                                    </CardTitle>
                                    <CardDescription className="text-base font-medium text-foreground pt-0">
                                        {product.price}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="flex-1 p-0" />
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
