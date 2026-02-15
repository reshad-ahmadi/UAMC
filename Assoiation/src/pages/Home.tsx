import Navbar from "../components/Nav"
import About from "../pages/About";
import Campanys from "../pages/Campanys";
import Products from "../pages/Products";
import HeroSection from "../pages/Herosection";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Navigation from "../components/navigation";

export default function Home() {
  return (
    <div className="bg-brand-bg">
      <Navbar />
      <HeroSection />
      <Navigation/>
      <Campanys/>
      <Products/>
      <About/>
      <Contact/>
      <Footer/>
    </div>
  )
}
