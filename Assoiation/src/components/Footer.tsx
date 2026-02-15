import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const quickLinks = [
    { key: 'about_us', href: '/#about' },
    { key: 'our_mission', href: '/#about' },
    { key: 'events', href: '#' },
    { key: 'membership', href: '/members' },
    { key: 'news_updates', href: '#' },
  ];

  const resourceLinks = [
    { key: 'documentation', href: '#' },
    { key: 'support_center', href: '#' },
    { key: 'privacy_policy', href: '#' },
    { key: 'terms_service', href: '#' },
    { key: 'community', href: '#' },
  ];

  return (
    <footer className="relative bg-[#0B1222] text-white pt-12 sm:pt-20 2xl:pt-32 pb-8 sm:pb-10 2xl:pb-20 overflow-hidden w-full">
      
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(124,201,209,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,201,209,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      {/* Radial glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-primary/[0.04] rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 w-full px-4 md:px-[70px] 2xl:px-[250px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 2xl:gap-24 mb-12 sm:mb-16 2xl:mb-24">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-5">
            <Link to="/" className="inline-flex items-center gap-4 2xl:gap-6 group w-fit">
              <div className="w-12 h-12 2xl:w-20 2xl:h-20 rounded-full overflow-hidden bg-white/10 flex items-center justify-center border border-white/10 group-hover:border-brand-primary/30 transition-colors shadow-lg">
                <img 
                  className="w-full h-full object-cover" 
                  src="/images/logo.jpeg" 
                  alt="Association Logo"
                  style={{ maskImage: 'radial-gradient(circle, black 68%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 68%, transparent 70%)' }}
                />
              </div>
              <span className="text-xl 2xl:text-4xl font-bold tracking-tight text-white group-hover:text-brand-primary transition-colors">UAMC</span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-xs sm:text-sm 2xl:text-xl max-w-xs 2xl:max-w-md">
              {t('association_desc')}
            </p>
            <div className="flex gap-3 2xl:gap-5 pt-1">
              {/* Facebook */}
              <a href="#" className="p-2.5 2xl:p-4 bg-white/[0.04] border border-white/[0.06] rounded-lg hover:bg-brand-primary/10 hover:border-brand-primary/30 transition-all duration-300 group" aria-label="Facebook">
                <svg className="w-4 h-4 2xl:w-7 2xl:h-7 text-gray-500 group-hover:text-brand-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="#" className="p-2.5 2xl:p-4 bg-white/[0.04] border border-white/[0.06] rounded-lg hover:bg-brand-primary/10 hover:border-brand-primary/30 transition-all duration-300 group" aria-label="X (Twitter)">
                <svg className="w-4 h-4 2xl:w-7 2xl:h-7 text-gray-500 group-hover:text-brand-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="p-2.5 2xl:p-4 bg-white/[0.04] border border-white/[0.06] rounded-lg hover:bg-brand-primary/10 hover:border-brand-primary/30 transition-all duration-300 group" aria-label="LinkedIn">
                <svg className="w-4 h-4 2xl:w-7 2xl:h-7 text-gray-500 group-hover:text-brand-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="#" className="p-2.5 2xl:p-4 bg-white/[0.04] border border-white/[0.06] rounded-lg hover:bg-brand-primary/10 hover:border-brand-primary/30 transition-all duration-300 group" aria-label="WhatsApp">
                <svg className="w-4 h-4 2xl:w-7 2xl:h-7 text-gray-500 group-hover:text-brand-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="col-span-1 flex flex-col gap-4 sm:gap-5 2xl:gap-8">
            <h4 className="text-sm sm:text-base 2xl:text-2xl font-semibold text-white tracking-tight">{t('quick_links')}</h4>
            <ul className="flex flex-col gap-2.5 sm:gap-3 2xl:gap-5 text-xs sm:text-sm 2xl:text-xl text-gray-400">
              {quickLinks.map((item) => (
                <li key={item.key}>
                  <a href={item.href} className="hover:text-brand-primary transition-colors duration-200 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-px bg-brand-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 flex flex-col gap-4 sm:gap-5 2xl:gap-8">
            <h4 className="text-sm sm:text-base 2xl:text-2xl font-semibold text-white tracking-tight">{t('resources')}</h4>
            <ul className="flex flex-col gap-2.5 sm:gap-3 2xl:gap-5 text-xs sm:text-sm 2xl:text-xl text-gray-400">
              {resourceLinks.map((item) => (
                <li key={item.key}>
                  <a href={item.href} className="hover:text-brand-primary transition-colors duration-200 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-px bg-brand-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4 sm:gap-5 2xl:gap-8">
            <h4 className="text-sm sm:text-base 2xl:text-2xl font-semibold text-white tracking-tight">{t('stay_updated')}</h4>
            <p className="text-gray-400 text-xs sm:text-sm 2xl:text-xl leading-relaxed">{t('newsletter_desc')}</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder={t('email_placeholder')} 
                className="w-full bg-white/[0.04] border border-white/[0.06] text-white px-4 py-2.5 sm:py-3 2xl:py-5 rounded-lg focus:outline-none focus:border-brand-primary/40 focus:ring-1 focus:ring-brand-primary/20 transition-all text-xs sm:text-sm 2xl:text-lg placeholder-gray-600"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand-primary hover:bg-brand-primary/80 text-[#0B1222] p-2 rounded-md transition-colors duration-200" aria-label="Subscribe">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-6 sm:pt-8 2xl:pt-12 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 text-[10px] sm:text-xs md:text-sm 2xl:text-xl text-gray-500 text-center md:text-left">
          <p>&#169; {currentYear} {t('rights_reserved_text')}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <a href="#" className="hover:text-brand-primary transition-colors duration-200 whitespace-nowrap">{t('privacy_policy')}</a>
            <a href="#" className="hover:text-brand-primary transition-colors duration-200 whitespace-nowrap">{t('terms_service')}</a>
            <a href="#" className="hover:text-brand-primary transition-colors duration-200 whitespace-nowrap">{t('cookies_settings')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
