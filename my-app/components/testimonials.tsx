"use client";

import { Quote } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
    {
        id: 1,
        name: "Sarah Jenkins",
        handle: "@sarahstyles",
        role: "Fashion Blogger",
        content: "The quality of these pieces is absolutely unmatched. I've been looking for staples that last, and LuxeCart delivered beyond my expectations. Highly recommend the new summer drops!",
        avatar: "/images/avatar-1.jpg",
        rating: 5,
    },
    {
        id: 2,
        name: "Michael Chen",
        handle: "@mchen_design",
        role: "Art Director",
        content: "Minimalist, aesthetic, and incredibly comfortable. As someone who appreciates good design, the attention to detail in the stitching and fabric selection is immediately apparent.",
        avatar: "/images/avatar-2.jpg",
        rating: 5,
    },
    {
        id: 3,
        name: "Emma Watson",
        handle: "@emmarides",
        role: "Verified Buyer",
        content: "Fast shipping and the packaging was beautiful. The leather backpack I ordered is now my everyday carry. Fits my laptop perfectly while still looking chic.",
        avatar: "/images/avatar-3.jpg",
        rating: 4,
    },
    {
        id: 4,
        name: "James Wilson",
        handle: "@jamesw_visuals",
        role: "Photographer",
        content: "I need clothes that are functional but look great on camera. This collection hits the sweet spot. The accessories especially are top-tier.",
        avatar: "/images/avatar-4.jpg",
        rating: 5,
    },
];

export function TestimonialsSection() {
    return (
        <section className="min-h-screen flex items-center bg-background relative overflow-hidden py-16">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">What Our Clients Say</h2>
                    <p className="text-muted-foreground text-xl">Join thousands of satisfied customers who have elevated their daily aesthetic.</p>
                </div>

                <div className="max-w-4xl mx-auto px-12 md:px-16">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full relative"
                    >
                        <Quote className="absolute -top-10 -left-6 md:-left-12 h-24 w-24 md:h-32 md:w-32 text-primary/10 rotate-180 z-0" />

                        <CarouselContent className="-ml-4">
                            {testimonials.map((testimonial) => (
                                <CarouselItem key={testimonial.id} className="pl-4 basis-full">
                                    <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px] z-10 relative">
                                        <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed tracking-tight text-foreground mb-12">
                                            &quot;{testimonial.content}&quot;
                                        </p>

                                        <div className="flex flex-col items-center gap-4 mt-auto">
                                            <Avatar className="h-16 w-16 md:h-20 md:w-20 border border-border/50">
                                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                                <AvatarFallback className="text-lg">{testimonial.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-1">
                                                <p className="text-base md:text-lg font-bold">{testimonial.name}</p>
                                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="flex items-center justify-center gap-4 mt-12 relative z-20">
                            <CarouselPrevious className="position-static transform-none static translate-y-0 h-12 w-12 border border-border/50 hover:bg-foreground hover:text-background transition-colors" />
                            <CarouselNext className="position-static transform-none static translate-y-0 h-12 w-12 border border-border/50 hover:bg-foreground hover:text-background transition-colors" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
