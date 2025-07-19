import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ContinueWatching from "@/components/ContinueWatching";
import DiscoverByGenres from "@/components/DiscoverByGenres";
import TopTenToday from "@/components/TopTenToday";
import ForYouSection from "@/components/ForYouSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <div className="space-y-8 pb-8">
        <ContinueWatching />
        <DiscoverByGenres />
        <TopTenToday />
        <ForYouSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;