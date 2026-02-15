import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ContactUs = () => {
  const { t } = useLanguage();
  const headerAnimation = useScrollAnimation();
  const contentAnimation = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: t('success_message') });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || t('error_message') });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({ type: 'error', message: t('error_message') });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="relative bg-brand-bg text-white min-h-screen flex items-center py-20 sm:py-28 px-4 md:px-[70px] 2xl:px-[250px] overflow-hidden" id="contact">

      {/* Subtle background accents */}
      <div className="absolute top-0 left-1/4 w-96 2xl:w-[500px] h-96 2xl:h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 2xl:w-[450px] h-80 2xl:h-[450px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full">
        {/* Section Header */}
        <div 
          ref={headerAnimation.ref}
          className={`text-center mb-14 sm:mb-20 2xl:mb-28 transition-all duration-1000 ${
            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-gray-500 text-sm 2xl:text-lg tracking-[0.2em] uppercase mb-4 2xl:mb-6 block">
            {t('contact_header')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl font-bold text-white mb-5 2xl:mb-8 tracking-tight">
            {t('get_in_touch')}
          </h2>
          <p className="text-sm sm:text-base 2xl:text-xl text-gray-400 max-w-2xl 2xl:max-w-4xl mx-auto leading-relaxed">
            {t('contact_desc')}
          </p>
        </div>

        <div 
          ref={contentAnimation.ref}
          className={`grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-stretch transition-all duration-1000 delay-150 ${
            contentAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          
          {/* Contact Information Card */}
          <div className="lg:col-span-2 bg-[#0B1222] border border-white/5 hover:border-brand-primary/20 rounded-xl p-7 sm:p-10 2xl:p-16 transition-all duration-500 flex flex-col">
            <h3 className="text-xl sm:text-2xl 2xl:text-4xl font-bold mb-8 2xl:mb-12 text-white">{t('contact_info_title')}</h3>
            
            <div className="flex flex-col gap-7 2xl:gap-12 flex-1">
              {/* Phone */}
              <div className="flex items-start gap-4 2xl:gap-6">
                <div className="p-2.5 2xl:p-4 bg-brand-primary/10 rounded-lg border border-brand-primary/20 text-brand-primary flex-shrink-0">
                  <svg className="w-5 h-5 2xl:w-8 2xl:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm 2xl:text-xl font-semibold mb-1 text-white">{t('phone')}</h4>
                  <p className="text-gray-400 text-sm 2xl:text-lg hover:text-brand-primary transition-colors cursor-pointer">+93 (0) 799 123 456</p>
                  <p className="text-gray-600 text-xs 2xl:text-base mt-1">Sat-Thu 8am-5pm</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 2xl:gap-6">
                <div className="p-2.5 2xl:p-4 bg-brand-primary/10 rounded-lg border border-brand-primary/20 text-brand-primary flex-shrink-0">
                  <svg className="w-5 h-5 2xl:w-8 2xl:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm 2xl:text-xl font-semibold mb-1 text-white">{t('email')}</h4>
                  <p className="text-gray-400 text-sm 2xl:text-lg hover:text-brand-primary transition-colors cursor-pointer">info@ironpipes-union.af</p>
                  <p className="text-gray-600 text-xs 2xl:text-base mt-1">We reply within 24 hours</p>
                </div>
              </div>

              {/* Office */}
              <div className="flex items-start gap-4 2xl:gap-6">
                <div className="p-2.5 2xl:p-4 bg-brand-primary/10 rounded-lg border border-brand-primary/20 text-brand-primary flex-shrink-0">
                  <svg className="w-5 h-5 2xl:w-8 2xl:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm 2xl:text-xl font-semibold mb-1 text-white">{t('office_label')}</h4>
                  <p className="text-gray-400 text-sm 2xl:text-lg">Herat Industrial Zone</p>
                  <p className="text-gray-600 text-xs 2xl:text-base mt-1">Afghanistan</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10 pt-7 2xl:pt-10 border-t border-white/5 flex gap-3 2xl:gap-5">
              {[
                { label: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                { label: 'Twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                { label: 'LinkedIn', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-label={social.label}
                  className="p-2.5 2xl:p-4 bg-white/5 border border-white/5 rounded-lg hover:bg-brand-primary/10 hover:border-brand-primary/30 hover:text-brand-primary text-gray-500 transition-all duration-300"
                >
                  <svg className="w-4 h-4 2xl:w-7 2xl:h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 bg-[#0B1222] rounded-xl p-7 sm:p-10 2xl:p-16 border border-white/5 hover:border-brand-primary/20 transition-all duration-500">
            <h3 className="text-xl sm:text-2xl 2xl:text-4xl font-bold text-white mb-7 2xl:mb-12">{t('send_message_title')}</h3>
            
            {status.type && (
              <div className={`mb-6 p-4 2xl:p-6 rounded-lg text-sm 2xl:text-lg border ${
                status.type === 'success' 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}>
                {status.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 2xl:gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 2xl:gap-8">
                <div>
                  <label htmlFor="name" className="block text-xs 2xl:text-sm font-medium text-gray-500 mb-2 2xl:mb-4 uppercase tracking-wider">{t('full_name_label')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 2xl:px-6 py-3 2xl:py-5 rounded-lg 2xl:rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm 2xl:text-lg focus:ring-1 focus:ring-brand-primary/50 focus:border-brand-primary/40 transition-all duration-200 outline-none placeholder-gray-600"
                    placeholder={t('placeholder_name')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs 2xl:text-sm font-medium text-gray-500 mb-2 2xl:mb-4 uppercase tracking-wider">{t('email_address_label')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 2xl:px-6 py-3 2xl:py-5 rounded-lg 2xl:rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm 2xl:text-lg focus:ring-1 focus:ring-brand-primary/50 focus:border-brand-primary/40 transition-all duration-200 outline-none placeholder-gray-600"
                    placeholder={t('placeholder_email')}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs 2xl:text-sm font-medium text-gray-500 mb-2 2xl:mb-4 uppercase tracking-wider">{t('subject_label')}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 2xl:px-6 py-3 2xl:py-5 rounded-lg 2xl:rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm 2xl:text-lg focus:ring-1 focus:ring-brand-primary/50 focus:border-brand-primary/40 transition-all duration-200 outline-none placeholder-gray-600"
                  placeholder={t('placeholder_subject')}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs 2xl:text-sm font-medium text-gray-500 mb-2 2xl:mb-4 uppercase tracking-wider">{t('message_label')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 2xl:px-6 py-3 2xl:py-5 rounded-lg 2xl:rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm 2xl:text-lg focus:ring-1 focus:ring-brand-primary/50 focus:border-brand-primary/40 transition-all duration-200 outline-none resize-none placeholder-gray-600"
                  placeholder={t('placeholder_message')}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-brand-secondary hover:-translate-y-0.5'} bg-brand-primary text-[#050E12] font-bold py-3.5 2xl:py-5 px-6 2xl:px-10 rounded-lg 2xl:rounded-xl shadow-lg shadow-brand-primary/10 transition-all duration-300 flex items-center justify-center gap-2 2xl:gap-3 text-sm 2xl:text-lg mt-1`}
              >
                <span>{loading ? t('sending_btn') : t('send_message_btn')}</span>
                {!loading && (
                  <svg className="w-4 h-4 2xl:w-6 2xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
