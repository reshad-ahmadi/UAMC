import React from 'react';
import Navbar from '../components/Nav';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Building2, Quote, Mail, Globe, ChevronDown } from 'lucide-react';

const CompanyCard = ({ company, t, language }: { company: any, t: any, language: string }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  return (
    <div className="group relative bg-[#0B161B] rounded-[1.5rem] overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-0 group-hover:bg-blue-600/10 transition-colors"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
        
        {/* Image Section - Full height on desktop */}
        <div className="lg:col-span-5 h-72 lg:h-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
          <img 
            src={company.image} 
            alt={company.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
          />
          
          {/* Floating Logo Badge */}
          {company.logo && (
            <div className="absolute top-6 start-6 z-20">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-black/60 backdrop-blur-md rounded-3xl p-4 border border-white/10 shadow-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                <img 
                  src={company.logo} 
                  alt={`${company.title} Logo`} 
                  className="w-full h-full object-contain filter drop-shadow-xl"
                />
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="lg:col-span-7 p-8 md:p-12 lg:p-14 flex flex-col">
          
          <div className="flex-grow">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                {company.title}
              </h2>
              <div className="w-20 h-1 bg-blue-500 rounded-full mt-4 group-hover:w-32 transition-all duration-500"></div>
            </div>
            
            <div className={`prose prose-invert prose-lg max-w-none text-gray-300 mb-6 leading-relaxed whitespace-pre-line border-l-2 border-blue-500/30 pl-6 transition-all duration-700 overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-32 opacity-70'}`}>
              {company.description}
            </div>
          </div>

          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-blue-500 font-bold uppercase tracking-widest text-sm mt-auto mb-[6px] hover:text-blue-400 transition-colors group/btn w-fit"
          >
            {isExpanded ? t('view_less') || 'View Less' : t('view_details') || 'View Details'}
            <ChevronDown size={18} className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>

          {/* Info Grid - Expandable */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 bg-black/20 p-8 rounded-3xl border border-white/5 transition-all duration-700 origin-top overflow-hidden ${isExpanded ? 'scale-y-100 opacity-100 mt-0' : 'scale-y-0 opacity-0 h-0 mt-[-40px]'}`}>
            
            {/* Factory */}
            <div>
              <span className="flex items-center gap-2 text-sm text-blue-400 uppercase tracking-widest font-bold mb-2">
                <Building2 size={16} />
                {company.factoryAddressLabel}
              </span>
              <p className="text-gray-200 font-medium">{company.factoryAddress}</p>
            </div>

            {/* Sales Office */}
            <div>
              <span className="flex items-center gap-2 text-sm text-blue-400 uppercase tracking-widest font-bold mb-2">
                <MapPin size={16} />
                {company.salesLabel}
              </span>
              <p className="text-gray-200 font-medium">{company.salesAddress}</p>
            </div>

            {/* Phone */}
            <div className="md:col-span-2">
              <span className="flex items-center gap-2 text-sm text-blue-400 uppercase tracking-widest font-bold mb-2">
                <Phone size={16} />
                {company.phoneLabel}
              </span>
              <p className="text-xl font-mono text-white tracking-wide">{company.phone}</p>
            </div>

            {/* Email & Website */}
            {(company.email || company.website) && (
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/10 mt-2">
                {company.email && (
                  <div>
                    <span className="flex items-center gap-2 text-sm text-blue-400 uppercase tracking-widest font-bold mb-2">
                      <Mail size={16} />
                      {language === 'en' ? 'Email Address' : (language === 'da' ? 'آدرس ایمیل' : 'بریښنالیک پته')}
                    </span>
                    <p className="text-gray-200 font-medium break-all">{company.email}</p>
                  </div>
                )}
                {company.website && (
                  <div>
                    <span className="flex items-center gap-2 text-sm text-blue-400 uppercase tracking-widest font-bold mb-2">
                      <Globe size={16} />
                      {language === 'en' ? 'Website' : (language === 'da' ? 'وبسایت' : 'وېبسایټ')}
                    </span>
                    <a 
                      href={`https://${company.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    >
                      {company.website}
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Slogan */}
            <div className="md:col-span-2 pt-6 border-t border-white/10 mt-2">
              <div className="flex gap-4">
                 <Quote className="text-blue-500/50 flex-shrink-0" size={24} />
                 <div>
                    <span className="text-xs text-gray-500 uppercase block mb-1">{company.sloganLabel}</span>
                    <p className="text-lg italic text-blue-100 font-medium">"{company.slogan}"</p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default function Companies() {
  const { language, t, companies } = useLanguage();
  const isRTL = language === 'da' || language === 'ps';

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
    <div className={`bg-[#050E12] min-h-screen text-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />
      
      {/* Header */}
      <div id="members-section" className="relative pt-12 pb-12 md:pt-29 md:pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          <span className="text-blue-500">{t('our_members') || 'Our Members'}</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          {t('companies_desc') || "Discover the leading manufacturers shaping Afghanistan's industrial future."}
        </p>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <div className="space-y-24">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} t={t} language={language} />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
