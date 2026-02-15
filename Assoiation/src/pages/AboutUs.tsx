import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Target, Eye, ShieldCheck, History, Handshake, TrendingUp, Globe, Briefcase } from 'lucide-react';
import Navbar from '../components/Nav';
import Footer from '../components/Footer';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Counter = ({ target, isVisible, suffix = "" }: { target: number, isVisible: boolean, suffix?: string }) => {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const duration = 800; // 0.8 seconds (very fast)
    const increment = target / (duration / 16); // 60fps approx
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <>{count}{suffix}</>;
};

export default function AboutUs() {
  const { t, language } = useLanguage();
  const statsAnimation = useScrollAnimation();
  const contentAnimation = useScrollAnimation();
  const missionAnimation = useScrollAnimation();

  const isRTL = language === 'da' || language === 'ps';

  const stats = [
    {
      target: 50,
      suffix: "+",
      label: t('stats_factories_label'),
      description: t('stats_factories_desc'),
    },
    {
      target: 15,
      suffix: "+",
      label: t('stats_provinces_label'),
      description: t('stats_provinces_desc'),
    },
    {
      target: 100,
      suffix: "%",
      label: t('stats_quality_label'),
      description: t('stats_quality_desc'),
    }
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = [
    "/images/slide-herat-industrial.jpg",
    "/images/slide-steel-union.jpg",
    "/images/slide-pipe-production.jpg",
    "/images/slide-mazar-factory.jpg"
  ];

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

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#0B1222] min-h-screen text-white">
      <Navbar />
      
      {/* Hero Section - Background Slideshow */}
      <section id="about-hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden 2xl:pt-[180px] 2xl:pb-[170px] ">
        {/* Slideshow Background - Balanced Visibility */}
        <div className="absolute inset-0 z-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={slide} 
                alt={`Industrial Background ${index + 1}`} 
                className="w-full h-full object-cover"
                onLoad={() => console.log(`Slide ${index + 1} loaded: ${slide}`)}
                onError={(e) => console.error(`Failed to load slide ${index + 1}: ${slide}`, e)}
              />
            </div>
          ))}
          {/* Darker overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1222]/60 via-[#0B1222]/70 to-[#0B1222]/90"></div>
        </div>

        <div className="max-w-full mx-auto px-6 lg:px-12 2xl:px-[250px] relative w-full text-center">
          <div className="max-w-5xl mx-auto">
            <span className="relative -top-[20px] inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm 2xl:text-lg font-bold tracking-widest uppercase mb-6 2xl:mb-8 animate-fade-in">
              {t('about_header')}
            </span>
            <h1 className="text-4xl md:text-6xl 2xl:text-8xl font-extrabold mb-8 2xl:mb-12 leading-[1.1] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-500/50">
              {language === 'en' ? (
                <>Building Afghanistan's <span className="text-blue-600">Industrial Future</span></>
              ) : (
                t('about_detailed_title')
              )}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl 2xl:text-2xl leading-relaxed max-w-4xl lg:max-w-[800px] xl:max-w-[800px] mx-auto font-medium">
              {t('about_desc')}
            </p>
          </div>
        </div>

        {/* Slideshow Indicators - Positioned at bottom */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 2xl:py-24 bg-white/5 border-y border-white/5">
        <div 
          ref={statsAnimation.ref}
          className={`max-w-full mx-auto px-6 lg:px-12 2xl:px-[250px] transition-all duration-1000 ${
            statsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <span className="text-5xl 2xl:text-8xl font-black text-blue-600 mb-2 2xl:mb-4">
                  <Counter target={stat.target} isVisible={statsAnimation.isVisible} suffix={stat.suffix} />
                </span>
                <h3 className="text-lg 2xl:text-3xl font-bold mb-2">{stat.label}</h3>
                <p className="text-gray-400 text-sm 2xl:text-xl leading-relaxed max-w-xs">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Story & Detailed Content Section */}
      <section className="py-24 2xl:py-48 relative">
        <div 
          ref={contentAnimation.ref}
          className={`max-w-full mx-auto px-6 lg:px-12 2xl:px-[250px] transition-all duration-1000 delay-150 ${
            contentAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Side Navigation / Highlights (Left) */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6 2xl:space-y-12">
              <div className="p-6 2xl:p-12 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
                <h3 className="text-xl 2xl:text-4xl font-bold mb-6 2xl:mb-10 flex items-center gap-3">
                  <ShieldCheck className="text-blue-500" size={28} />
                  {language === 'en' ? 'Core Impact' : (language === 'da' ? 'تاثیرات اساسی' : 'بنسټیز اغیز')}
                </h3>
                <ul className="space-y-5 2xl:space-y-8">
                  <li className="flex gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-base 2xl:text-2xl mb-1">{language === 'en' ? 'Coordination' : (language === 'da' ? 'هماهنگی' : 'همغږي')}</h4>
                      <p className="text-gray-400 text-sm 2xl:text-lg">{language === 'en' ? 'Fostering internal cooperation among industries.' : (language === 'da' ? 'ایجاد هماهنگی درون سازمانی میان صنایع.' : 'د صنعتونو ترمنځ داخلي همغږي رامنځته کول.')}</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-base 2xl:text-2xl mb-1">{language === 'en' ? 'Strategic Focus' : (language === 'da' ? 'تمرکز استراتژیک' : 'ستراتژیک تمرکز')}</h4>
                      <p className="text-gray-400 text-sm 2xl:text-lg">{language === 'en' ? 'Enhancing quality and quantity of production.' : (language === 'da' ? 'ارتقای کیفیت و افزایش کمیت تولیدات.' : 'د تولیداتو کیفیت او کمیت لوړول.')}</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-base 2xl:text-2xl mb-1">{language === 'en' ? 'Market Stability' : (language === 'da' ? 'ثبات بازار' : 'د بازار ثبات')}</h4>
                      <p className="text-gray-400 text-sm 2xl:text-lg">{language === 'en' ? 'Protecting domestic goods from dumping policies.' : (language === 'da' ? 'محافظت از کالاهای داخلی در برابر سیاست‌های دامپینگ.' : 'د ډمپینګ سیاستونو پر وړاندې د کورنیو تولیداتو ساتنه.')}</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Additional Side Image - Full width */}
              <div className="rounded-3xl overflow-hidden border border-white/10 aspect-[3/2] lg:aspect-[4/5] w-full shadow-2xl">
                <img 
                  src="/images/slide-steel-union.jpg" 
                  alt="Industrial Complex" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Main Content (Right) */}
            <div className="lg:col-span-8 space-y-10 2xl:space-y-16">
              <div className="prose prose-invert max-w-none">
                <div className="flex items-center gap-4 mb-6 2xl:mb-10">
                  <div className="w-10 md:w-16 h-1 bg-blue-600 rounded-full"></div>
                  <h2 className="text-2xl md:text-4xl 2xl:text-6xl font-bold tracking-tight">
                    {t('about_detailed_journey')}
                  </h2>
                </div>

                <div className="space-y-6 2xl:space-y-10 text-gray-300 text-base md:text-lg 2xl:text-2xl leading-relaxed">
                  <div className="p-6 2xl:p-10 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/20 transition-colors">
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
                      <History className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                      <p>{t('about_detailed_p1')}</p>
                    </div>
                  </div>

                  <div className="p-6 2xl:p-10 border border-white/5 rounded-2xl md:rounded-3xl">
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
                      <TrendingUp className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                      <p>{t('about_detailed_p2')}</p>
                    </div>
                  </div>

                  <div className="p-6 2xl:p-10 bg-blue-600/5 border border-blue-600/10 rounded-2xl md:rounded-3xl">
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
                      <ShieldCheck className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                      <p>{t('about_detailed_p3')}</p>
                    </div>
                  </div>

                  <div className="p-6 2xl:p-10 border border-white/5 rounded-2xl md:rounded-3xl">
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
                      <Handshake className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                      <p>{t('about_detailed_p4')}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 2xl:p-10 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10">
                      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
                        <Briefcase className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                        <p>{t('about_detailed_p5')}</p>
                      </div>
                    </div>
                    {/* Inline Image - Full width */}
                    <div className="rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 h-48 md:h-64 2xl:h-96 relative group w-full shadow-xl">
                      <img 
                        src="/images/hero_meeting.png" 
                        alt="Communication and Planning" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
                    </div>
                  </div>

                  <div className="p-6 2xl:p-10 bg-gradient-to-r from-blue-600/5 to-transparent border border-blue-500/20 rounded-2xl md:rounded-3xl">
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
                      <Globe className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                      <p>{t('about_detailed_p6')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision Redesign */}
      <section className="pb-24 2xl:pb-48">
        <div 
          ref={missionAnimation.ref}
          className={`max-w-full mx-auto px-6 lg:px-12 2xl:px-[250px] transition-all duration-1000 delay-200 ${
            missionAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="group relative p-8 2xl:p-16 rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-500">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 rounded-full blur-[60px] -z-10 group-hover:bg-blue-600/15 transition-colors"></div>
              <div className="w-14 h-14 2xl:w-24 2xl:h-24 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6 2xl:mb-10 group-hover:scale-110 transition-transform">
                <Target className="text-blue-500" size={28} />
              </div>
              <h3 className="text-2xl 2xl:text-5xl font-bold mb-4 2xl:mb-6">{t('about_mission_title')}</h3>
              <p className="text-gray-400 text-base 2xl:text-2xl leading-relaxed">
                {t('about_mission_desc')}
              </p>
            </div>

            <div className="group relative p-8 2xl:p-16 rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden hover:border-blue-900/50 transition-all duration-500">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-900/5 rounded-full blur-[60px] -z-10 group-hover:bg-blue-900/15 transition-colors"></div>
              <div className="w-14 h-14 2xl:w-24 2xl:h-24 bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 2xl:mb-10 group-hover:scale-110 transition-transform">
                <Eye className="text-blue-500" size={28} />
              </div>
              <h3 className="text-2xl 2xl:text-5xl font-bold mb-4 2xl:mb-6">{t('about_vision_title')}</h3>
              <p className="text-gray-400 text-base 2xl:text-2xl leading-relaxed">
                {t('about_vision_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
}
