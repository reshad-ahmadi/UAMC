import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Cpu, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const { t } = useLanguage();
  const headerAnimation = useScrollAnimation();
  const valuesAnimation = useScrollAnimation();

  const values = [
    {
      icon: <Shield className="text-blue-500" size={32} />,
      icon2xl: <Shield className="text-blue-500" size={48} />,
      title: t('value_integrity'),
      desc: t('value_integrity_desc')
    },
    {
      icon: <Cpu className="text-blue-500" size={32} />,
      icon2xl: <Cpu className="text-blue-500" size={48} />,
      title: t('value_innovation'),
      desc: t('value_innovation_desc')
    },
    {
      icon: <Users className="text-blue-500" size={32} />,
      icon2xl: <Users className="text-blue-500" size={48} />,
      title: t('value_collaboration'),
      desc: t('value_collaboration_desc')
    }
  ];

  return (
    <section className="bg-[#0B1222] text-white py-24 2xl:py-32 relative overflow-hidden" id="about">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] 2xl:w-[700px] 2xl:h-[700px] bg-blue-600/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] 2xl:w-[700px] 2xl:h-[700px] bg-blue-900/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Values Section */}
        <div 
          ref={headerAnimation.ref}
          className={`text-center transition-all duration-1000 ${
            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-blue-500 text-sm 2xl:text-lg font-bold tracking-[0.3em] uppercase mb-4 2xl:mb-6 block">{t('about_header')}</span>
          <h3 className="text-3xl 2xl:text-5xl font-bold mb-16 2xl:mb-24">{t('core_values')}</h3>
          <div 
            ref={valuesAnimation.ref}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 2xl:gap-12 mb-16 transition-all duration-1000 delay-150 ${
              valuesAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {values.map((v, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="mb-6 2xl:mb-8 p-4 2xl:p-6 bg-white/5 rounded-full border border-white/5 hover:border-blue-500 transition-colors">
                  <div className="2xl:hidden">{v.icon}</div>
                  <div className="hidden 2xl:block">{v.icon2xl}</div>
                </div>
                <h4 className="text-xl 2xl:text-3xl font-bold mb-3 2xl:mb-5">{v.title}</h4>
                <p className="text-gray-400 2xl:text-xl max-w-xs 2xl:max-w-md mx-auto">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

          {/* New Link to About Page */}
          <div className="flex justify-center mt-12">
            <Link 
              to="/about#about-hero" 
              className="group flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600 border border-blue-600/20 hover:border-blue-600 text-blue-500 hover:text-white px-8 py-4 rounded-full text-lg 2xl:text-2xl font-bold transition-all duration-300"
            >
              Discover More About Us
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
