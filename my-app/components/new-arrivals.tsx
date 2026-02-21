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

export function NewArrivals() {
    const products = [
        {
            id: 1,
            name: "Canvas Field Jacket",
            price: "₹7,499.00",
            rating: 4.9,
            reviews: 56,
            image: "/images/new-1.jpg",
            badge: "Just Added",
        },
        {
            id: 2,
            name: "Linen Blend Overshirt",
            price: "₹4,999.00",
            rating: 4.7,
            reviews: 32,
            image: "/images/new-2.jpg",
            badge: "Trending",
        },
        {
            id: 3,
            name: "Classic White Sneakers",
            price: "₹6,999.00",
            rating: 4.8,
            reviews: 145,
            image: "/images/new-3.jpg",
        },
        {
            id: 4,
            name: "Woven Leather Belt",
            price: "₹2,599.00",
            rating: 4.5,
            reviews: 24,
            image: "/images/new-4.jpg",
            badge: "Low Stock",
        },
    ];

    return (
        <section className="min-h-screen flex flex-col justify-center bg-background relative py-16">
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
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-gradient">New Arrivals</h2>
                        <p className="text-muted-foreground text-xl">Fresh drops from our latest collection. Stay ahead of the curve.</p>
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
                                        <Badge className="absolute top-2 left-2 z-20 shadow-none font-medium px-2 py-0.5 rounded-sm bg-background/80 text-foreground backdrop-blur-none" variant={product.badge === 'Low Stock' ? 'destructive' : 'secondary'}>
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
