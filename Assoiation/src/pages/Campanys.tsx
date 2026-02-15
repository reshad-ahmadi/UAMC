import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function TaxationServices() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 7;
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const backgroundImages = [
    '/images/slide-ariya-profile.jpg',
    '/images/slide-steel-union.jpg',
    '/images/slide-folad-iron.jpg',
    '/images/slide-pipe-production.jpg',
    '/images/slide-herat-industrial.jpg',
    '/images/slide-mazar-factory.jpg',
    '/images/slide-metal-construction.jpg'
  ];

  const pageData = [
    { 
      title: [t('slider_1_t1'), t('slider_1_t2'), t('slider_1_t3')], 
      desc: [
        t('slider_1_desc'),
        ""
      ] 
    },
    { 
      title: [t('slider_2_t1'), t('slider_2_t2'), t('slider_2_t3')], 
      desc: [
        t('slider_2_desc'),
        ""
      ] 
    },
    { 
      title: [t('slider_3_t1'), t('slider_3_t2'), t('slider_3_t3')], 
      desc: [
        t('slider_3_desc'),
        ""
      ] 
    },
    { 
      title: [t('slider_4_t1'), t('slider_4_t2'), t('slider_4_t3')], 
      desc: [
        t('slider_4_desc'),
        ""
      ] 
    },
    { 
      title: [t('slider_5_t1'), t('slider_5_t2'), t('slider_5_t3')], 
      desc: [
        t('slider_5_desc'),
        ""
      ] 
    },
    { 
      title: [t('slider_6_t1'), t('slider_6_t2'), t('slider_6_t3')], 
      desc: [
        t('slider_6_desc'),
        ""
      ] 
    },
    { 
      title: [t('slider_7_t1'), t('slider_7_t2'), t('slider_7_t3')], 
      desc: [
        t('slider_7_desc'),
        ""
      ] 
    }
  ];

  return (
    <div className="relative bg-brand-bg">
      <div className="relative overflow-hidden min-h-screen flex items-center">
        {pageData.map((page, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-all duration-1000 ease-in-out flex flex-col justify-center items-center p-4 md:p-8 ${
              index === currentPage ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-10 -z-0'
            }`}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center -z-10 transition-transform duration-[10000ms]"
              style={{ 
                backgroundImage: `url(${backgroundImages[index]})`,
                filter: 'brightness(0.5)',
                transform: index === currentPage ? 'scale(1.1)' : 'scale(1)'
              }}
            ></div>

            <div className="relative z-10 text-center max-w-4xl 2xl:max-w-[1600px] px-4 flex flex-col items-center 2xl:pb-32">
              {/* Title Section */}
              {Array.isArray(page.title) ? (
                <div className="mb-8 md:mb-4 flex flex-col items-center">
                  {page.title.map((line, i) => (
                    <h1 
                      key={i} 
                      className={`leading-tight inline-block ${
                        i >= 1 
                          ? 'text-3xl md:text-[40px] lg:text-[58px] 2xl:text-[102px] min-[2560px]:text-[150px] text-brand-primary font-extrabold mt-1 uppercase tracking-tight' 
                          : 'text-xl md:text-[24px] lg:text-[36px] 2xl:text-[80px] min-[2560px]:text-[60px] text-white font-bold opacity-90'
                      }`}
                    >
                      {line}
                    </h1>
                  ))}
                </div>
              ) : (
                <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight uppercase tracking-tight">
                  {page.title}
                </h1>
              )}

              {/* Description Section */}
              {Array.isArray(page.desc) ? (
                <div className="max-w-3xl md:max-w-md 2xl:max-w-[1400px] mx-auto space-y-6 md:space-y-1 2xl:space-y-6 mt-5 md:mt-[30px] 2xl:mt-[60px]">
                  {page.desc.map((paragraph, i) => (
                    <p key={i} className="text-[13px] sm:text-base md:text-[14px] lg:text-[18px] 2xl:text-[26px] 2xl:max-w-[900px] text-gray-300 leading-relaxed md:leading-snug 2xl:leading-relaxed text-center font-medium opacity-90">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] sm:text-base md:text-[16px] lg:text-[18px] 2xl:text-[16px] text-gray-300 max-w-3xl md:max-w-md 2xl:max-w-[1400px] mx-auto leading-relaxed md:leading-snug 2xl:leading-relaxed text-center font-medium opacity-90 mt-5 md:mt-[30px] 2xl:mt-[60px]">
                  {page.desc}
                </p>
              )}
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 md:px-12 transform -translate-y-1/2 z-20">
          <button
            onClick={() => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)}
            className="p-1 sm:p-1.5 md:p-2 rounded-full bg-white/5 border border-white/10 hover:bg-brand-primary hover:text-black transition-all group text-white"
          >
            <span className="text-lg sm:text-xl md:text-2xl leading-none">&lsaquo;</span>
          </button>
          <button
            onClick={() => setCurrentPage((prev) => (prev + 1) % totalPages)}
            className="p-1 sm:p-1.5 md:p-2 rounded-full bg-white/5 border border-white/10 hover:bg-brand-primary hover:text-black transition-all group text-white"
          >
            <span className="text-lg sm:text-xl md:text-2xl leading-none">&rsaquo;</span>
          </button>
        </div>
        
        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-20">
          {pageData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentPage ? 'w-8 bg-brand-primary' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
