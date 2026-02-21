"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-4 md:px-8 max-w-6xl">

                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl font-black tracking-tighter mb-4"
                        >
                            Get in Touch
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-lg text-muted-foreground"
                        >
                            Whether you have a question about our products, sizing, or an existing order, our team is ready to answer all your questions.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

                        {/* Left: Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-3xl font-black tracking-tight mb-8">Contact Information</h2>

                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">Our Flagship Store</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            123 Luxe Avenue<br />
                                            Fashion District, FD 10001<br />
                                            New York, NY
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">Phone Inquiry</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            +1 (800) 123-4567<br />
                                            <span className="text-sm">Available Mon-Fri, 9am - 6pm EST</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">Email Support</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            support@luxecart.com<br />
                                            <span className="text-sm">We aim to reply within 24 hours.</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">Store Hours</h3>
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-muted-foreground text-sm">
                                            <span>Monday - Friday:</span>
                                            <span>10:00 AM - 8:00 PM</span>
                                            <span>Saturday:</span>
                                            <span>11:00 AM - 7:00 PM</span>
                                            <span>Sunday:</span>
                                            <span>12:00 PM - 5:00 PM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-muted/30 p-8 sm:p-10 border border-border/40"
                        >
                            <h2 className="text-2xl font-black tracking-tight mb-8">Send us a Message</h2>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                                        <Input id="name" placeholder="John Doe" className="h-12 rounded-none border-border/60 bg-background shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">Email Component</label>
                                        <Input id="email" type="email" placeholder="john@example.com" className="h-12 rounded-none border-border/60 bg-background shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                    <Input id="subject" placeholder="Order Inquiry" className="h-12 rounded-none border-border/60 bg-background shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <textarea
                                        id="message"
                                        placeholder="How can we help you?"
                                        className="flex min-h-[150px] w-full border border-border/60 bg-background px-3 py-2 text-sm shadow-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50 rounded-none resize-none"
                                    ></textarea>
                                </div>

                                <Button className="w-full h-14 rounded-none text-base font-bold shadow-none hover:scale-[1.01] transition-transform">
                                    SEND MESSAGE
                                </Button>
                            </form>
                        </motion.div>

                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
