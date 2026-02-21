"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    }
};

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-background h-screen flex items-center pt-24 pb-16">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex-1 text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                            New Summer Collection 2026
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[1.1]">
                            Discover the <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
                                Peak of Style
                            </span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Elevate your everyday look with our premium collection of meticulously crafted essentials.
                            Designed for the modern individual who values both aesthetics and comfort.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                            <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-full text-base font-semibold group overflow-hidden relative">
                                <span className="relative z-10 flex items-center">
                                    Shop Collection
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                                <div className="absolute inset-0 h-full w-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shimmer z-0" />
                            </Button>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-full text-base font-semibold bg-background/50 backdrop-blur-sm hover:bg-muted">
                                View Lookbook
                            </Button>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-border/50">
                            <div className="text-center lg:text-left">
                                <p className="text-4xl font-bold tracking-tight">50k+</p>
                                <p className="text-sm text-muted-foreground mt-1 font-medium">Happy Customers</p>
                            </div>
                            <div className="w-px h-12 bg-border"></div>
                            <div className="text-center lg:text-left hidden sm:block">
                                <div className="flex items-center justify-center lg:justify-start gap-1 text-primary mb-1">
                                    <Star className="h-5 w-5 fill-current" />
                                    <Star className="h-5 w-5 fill-current" />
                                    <Star className="h-5 w-5 fill-current" />
                                    <Star className="h-5 w-5 fill-current" />
                                    <Star className="h-5 w-5 fill-current" />
                                </div>
                                <p className="text-sm font-medium">4.9/5 Average Rating</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                        className="flex-1 relative w-full max-w-xl lg:max-w-none mx-auto"
                    >
                        <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-muted/30 border border-border/50 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10"></div>
                            { }
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.6 }}
                                src="/images/hero.jpg"
                                alt="Premium Fashion Model"
                                className="object-cover w-full h-full cursor-pointer"
                            />

                            {/* Floating element 1 */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute top-8 left-[-1rem] sm:left-8 glass p-4 rounded-2xl z-20 shadow-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary text-primary-foreground p-3 rounded-xl shadow-inner">
                                        <ShoppingBag className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Latest Drops</p>
                                        <p className="text-xs text-muted-foreground font-medium">Updated daily</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating element 2 */}
                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-8 right-[-1rem] sm:right-8 glass p-4 rounded-2xl z-20 shadow-xl"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map((i) => (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img
                                                key={i}
                                                className="w-10 h-10 rounded-full border-2 border-background shadow-sm"
                                                src={`/images/avatar-${i}.jpg`}
                                                alt="User"
                                            />
                                        ))}
                                    </div>
                                    <div className="text-sm font-bold ml-3 mr-2">
                                        Loved by <br /> <span className="text-primary">10k+</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
