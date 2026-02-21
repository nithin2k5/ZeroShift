import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export function FaqSection() {
    const faqs = [
        {
            value: "item-1",
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all unworn and unwashed items with tags attached. Simply initiate a return through our portal, and we'll provide a prepaid shipping label.",
        },
        {
            value: "item-2",
            question: "How long does shipping take?",
            answer: "Standard shipping typically takes 3-5 business days within the contiguous US. Express shipping (1-2 days) is available at checkout for an additional fee. International shipping times vary by destination.",
        },
        {
            value: "item-3",
            question: "Do you ship internationally?",
            answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times are calculated at checkout based on your location. Please note that customs duties may apply depending on your country's regulations.",
        },
        {
            value: "item-4",
            question: "How can I track my order?",
            answer: "Once your order ships, you will receive a confirmation email with a tracking number and a link to track your package in real-time.",
        },
        {
            value: "item-5",
            question: "Are your materials sustainable?",
            answer: "We are committed to sustainability. A significant portion of our collection uses organic cotton, recycled polyester, and ethically sourced leather. We continuously strive to reduce our environmental footprint.",
        },
    ];

    return (
        <section className="min-h-screen flex items-center bg-background border-t border-border/40 py-24">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    <div className="lg:w-1/3 flex flex-col justify-start">
                        <div className="sticky top-32">
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-6">FAQs</h2>
                            <p className="text-muted-foreground text-xl leading-relaxed mb-10">
                                Can&apos;t find the answer you&apos;re looking for? Reach out to our customer support team.
                            </p>
                            <Button variant="outline" className="w-fit rounded-full h-12 px-8 font-semibold hover:bg-foreground hover:text-background transition-colors border-border/50">
                                Contact Support
                            </Button>
                        </div>
                    </div>

                    <div className="lg:w-2/3">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq) => (
                                <AccordionItem key={faq.value} value={faq.value} className="border-b border-border/50 py-2">
                                    <AccordionTrigger className="text-left text-xl lg:text-2xl font-medium hover:no-underline hover:text-primary transition-colors py-6 [&[data-state=open]]:text-primary">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-8 md:pr-12">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
}
