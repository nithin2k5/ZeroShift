export function BrandsMarquee() {
    const brands = [
        { name: "Vogue", logo: "VOGUE" },
        { name: "GQ", logo: "GQ" },
        { name: "Highsnobiety", logo: "HIGHSNOBIETY" },
        { name: "Hypebeast", logo: "HYPEBEAST" },
        { name: "Esquire", logo: "ESQUIRE" },
        { name: "Harper's Bazaar", logo: "BAZAAR" },
    ];

    return (
        <section className="py-12 bg-muted/30 border-y border-border/40 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10"></div>

            <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] gap-16 pr-16">
                {[...brands, ...brands, ...brands].map((brand, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 flex items-center justify-center text-3xl font-black tracking-widest text-muted-foreground/40 hover:text-foreground transition-colors cursor-default"
                    >
                        {brand.logo}
                    </div>
                ))}
            </div>
        </section>
    );
}
