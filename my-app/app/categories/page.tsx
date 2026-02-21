"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CategoriesPage() {
    const categories = [
        {
            id: "men",
            name: "Men's Collection",
            image: "/images/cat-1.jpg",
            link: "/categories/men",
        },
        {
            id: "women",
            name: "Women's Fashion",
            image: "/images/cat-2.jpg",
            link: "/categories/women",
        },
        {
            id: "accessories",
            name: "Accessories",
            image: "/images/cat-3.jpg",
            link: "/categories/accessories",
        },
        {
            id: "footwear",
            name: "Premium Footwear",
            image: "/images/cat-4.jpg",
            link: "/categories/footwear",
        },
    ];

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">

                    {/* Header */}
                    <div className="mb-16">
                        <p className="text-sm text-muted-foreground mb-4 uppercase tracking-widest font-medium">Explore</p>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground mb-6">Collections</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Discover our curated collections. Every piece is designed with an uncompromising commitment to quality and a meticulous attention to detail.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Link href={category.link} className="block group">
                                    <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-square lg:aspect-[4/3] overflow-hidden rounded-sm bg-muted">

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />

                                        {/* Image */}
                                        <motion.img
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            src={category.image}
                                            alt={category.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />

                                        {/* Content */}
                                        <div className="absolute inset-0 z-20 p-8 sm:p-12 flex flex-col justify-end">
                                            <h3 className="text-3xl sm:text-4xl font-black tracking-tighter text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                {category.name}
                                            </h3>
                                            <div className="flex items-center text-white font-medium opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100">
                                                <span className="mr-2 uppercase tracking-widest text-sm">Shop Collection</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </div>

                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
