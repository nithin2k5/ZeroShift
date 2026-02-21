"use client";

import { motion, Variants } from "framer-motion";
import { Heart, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Dummy Product Data integrating both our new and featured products
const products = [
    { id: 1, name: "Canvas Field Jacket", price: "₹7,499.00", image: "/images/new-1.jpg", badge: "Just Added" },
    { id: 2, name: "Premium Denim Jacket", price: "₹8,999.00", image: "/images/prod-1.jpg", badge: "New" },
    { id: 3, name: "Classic White Sneakers", price: "₹6,999.00", image: "/images/new-3.jpg" },
    { id: 4, name: "Woven Leather Belt", price: "₹2,599.00", image: "/images/new-4.jpg", badge: "Low Stock" },
    { id: 5, name: "Linen Blend Overshirt", price: "₹4,999.00", image: "/images/new-2.jpg", badge: "Trending" },
    { id: 6, name: "Tailored Chino Trousers", price: "₹3,999.00", image: "/images/prod-2.jpg", badge: "Best Seller" },
    { id: 7, name: "Merino Wool Crewneck", price: "₹5,499.00", image: "/images/prod-3.jpg", badge: "Sale" },
    { id: 8, name: "Essential Heavyweight Tee", price: "₹2,299.00", image: "/images/prod-4.jpg" },
    // Replicating for more items to show a full grid
    { id: 9, name: "Canvas Field Jacket (Olive)", price: "₹7,499.00", image: "/images/new-1.jpg" },
    { id: 10, name: "Premium Denim Jacket (Washed)", price: "₹8,999.00", image: "/images/prod-1.jpg" },
    { id: 11, name: "Classic Navy Sneakers", price: "₹6,999.00", image: "/images/new-3.jpg" },
    { id: 12, name: "Tactical Leather Belt", price: "₹2,599.00", image: "/images/new-4.jpg" },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
};

export default function AllProductsPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <p className="text-sm text-muted-foreground mb-4 uppercase tracking-widest font-medium">Shop &nbsp;/&nbsp; All Items</p>
                            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground">All Products</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="outline" className="rounded-full shadow-none border-border/50">
                                <SlidersHorizontal className="w-4 h-4 mr-2" />
                                Filters
                            </Button>
                            <Button variant="outline" className="rounded-full shadow-none border-border/50">
                                Sort By
                                <ChevronDown className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>

                    {/* Filter Tags */}
                    <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
                        <Badge variant="default" className="px-4 py-1.5 rounded-full whitespace-nowrap">All</Badge>
                        <Badge variant="outline" className="px-4 py-1.5 rounded-full whitespace-nowrap hover:bg-muted cursor-pointer border-border/50">New Arrivals</Badge>
                        <Badge variant="outline" className="px-4 py-1.5 rounded-full whitespace-nowrap hover:bg-muted cursor-pointer border-border/50">Best Sellers</Badge>
                        <Badge variant="outline" className="px-4 py-1.5 rounded-full whitespace-nowrap hover:bg-muted cursor-pointer border-border/50">Outerwear</Badge>
                        <Badge variant="outline" className="px-4 py-1.5 rounded-full whitespace-nowrap hover:bg-muted cursor-pointer border-border/50">Footwear</Badge>
                        <Badge variant="outline" className="px-4 py-1.5 rounded-full whitespace-nowrap hover:bg-muted cursor-pointer border-border/50">Accessories</Badge>
                        <Badge variant="outline" className="px-4 py-1.5 rounded-full whitespace-nowrap hover:bg-muted cursor-pointer border-border/50">Sale</Badge>
                    </div>

                    {/* Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {products.map((product) => (
                            <motion.div variants={itemVariants} key={product.id}>
                                <Link href={`/products/${product.id}`}>
                                    <Card className="overflow-hidden bg-transparent border-none shadow-none flex flex-col group h-full rounded-sm p-0 gap-0">
                                        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                                            {product.badge && (
                                                <Badge className="absolute top-2 left-2 z-20 shadow-none font-medium px-2 py-0.5 rounded-sm bg-background/80 text-foreground backdrop-blur-none" variant={product.badge === 'Low Stock' || product.badge === 'Sale' ? 'destructive' : 'secondary'}>
                                                    {product.badge}
                                                </Badge>
                                            )}
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="absolute top-2 right-2 z-20 bg-transparent hover:bg-transparent text-foreground/70 hover:text-foreground transition-colors"
                                                onClick={(e) => e.preventDefault()}
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
                                            <CardTitle className="font-normal text-base group-hover:text-primary transition-colors cursor-pointer line-clamp-1">
                                                {product.name}
                                            </CardTitle>
                                            <CardDescription className="text-base font-medium text-foreground pt-0">
                                                {product.price}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="hidden" />
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Pagination */}
                    <div className="mt-16 flex justify-center">
                        <Button variant="outline" className="rounded-full shadow-none border-border/50 px-8">Load More Products</Button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
