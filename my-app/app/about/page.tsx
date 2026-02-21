"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-4 md:px-8 max-w-5xl">

                    {/* Intro Section */}
                    <div className="mb-24 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-8"
                        >
                            Redefining Modern <br className="hidden md:block" /> Essentials
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light"
                        >
                            LuxeCart was born from a simple belief: everyday clothing shouldn&apos;t be an afterthought. We craft premium wardrobe staples engineered to last longer, fit better, and transcend seasonal trends.
                        </motion.p>
                    </div>

                    {/* Image Break 1 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full aspect-[21/9] bg-muted mb-24 overflow-hidden relative"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/hero.jpg"
                            alt="Brand Story Image"
                            className="absolute inset-0 w-full h-full object-cover grayscale opacity-80"
                        />
                    </motion.div>

                    {/* Split Narrative */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="order-2 md:order-1"
                        >
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 hidden md:block">Uncompromising Quality</h2>
                            <h2 className="text-4xl font-black tracking-tight mb-6 md:hidden">Uncompromising Quality</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                We source our fabrics from some of the oldest, most prestigious mills in the world. Instead of chasing fast fashion cycles, we spend months prototyping singular garments.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Our heavy cotton twills, genuine leathers, and tailored fits undergo rigorous testing before they ever reach your wardrobe. It&apos;s a slower approach to design, but the result is clothing you&apos;ll reach for decade after decade.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="order-1 md:order-2 aspect-[3/4] bg-muted relative overflow-hidden"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/prod-1.jpg"
                                alt="Fabric Texture"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>

                    {/* Split Narrative 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="aspect-[3/4] bg-muted relative overflow-hidden"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/cat-2.jpg"
                                alt="Design Studio"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 hidden md:block">Sustainable Practices</h2>
                            <h2 className="text-4xl font-black tracking-tight mb-6 md:hidden">Sustainable Practices</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                True sustainability starts with making less, but making it better. By creating garments that won&apos;t fall apart after a few washes, we actively reduce contribution to landfills.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Furthermore, we operate strictly on small-batch production runs. This ensures zero deadstock inventory and allows us to maintain the highest standard of ethical manufacturing oversight.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
