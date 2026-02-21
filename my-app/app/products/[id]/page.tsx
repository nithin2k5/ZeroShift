"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Upload, Star, Ruler, Truck, Shield, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const mockProduct = {
    name: "Classic Heavyweight Override Jacket",
    price: "₹8,499.00",
    rating: 4.8,
    reviews: 124,
    description: "Constructed from premium heavyweight twill, this override jacket is designed to break in beautifully over time. It features reinforced seam stitching, custom metallic hardware, and an oversized fit ideal for layering during transitional weather.",
    images: [
        "/images/prod-1.jpg",
        "/images/prod-2.jpg",
        "/images/new-1.jpg",
        "/images/new-2.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
        { name: "Forest Green", hex: "#2C402B" },
        { name: "Ash Grey", hex: "#7E8388" },
        { name: "Midnight Black", hex: "#111111" }
    ]
};

export default function ProductDetailsPage() {
    // In a real app we'd fetch product by params.id

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState("Forest Green");
    const [quantity, setQuantity] = useState(1);

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 pt-24 pb-24">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-8">

                        {/* LEFT: Image Gallery */}
                        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 h-fit sticky top-28">
                            {/* Thumbnails */}
                            <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:w-24 shrink-0 pb-2 md:pb-0">
                                {mockProduct.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`relative aspect-[3/4] w-20 md:w-full overflow-hidden bg-muted transition-all duration-200 ${selectedImage === idx ? 'ring-1 ring-foreground ring-offset-2 ring-offset-background' : 'opacity-60 hover:opacity-100'}`}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={img} alt={`Thumbnail ${idx}`} className="object-cover w-full h-full" />
                                    </button>
                                ))}
                            </div>

                            {/* Main Image */}
                            <div className="relative aspect-[3/4] w-full bg-muted overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={selectedImage}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        src={mockProduct.images[selectedImage]}
                                        alt={mockProduct.name}
                                        className="object-cover w-full h-full"
                                    />
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* RIGHT: Product Details */}
                        <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-0">
                            <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-3">Outerwear</p>
                            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground mb-4 leading-none">{mockProduct.name}</h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(mockProduct.rating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-muted-foreground">{mockProduct.rating} ({mockProduct.reviews} Reviews)</span>
                            </div>

                            <p className="text-3xl font-light text-foreground mb-8">{mockProduct.price}</p>
                            <p className="text-base text-foreground/80 leading-relaxed mb-10">{mockProduct.description}</p>

                            <Separator className="mb-8 bg-border/40" />

                            {/* Colors */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm font-semibold uppercase tracking-wider">Color: <span className="text-muted-foreground font-normal ml-1">{selectedColor}</span></span>
                                </div>
                                <div className="flex gap-4">
                                    {mockProduct.colors.map(color => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color.name ? 'border-foreground ring-2 ring-background ring-inset scale-110' : 'border-transparent hover:scale-105'}`}
                                            style={{ backgroundColor: color.hex }}
                                            aria-label={color.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Sizes */}
                            <div className="mb-10">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm font-semibold uppercase tracking-wider">Size: <span className="text-muted-foreground font-normal ml-1">{selectedSize}</span></span>
                                    <button className="text-sm flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"><Ruler className="w-4 h-4" /> Size Guide</button>
                                </div>
                                <div className="grid grid-cols-5 gap-3">
                                    {mockProduct.sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`py-3 border flex items-center justify-center text-sm font-medium transition-colors ${selectedSize === size ? 'border-foreground bg-foreground text-background' : 'border-border/60 hover:border-foreground bg-transparent text-foreground'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Add to Cart Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <div className="flex items-center justify-between border border-border/60 p-1 w-full sm:w-1/3">
                                    <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="rounded-none hover:bg-muted text-foreground/70"><Minus className="w-4 h-4" /></Button>
                                    <span className="font-semibold text-lg">{quantity}</span>
                                    <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="rounded-none hover:bg-muted text-foreground/70"><Plus className="w-4 h-4" /></Button>
                                </div>
                                <Button className="w-full sm:w-2/3 h-14 text-lg font-bold rounded-none hover:scale-[1.01] transition-transform shadow-none bg-primary text-primary-foreground">
                                    Add To Cart
                                </Button>
                            </div>

                            <div className="flex gap-4 mb-12">
                                <Button variant="outline" className="flex-1 rounded-none border-border/60 shadow-none hover:bg-muted h-12">
                                    <Heart className="w-4 h-4 mr-2" /> Wishlist
                                </Button>
                                <Button variant="outline" className="flex-1 rounded-none border-border/60 shadow-none hover:bg-muted h-12">
                                    <Upload className="w-4 h-4 mr-2" /> Share
                                </Button>
                            </div>

                            {/* Accordions */}
                            <Accordion type="single" collapsible className="w-full border-t border-border/40">
                                <AccordionItem value="shipping" className="border-border/40">
                                    <AccordionTrigger className="text-base font-semibold hover:no-underline hover:text-primary py-5 [&[data-state=open]]:text-primary">
                                        <div className="flex items-center gap-3"><Truck className="w-5 h-5 text-muted-foreground" /> Delivery & Returns</div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-6">
                                        Standard shipping usually takes 3-5 business days. We offer a 30-day return policy for unworn items with tags attached.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="materials" className="border-border/40">
                                    <AccordionTrigger className="text-base font-semibold hover:no-underline hover:text-primary py-5 [&[data-state=open]]:text-primary">
                                        <div className="flex items-center gap-3"><Shield className="w-5 h-5 text-muted-foreground" /> Materials & Care</div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-6">
                                        100% Heavyweight Cotton Twill. Machine wash cold with like colors. Tumble dry low or hang dry to prevent shrinkage.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
