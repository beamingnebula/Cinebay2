import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MobileHero from "@/components/MobileHero";
import MobileNavbar from "@/components/MobileNavbar";
import ContinueWatching from "@/components/ContinueWatching";
import DiscoverByGenres from "@/components/DiscoverByGenres";
import TopTenToday from "@/components/TopTenToday";
import ForYouSection from "@/components/ForYouSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Navbar />
        <Hero />
      </div>
      
      {/* Mobile Hero */}
      <div className="md:hidden">
        <MobileHero />
      </div>
      
      <div className="space-y-8 pb-8">
        <ContinueWatching />
        <DiscoverByGenres />
        <TopTenToday />
        <ForYouSection />
      </div>
      <Footer />
      
      {/* Mobile Bottom Navigation */}
      <MobileNavbar />
    </div>
  );
};

export default Index;