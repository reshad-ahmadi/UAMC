import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Navigation() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useLanguage();

  const images = [
    "/images/ARIYA_PROFILE.jpg-removebg-preview (1).png",
    "/images/ETIHAD.jpg-removebg-preview (1).png",
    "/images/FOLAD_PROFILE.jpg-removebg-preview (1).png",
    "/images/GHAZNAWI_PROFILE.jpg-removebg-preview (1).png",
    "/images/HERAT_AFGHAN_PROFILE.jpg-removebg-preview (1).png",
    "/images/KAMRAN_PROFILE.jpg-removebg-preview (1).png",
    "/images/MAZAR_PROFILE.jpg-removebg-preview (1).png",
    "/images/RIAL_PROFILE.jpg-removebg-preview (1).png",
    "/images/SHAMAL_PROFILE.jpg-removebg-preview (1).png",
    "/images/SHIRZAD_PROFILE.jpg-removebg-preview (1).png",
    "/images/VICTOR_PIPE.jpg-removebg-preview (1).png",
    "/images/ZADA_PROFILE.jpg-removebg-preview (1).png",
    "/images/ZAWB_PROFILE.jpg-removebg-preview (1).png",
  ];

  const duplicatedImages = [...images, ...images, ...images, ...images];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="">
      <div className="flex items-center justify-center bg-[#0B1222] gap-4 text-gray-400 text-[10px] sm:text-xs font-medium tracking-[0.3em] uppercase py-2">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500/50"></div>
        <span className="whitespace-nowrap">{t('trusted_leaders')}</span>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-500/50"></div>
      </div>
  
      <div className="relative w-full overflow-hidden border-y border-white/10 bg-[#0B1222] py-8 text-center">
        {/* Main scrolling container */}
        <div className="flex w-max animate-scroll hover:pause items-center gap-2 md:gap-24 lg:gap-32">
          {duplicatedImages.map((src, index) => (
            <div 
              key={index}
              className="relative flex-shrink-0 group"
            >
              {/* Image container - significantly increased size */}
              <div className="relative h-20 w-48 sm:h-24 sm:w-56 md:h-28 md:w-64 lg:h-32 lg:w-32 xl:h-32 xl:w-60 flex items-center justify-center transition-all duration-500">
                <img 
                  src={src} 
                  alt={`Partner ${index % images.length + 1}`}
                  className="w-full h-full object-contain transition-all duration-500 scale-100 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-[#0B1222] via-[#0B1222]/90 to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-[#0B1222] via-[#0B1222]/90 to-transparent pointer-events-none z-10"></div>

      
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050505] z-20">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      )}
    </div>
         
   </div>
  );
}