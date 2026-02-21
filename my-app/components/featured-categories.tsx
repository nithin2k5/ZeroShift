"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
};

export function FeaturedCategories() {
    const categories = [
        {
            id: "men",
            name: "Men's Collection",
            image: "/images/cat-1.jpg",
            link: "/categories/men",
            span: "md:col-span-2 md:row-span-2",
        },
        {
            id: "women",
            name: "Women's Fashion",
            image: "/images/cat-2.jpg",
            link: "/categories/women",
            span: "md:col-span-1 md:row-span-1",
        },
        {
            id: "accessories",
            name: "Accessories",
            image: "/images/cat-3.jpg",
            link: "/categories/accessories",
            span: "md:col-span-1 md:row-span-1",
        },
        {
            id: "footwear",
            name: "Premium Footwear",
            image: "/images/cat-4.jpg",
            link: "/categories/footwear",
            span: "md:col-span-2 md:row-span-1",
        },
    ];

    return (
        <section className="min-h-screen flex items-center bg-background relative overflow-hidden py-16">
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
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Explore Collections</h2>
                        <p className="text-muted-foreground text-xl">Curated aesthetic pieces to build your signature look.</p>
                    </div>
                    <Link href="/categories" className="group hidden md:flex items-center text-primary font-bold hover:underline mt-6 md:mt-0 text-lg">
                        Browse All Categories
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </Link>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px] md:auto-rows-[340px]"
                >
                    {categories.map((category) => (
                        <motion.div variants={itemVariants} key={category.id} className={`${category.span} block h-full`}>
                            <Link
                                href={category.link}
                                className="group relative overflow-hidden rounded-[2rem] block h-full w-full shadow-lg"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors duration-500 z-10" />
                                { }
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    src={category.image}
                                    alt={category.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute bottom-8 left-8 z-20 pr-8">
                                    <h3 className="text-white text-3xl font-black tracking-tight mb-3 drop-shadow-md group-hover:text-primary transition-colors">
                                        {category.name}
                                    </h3>
                                    <span className="inline-flex items-center bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold group-hover:bg-primary group-hover:text-primary-foreground group-hover:translate-x-2 transition-all duration-300">
                                        Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/categories" className="inline-flex items-center text-primary font-bold hover:underline text-lg">
                        Browse All Categories
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
