import React from "react";
import Navbar from "../components/Nav"
import About from "../pages/About";
import Campanys from "../pages/Campanys";
import Products from "../pages/Products";
import HeroSection from "../pages/Herosection";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Navigation from "../components/navigation";

export default function Home() {
  React.useEffect(() => {
    // Handle scrolling to hash if present
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

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
