import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { BrandsMarquee } from "@/components/brands-marquee";
import { FeaturedCategories } from "@/components/featured-categories";
import { FeaturedProducts } from "@/components/featured-products";
import { NewArrivals } from "@/components/new-arrivals";
import { TestimonialsSection } from "@/components/testimonials";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <BrandsMarquee />
        <FeaturedCategories />
        <FeaturedProducts />
        <NewArrivals />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
