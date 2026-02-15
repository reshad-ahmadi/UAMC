import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Map language codes to display names
  const languages: { [key: string]: string } = {
    en: 'English',
    da: 'Dari',
    ps: 'Pashto'
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-[20px] mt-4 md:mt-[20px]">
      <div className="bg-white/45 backdrop-blur-[10px] text-slate-900 py-2 md:py-4 flex items-center justify-between rounded-[12px] px-4 md:px-[60px] border border-black/5 shadow-sm relative transition-all duration-300">
        {/* Left: Association Name with Larger Logo */}
        <Link to="/" className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-4 group">
         
         
         
         
         
          <span className="text-white font-bold">
            ASSOCIATION
          </span>
        </Link>
        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-bold uppercase text-white">
          <li>
            <Link to="/" className="hover:text-blue-600 transition-colors">{t('home')}</Link>
          </li>
          <li>
            <Link to="/companies" className="hover:text-blue-600 transition-colors">{t('Members')}</Link>
          </li>
          <li>
            <a href="/#contact" className="hover:text-blue-600 transition-colors">{t('contact')}</a>
          </li>
        </ul>

        {/* Desktop Language Dropdown */}
        <div className="hidden md:flex relative ml-4 items-center">
          <button 
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className="flex items-center gap-1 text-sm font-bold uppercase tracking-widest hover:text-blue-600 text-white"
          >
            <Globe size={18} />
            <span className="hidden lg:inline">{languages[language]}</span>
            <ChevronDown size={14} className={`transition-transform duration-300 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLangDropdownOpen && (
            <div className="absolute top-full right-0 mt-4 w-40 bg-white/90 backdrop-blur-xl border border-black/5 rounded-xl shadow-2xl py-2 flex flex-col z-50 animate-in fade-in zoom-in duration-200">
              {(Object.keys(languages) as Array<keyof typeof languages>).map((langCode) => (
                <button
                  key={langCode}
                  onClick={() => {
                    setLanguage(langCode as 'en' | 'da' | 'ps');
                    setIsLangDropdownOpen(false);
                  }}
                  className={`text-left px-4 py-3 text-sm text-slate-700 hover:text-black hover:bg-slate-50 transition-colors ${language === langCode ? 'text-blue-700 font-bold bg-blue-50/50' : ''}`}
                >
                  {languages[langCode]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 text-slate-900 hover:text-blue-600 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Dropdown Menu - Bright Version */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-2xl border border-black/5 rounded-[15px] p-8 shadow-2xl md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <ul className="flex flex-col gap-8 text-center text-sm font-bold uppercase tracking-[0.2em]">
              <li>
                <Link 
                  to="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-slate-800 hover:text-blue-700 transition-colors border-b border-black/5"
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/companies" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-slate-800 hover:text-blue-700 transition-colors border-b border-black/5"
                >
                  {t('companies')}
                </Link>
              </li>
              <li>
                <a 
                  href="/#contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-slate-800 hover:text-blue-700 transition-colors"
                >
                  {t('contact')}
                </a>
              </li>
            </ul>
            
            {/* Mobile Language Selection */}
            <div className="mt-8 pt-8 border-t border-black/5 flex flex-col items-center gap-5">
              <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-widest font-bold">
                <Globe size={16} />
                <span>{t('select_language')}</span>
              </div>
              <div className="flex gap-4">
                {(Object.keys(languages) as Array<keyof typeof languages>).map((langCode) => (
                  <button
                    key={langCode}
                    onClick={() => {
                      setLanguage(langCode as 'en' | 'da' | 'ps');
                      setIsMenuOpen(false);
                    }}
                    className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border-2 transition-all ${
                      language === langCode 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                        : 'border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {languages[langCode].substring(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
