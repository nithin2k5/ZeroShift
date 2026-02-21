"use client";

import { useParams } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Heart, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dummy Product Data with Categories
const products = [
    { id: 1, name: "Canvas Field Jacket", price: "₹7,499.00", image: "/images/new-1.jpg", badge: "Just Added", category: "men" },
    { id: 2, name: "Linen Blend Overshirt", price: "₹4,999.00", image: "/images/new-2.jpg", badge: "Trending", category: "men" },
    { id: 3, name: "Classic White Sneakers", price: "₹6,999.00", image: "/images/new-3.jpg", category: "footwear" },
    { id: 4, name: "Woven Leather Belt", price: "₹2,599.00", image: "/images/new-4.jpg", badge: "Low Stock", category: "accessories" },
    { id: 5, name: "Essential Heavyweight Tee", price: "₹2,299.00", image: "/images/prod-4.jpg", category: "men" },
    { id: 6, name: "Tailored Chino Trousers", price: "₹3,999.00", image: "/images/prod-2.jpg", badge: "Best Seller", category: "women" },
    { id: 7, name: "Merino Wool Crewneck", price: "₹5,499.00", image: "/images/prod-3.jpg", badge: "Sale", category: "women" },
    { id: 8, name: "Premium Denim Jacket", price: "₹8,999.00", image: "/images/prod-1.jpg", category: "men" },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
};

export default function CategoryPage() {
    const params = useParams();
    const categoryId = (params?.category as string) || "collection";

    // Capitalize category name for display
    const title = categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace(/-/g, " ");

    // Filter products based on category route
    const filteredProducts = products.filter(product => product.category === categoryId);

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <p className="text-sm text-muted-foreground mb-4 uppercase tracking-widest font-medium">Home &nbsp;/&nbsp; {title}</p>
                            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground">{title}</h1>
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

                    {/* Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <motion.div variants={itemVariants} key={product.id}>
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
                                        <CardContent className="hidden" />
                                    </Card>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <h3 className="text-2xl font-bold mb-2">No items found</h3>
                                <p className="text-muted-foreground">We couldn&apos;t find any products in the {title} category right now.</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
