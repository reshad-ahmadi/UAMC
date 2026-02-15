import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, ArrowRight, Building2, Globe, TrendingUp, Users, Calendar } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const HeroSection = () => {
  const { t } = useLanguage();
  const badgeAnimation = useScrollAnimation();
  const headingAnimation = useScrollAnimation();
  const descAnimation = useScrollAnimation();
  const buttonAnimation = useScrollAnimation();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          alt="High-level boardroom meeting"
          className="w-full h-full object-cover"
          src="/images/hero10.png"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/50 to-[#0B1222]"></div>
      </div>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center py-12 md:py-20 mt-[90px] md:mt-[70px] ">
        {/* Badge */}
        <div 
          ref={badgeAnimation.ref}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 2xl:px-5 2xl:py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-6 md:mb-8 2xl:mb-8 shadow-2xl max-w-full transition-all duration-1000 ${
            badgeAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <ShieldCheck className="w-3 h-3 md:w-3.5 md:h-3.5 2xl:w-4 2xl:h-4 text-blue-600 shrink-0" />
          <span className="text-[8px] sm:text-[9px] md:text-[10px] 2xl:text-xs font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase text-white whitespace-nowrap overflow-hidden text-ellipsis">The Official Voice of Afghan Manufacturing</span>
        </div>

        {/* Heading */}
        <h1 
          ref={headingAnimation.ref}
          className={`text-2xl sm:text-3xl md:text-[30px] lg:text-4xl 2xl:text-6xl font-bold text-white
             w-full max-w-[90vw] md:max-w-full mx-auto leading-tight
             mb-6 2xl:mb-8 tracking-tight drop-shadow-sm px-2 transition-all duration-1000 delay-150 ${
            headingAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="md:whitespace-nowrap block">Union of Afghan Manufacturing Companies of</span>
          <span className="block mt-2 text-blue-200 drop-shadow-[0_0_40px_rgba(37,99,235,0.4)]">
            CANS, PROFILES, IRON AND PIPES
          </span>
        </h1>

        {/* Description */}
        <p 
          ref={descAnimation.ref}
          className={`max-w-xl md:max-w-2xl lg:max-w-3xl 2xl:max-w-6xl mx-auto text-xs sm:text-[14px] lg:text-[15px] 2xl:text-[20px] text-center xl:text-center xl:text-[15px] text-slate-200 font-light leading-relaxed mb-8 md:mb-10 2xl:mb-12 px-4 md:px-5 lg:px-[20px] font-semibold transition-all duration-1000 delay-300 ${
            descAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
            The Union of Afghan Manufacturing Companies of Cans, Profiles, Iron and Galvanized Pipes was established in 2024 (1403 in the Afghan calendar) with the primary
            objective of fostering internal coordination among related manufacturing industries and strengthening cooperation
            with governmental and non-governmental institutions. With a strategic focus on enhancing both the quality and quantity
             of domestic production,  of the Islamic 
             Emirate of Afghanistan on 30 October 2025 (8/8/1404) and commenced its practical activities thereafter.
        </p>

        {/* Buttons */}
        <div 
          ref={buttonAnimation.ref}
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 transition-all duration-1000 delay-500 ${
            buttonAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <a 
            href="/#contact" 
            className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-3 2xl:px-10 2xl:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm md:text-base 2xl:text-lg font-bold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 group"
          >
            CONTACT US
            <ArrowRight className="w-4 h-4 2xl:w-5 2xl:h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>


      </main>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1222] to-transparent z-20 pointer-events-none"></div>
    </div>
  );
};

export default HeroSection;